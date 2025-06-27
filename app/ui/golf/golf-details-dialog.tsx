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
                            <h3 className="font-medium mb-2">This Round</h3>
                            <div className="space-y-1">
                                <p>Average Drive: {round.data.averageDrive}m</p>
                                <p>Longest Drive: {round.data.longestDrive}m</p>
                                <p>Points: {round.data.points}</p>
                                <p>Strokes: {round.data.strokes}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Your Averages</h3>
                            <div className="space-y-1">
                                <p>Average Drive: {formatNumber(totals.averageDrive)}m</p>
                                <p>Average Longest: {formatNumber(totals.averageLongestDrive)}m</p>
                                <p>Average Points: {formatNumber(totals.averagePoints)}</p>
                                <p>Average Strokes: {formatNumber(totals.averageStrokes)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-start gap-4">
                        <div>
                            <h3 className="font-medium mb-2">This Round</h3>
                            <div className="space-y-1">
                                <p>Fairways: {round.data.fairwaysHit.hit}/{round.data.fairwaysHit.total} ({(formatNumber(round.data.fairwaysHit.hit / round.data.fairwaysHit.total)) * 100}%)</p>
                                <p>Greens: {round.data.greensInRegulation.hit}/{round.data.greensInRegulation.total} ({(formatNumber(round.data.greensInRegulation.hit / round.data.greensInRegulation.total)) * 100}%)</p>
                                <p>Scrambling: {round.data.scrambling}%</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Your Averages</h3>
                            <div className="space-y-1">
                                <p>Fairways: {formatNumber(totals.fairwaysHitPercentage)}%</p>
                                <p>Greens: {formatNumber(totals.greensInRegulationPercentage)}%</p>
                                <p>Scrambling: {formatNumber(totals.averageScrambling)}%</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-2">Scoring</h3>
                        <div className="grid grid-cols-3 gap-2">
                            <p>Eagles: {formatNumber(round.data.score.eagles)}</p>
                            <p>Birdies: {formatNumber(round.data.score.birdies)}</p>
                            <p>Pars: {formatNumber(round.data.score.pars)}</p>
                            <p>Bogeys: {formatNumber(round.data.score.bogeys)}</p>
                            <p>Doubles: {formatNumber(round.data.score.doubleBogeys)}</p>
                            <p>Triples+: {formatNumber(round.data.score.tripleBogeys)}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}