"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Chart } from "./charts"
import { GolfRound } from "./columns"
import { format } from "date-fns"

interface StatRecord {
    value: number
    course: string
    date: string
}

interface ChartData {
    date: string
    course: string
    value: number
}

interface StatCardProps {
    title: string
    stat: StatRecord | null
    color: string
    rounds: GolfRound[]
    dataKey: 'longestDrive' | 'strokes' | 'points'
    isMinBetter?: boolean
    valueUnit?: string
}
export function StatCard({
    title,
    stat,
    color,
    rounds,
    dataKey,
    valueUnit = ''
}: StatCardProps) {
    if (!stat) return null

    const formatValue = (value: number) => {
        return valueUnit ? `${value} ${valueUnit}` : value.toString()
    }

    const lineChartData: ChartData[] = rounds
        .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
        .map(round => ({
            date: round.data.date,
            course: round.data.course,
            value: Number(round.data[dataKey])
        }))

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="group h-40 w-full flex flex-col items-center justify-between p-6 hover:bg-gray-800/10 transition-colors"
                >
                    <div className="text-lg font-medium group-hover:text-white transition-colors">{title}</div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="text-3xl font-bold" style={{ color }}>
                            {formatValue(stat.value)}
                        </div>
                        <div className="text-sm text-muted-foreground">{stat.course}</div>
                        <div className="text-xs text-muted-foreground">
                            {format(new Date(stat.date), 'MMM d, yyyy')}
                        </div>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] bg-gray-700 text-white">
                <DialogHeader>
                    <DialogTitle className="flex justify-between items-center mt-4">
                        <span>{title} History</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <Chart
                        title={title}
                        data={lineChartData}
                        color={color}
                        theme="dark"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}