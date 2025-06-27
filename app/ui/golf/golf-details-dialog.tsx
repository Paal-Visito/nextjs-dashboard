'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { GolfRound } from "./columns"
import { CreateGolfForm } from "./create-form"

interface GolfDetailsDialogProps {
    round: GolfRound | null
    open: boolean
    data: GolfRound[]
    onOpenChange: (open: boolean) => void
}

export function GolfDetailsDialog({ round, data, open, onOpenChange }: GolfDetailsDialogProps) {
    if (!round) return null

    const totals = {
        averageDrive: data.reduce((acc, curr) => acc + curr.data.averageDrive, 0) / data.length,
        averageLongestDrive: data.reduce((acc, curr) => acc + curr.data.longestDrive, 0) / data.length,
        averagePoints: data.reduce((acc, curr) => acc + curr.data.points, 0) / data.length,
        averageStrokes: data.reduce((acc, curr) => acc + curr.data.strokes, 0) / data.length,
        fairwaysHitPercentage: (data.reduce((acc, curr) => acc + curr.data.fairwaysHit.hit, 0) /
            data.reduce((acc, curr) => acc + curr.data.fairwaysHit.total, 0)) * 100,
        greensInRegulationPercentage: (data.reduce((acc, curr) => acc + curr.data.greensInRegulation.hit, 0) /
            data.reduce((acc, curr) => acc + curr.data.greensInRegulation.total, 0)) * 100,
        averageScrambling: data.reduce((acc, curr) => acc + curr.data.scrambling, 0) / data.length,
        scoringAverages: {
            eagles: data.reduce((acc, curr) => acc + curr.data.score.eagles, 0) / data.length,
            birdies: data.reduce((acc, curr) => acc + curr.data.score.birdies, 0) / data.length,
            pars: data.reduce((acc, curr) => acc + curr.data.score.pars, 0) / data.length,
            bogeys: data.reduce((acc, curr) => acc + curr.data.score.bogeys, 0) / data.length,
            doubleBogeys: data.reduce((acc, curr) => acc + curr.data.score.doubleBogeys, 0) / data.length,
            tripleBogeys: data.reduce((acc, curr) => acc + curr.data.score.tripleBogeys, 0) / data.length,
        }
    }

    const formatNumber = (num: number) => Number(num.toFixed(1))

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex justify-between items-center mt-0 pr-4">
                            <div>{round.data.course} - {round.data.date}</div>
                            <CreateGolfForm
                                initialData={round.data}
                                mode="edit"
                                id={round.id}
                            />
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 items-start gap-4">
                        <div>
                            <h3 className="font-medium mb-2"><span className="font-bold">This Round</span></h3>
                            <div className="space-y-1">
                                <p>Average Drive: <span className="font-bold">{round.data.averageDrive}m</span></p>
                                <p>Longest Drive: <span className="font-bold">{round.data.longestDrive}m</span></p>
                                <p>Points: <span className="font-bold">{round.data.points}</span></p>
                                <p>Strokes: <span className="font-bold">{round.data.strokes}</span></p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2"><span className="font-bold">Your Averages</span></h3>
                            <div className="space-y-1">
                                <p>Average Drive: <span className="font-bold">{formatNumber(totals.averageDrive)}m</span></p>
                                <p>Average Longest: <span className="font-bold">{formatNumber(totals.averageLongestDrive)}m</span></p>
                                <p>Average Points: <span className="font-bold">{formatNumber(totals.averagePoints)}</span></p>
                                <p>Average Strokes: <span className="font-bold">{formatNumber(totals.averageStrokes)}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-start gap-4">
                        <div>
                            <div className="space-y-1">
                                <p>Fairways: <span className="font-bold">{round.data.fairwaysHit.hit}/{round.data.fairwaysHit.total} ({(formatNumber(round.data.fairwaysHit.hit / round.data.fairwaysHit.total)) * 100}%)</span></p>
                                <p>Greens: <span className="font-bold">{round.data.greensInRegulation.hit}/{round.data.greensInRegulation.total} ({(formatNumber(round.data.greensInRegulation.hit / round.data.greensInRegulation.total)) * 100}%)</span></p>
                                <p>Scrambling: <span className="font-bold">{round.data.scrambling}%</span></p>
                            </div>
                        </div>
                        <div>
                            <div className="space-y-1">
                                <p>Fairways: <span className="font-bold">{formatNumber(totals.fairwaysHitPercentage)}%</span></p>
                                <p>Greens: <span className="font-bold">{formatNumber(totals.greensInRegulationPercentage)}%</span></p>
                                <p>Scrambling: <span className="font-bold">{formatNumber(totals.averageScrambling)}%</span></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-2"><span className="font-bold">Scoring</span></h3>
                        <div className="grid grid-cols-3 gap-2">
                            <p>Eagles: <span className="font-bold">{formatNumber(round.data.score.eagles)}</span></p>
                            <p>Birdies: <span className="font-bold">{formatNumber(round.data.score.birdies)}</span></p>
                            <p>Pars: <span className="font-bold">{formatNumber(round.data.score.pars)}</span></p>
                            <p>Bogeys: <span className="font-bold">{formatNumber(round.data.score.bogeys)}</span></p>
                            <p>Doubles: <span className="font-bold">{formatNumber(round.data.score.doubleBogeys)}</span></p>
                            <p>Triples+: <span className="font-bold">{formatNumber(round.data.score.tripleBogeys)}</span></p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}