"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface ChartProps {
    title: string
    description?: string
    data: {
        date: string
        course: string
        value: number
    }[]
    color: string
    theme?: 'light' | 'dark'
}

export function Chart({ title, description, data, color, theme = 'light' }: ChartProps) {
    return (
        <Card className={theme === 'dark' ? 'bg-gray-700 text-white' : ''}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription className={theme === 'dark' ? 'text-gray-300' : ''}>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="pb-4">
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis
                                dataKey="date"
                                tickFormatter={(date) => format(new Date(date), 'MMM d')}
                                reversed={true}
                                stroke={theme === 'dark' ? '#fff' : '#000'}
                            />
                            <YAxis
                                allowDecimals={false}
                                tickFormatter={(value) => `${Math.round(value)}`}
                                stroke={theme === 'dark' ? '#fff' : '#000'}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className={`rounded-lg border p-2 shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-background'
                                                }`}>
                                                <div className="flex flex-col">
                                                    <span className={`text-[0.70rem] uppercase ${theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'
                                                        }`}>
                                                        {format(new Date(payload[0].payload.date), 'PPP')}
                                                    </span>
                                                    <span className={`text-[0.70rem] ${theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'
                                                        }`}>
                                                        {payload[0].payload.course}
                                                    </span>
                                                    <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-muted-foreground'
                                                        }`}>
                                                        {payload[0].value}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={color}
                                strokeWidth={2}
                                dot={{
                                    stroke: color,
                                    strokeWidth: 2,
                                    r: 4,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}