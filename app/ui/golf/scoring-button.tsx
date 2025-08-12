"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Chart } from "./charts"
import { GolfRound } from "./columns"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts"
import { format, startOfMonth, isWithinInterval, subMonths } from "date-fns"

interface ScoringButtonProps {
    title: string
    value: number
    total: number
    color: string
    rounds: GolfRound[]
    scoreKey: keyof GolfRound['data']['score']
}

export function ScoringButton({
    title,
    value,
    total,
    color,
    rounds,
    scoreKey
}: ScoringButtonProps) {
    const lineChartData = rounds
        .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
        .map(round => ({
            date: round.data.date,
            course: round.data.course,
            value: round.data.score[scoreKey]
        }))

    // Calculate monthly averages for the last 6 months
    const today = new Date()
    const monthlyData = Array.from({ length: 6 }, (_, i) => {
        const monthStart = startOfMonth(subMonths(today, i))
        const monthEnd = startOfMonth(subMonths(today, i - 1))

        const monthRounds = rounds.filter(round => {
            const roundDate = new Date(round.data.date)
            return isWithinInterval(roundDate, { start: monthStart, end: monthEnd })
        })

        const monthAverage = monthRounds.length > 0
            ? monthRounds.reduce((sum, round) => sum + round.data.score[scoreKey], 0) / monthRounds.length
            : 0

        return {
            name: format(monthStart, 'MMM'),
            value: Number(monthAverage.toFixed(1))
        }
    }).reverse()

    const totalHoles = rounds.reduce((sum, round) => {
        return sum + round.data.holes
    }, 0)

    const totalScores = rounds.reduce((sum, round) => {
        return sum + round.data.score[scoreKey]
    }, 0)

    const percentage = totalHoles > 0
        ? ((totalScores / totalHoles) * 100).toFixed(1)
        : '0'

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="h-60 w-52 flex flex-col items-center justify-between p-6 hover:bg-gray-800/10 transition-colors"
                >
                    <div className="text-sm font-medium">{title}</div>
                    <div className="w-full h-28">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={monthlyData}>
                                <PolarGrid strokeOpacity={0.5} />
                                <PolarAngleAxis
                                    dataKey="name"
                                    tick={{ fill: 'currentColor', fontSize: '10px' }}
                                />
                                <Radar
                                    name={title}
                                    dataKey="value"
                                    stroke={color}
                                    fill={color}
                                    fillOpacity={0.3}
                                />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            {payload[0].payload.name}
                                                        </span>
                                                        <span className="font-bold text-muted-foreground">
                                                            {payload[0].value}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col items-center gap-1 transition-colors group-hover:text-primary">
                        <div className="text-2xl font-bold">{value.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Total: {total}</div>
                        <div className="text-sm text-muted-foreground">{percentage}% of holes</div>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] bg-gray-700 text-white">
                <DialogHeader>
                    <DialogTitle className="flex justify-between items-center mt-4">
                        <span>{title} per Round</span>
                        <span className="text-sm font-normal">
                            {totalScores} {title.toLowerCase()} on {totalHoles} holes ({percentage}%)
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <Chart
                        title={`${title} History`}
                        data={lineChartData}
                        color={color}
                    />
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={monthlyData}>
                                <PolarGrid />
                                <PolarAngleAxis
                                    dataKey="name"
                                    tick={{ fill: 'currentColor' }}
                                />
                                <Radar
                                    name={title}
                                    dataKey="value"
                                    stroke={color}
                                    fill={color}
                                    fillOpacity={0.3}
                                />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-gray-800 p-2 shadow-sm">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-gray-300">
                                                            {payload[0].payload.name}
                                                        </span>
                                                        <span className="font-bold text-white">
                                                            {payload[0].value}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}