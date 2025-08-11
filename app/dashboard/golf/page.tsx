import { lusitana } from "../../ui/fonts";
import { DataTable } from "@/app/ui/golf/data-table";
import { fetchGolfRounds } from "@/app/lib/data";
import { columns } from '@/app/ui/golf/columns'
import { CreateGolfForm } from "@/app/ui/golf/create-form";
import { ScoringButton } from "@/app/ui/golf/scoring-button";
export const dynamic = 'force-dynamic'

export default async function GolfPage() {
    const golfRounds = (await fetchGolfRounds()).toSorted((a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    )

    const totals = {
        averageDrive: golfRounds.reduce((acc, curr) => acc + curr.data.averageDrive, 0) / golfRounds.length,
        averageLongestDrive: golfRounds.reduce((acc, curr) => acc + curr.data.longestDrive, 0) / golfRounds.length,
        averagePoints: golfRounds.reduce((acc, curr) => acc + curr.data.points, 0) / golfRounds.length,
        averageStrokes: golfRounds.reduce((acc, curr) => acc + curr.data.strokes, 0) / golfRounds.length,
        fairwaysHitPercentage: (golfRounds.reduce((acc, curr) => acc + curr.data.fairwaysHit.hit, 0) /
            golfRounds.reduce((acc, curr) => acc + curr.data.fairwaysHit.total, 0)) * 100,
        greensInRegulationPercentage: (golfRounds.reduce((acc, curr) => acc + curr.data.greensInRegulation.hit, 0) /
            golfRounds.reduce((acc, curr) => acc + curr.data.greensInRegulation.total, 0)) * 100,
        averageScrambling: golfRounds.reduce((acc, curr) => acc + curr.data.scrambling, 0) / golfRounds.length,
        scoringAverages: {
            eagles: golfRounds.reduce((acc, curr) => acc + curr.data.score.eagles, 0) / golfRounds.length,
            birdies: golfRounds.reduce((acc, curr) => acc + curr.data.score.birdies, 0) / golfRounds.length,
            pars: golfRounds.reduce((acc, curr) => acc + curr.data.score.pars, 0) / golfRounds.length,
            bogeys: golfRounds.reduce((acc, curr) => acc + curr.data.score.bogeys, 0) / golfRounds.length,
            doubleBogeys: golfRounds.reduce((acc, curr) => acc + curr.data.score.doubleBogeys, 0) / golfRounds.length,
            tripleBogeys: golfRounds.reduce((acc, curr) => acc + curr.data.score.tripleBogeys, 0) / golfRounds.length,
        }
    }

    return (
        <main>
            <div className="flex justify-between">
                <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-white`}>
                    Golf
                </h1>
                <CreateGolfForm />
            </div>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={golfRounds} />
            </div>
            <div className="container mx-auto py-10">
                <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-white`}>
                    Averages
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 justify-items-center gap-2">
                    <ScoringButton
                        title="Eagles"
                        value={totals.scoringAverages.eagles}
                        color="#2563eb"
                        rounds={golfRounds}
                        scoreKey="eagles"
                    />
                    <ScoringButton
                        title="Birdies"
                        value={totals.scoringAverages.birdies}
                        color="#16a34a"
                        rounds={golfRounds}
                        scoreKey="birdies"
                    />
                    <ScoringButton
                        title="Pars"
                        value={totals.scoringAverages.pars}
                        color="#ca8a04"
                        rounds={golfRounds}
                        scoreKey="pars"
                    />
                    <ScoringButton
                        title="Bogeys"
                        value={totals.scoringAverages.bogeys}
                        color="#2563eb"
                        rounds={golfRounds}
                        scoreKey="bogeys"
                    />
                    <ScoringButton
                        title="Double bogeys"
                        value={totals.scoringAverages.doubleBogeys}
                        color="#16a34a"
                        rounds={golfRounds}
                        scoreKey="doubleBogeys"
                    />
                    <ScoringButton
                        title="Tripple bogeys+"
                        value={totals.scoringAverages.tripleBogeys}
                        color="#ca8a04"
                        rounds={golfRounds}
                        scoreKey="tripleBogeys"
                    />
                </div>
            </div>
        </main>
    )
}