import { lusitana } from "../../ui/fonts";
import { DataTable } from "@/app/ui/golf/data-table";
import { fetchGolfRounds } from "@/app/lib/data";
import { columns } from '@/app/ui/golf/columns'
import { CreateGolfForm } from "@/app/ui/golf/create-form";
import { ScoringButton } from "@/app/ui/golf/scoring-button";
import { StatCard } from "@/app/ui/golf/stat-card";
export const dynamic = 'force-dynamic'

type StatRecord = {
    value: number;
    course: string;
    date: string;
}

export default async function GolfPage() {
    const golfRounds = (await fetchGolfRounds()).toSorted((a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    )

    const latestTwentyRounds = golfRounds
        .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
        .slice(0, 20);

    const totals = {
        averageDrive: Math.round(latestTwentyRounds.reduce((acc, curr) => acc + curr.data.averageDrive, 0) / latestTwentyRounds.length),
        averageLongestDrive: Math.round(latestTwentyRounds.reduce((acc, curr) => acc + curr.data.longestDrive, 0) / latestTwentyRounds.length),
        averagePoints: Math.round(latestTwentyRounds.reduce((acc, curr) => acc + curr.data.points, 0) / latestTwentyRounds.length),
        averageStrokes: Math.round(latestTwentyRounds.reduce((acc, curr) => acc + curr.data.strokes, 0) / latestTwentyRounds.length),
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
        },
        totals: {
            longestDrive: golfRounds
                .reduce<StatRecord | null>((max, round) =>
                    round.data.longestDrive > (max?.value ?? 0)
                        ? {
                            value: round.data.longestDrive,
                            course: round.data.course,
                            date: round.data.date
                        }
                        : max,
                    null),
            lowestStrokes: golfRounds
                .filter(round => round.data.holes === 18)
                .reduce<StatRecord | null>((min, round) =>
                    round.data.strokes < (min?.value ?? Infinity)
                        ? {
                            value: round.data.strokes,
                            course: round.data.course,
                            date: round.data.date
                        }
                        : min,
                    null),
            highestScore: golfRounds
                .reduce<StatRecord | null>((max, round) =>
                    round.data.points > (max?.value ?? 0)
                        ? {
                            value: round.data.points,
                            course: round.data.course,
                            date: round.data.date
                        }
                        : max,
                    null),
            totalEagles: golfRounds.reduce((acc, curr) => acc + curr.data.score.eagles, 0),
            totalBirdies: golfRounds.reduce((acc, curr) => acc + curr.data.score.birdies, 0),
            totalPars: golfRounds.reduce((acc, curr) => acc + curr.data.score.pars, 0),
            totalBogeys: golfRounds.reduce((acc, curr) => acc + curr.data.score.bogeys, 0),
            totalDoubleBogeys: golfRounds.reduce((acc, curr) => acc + curr.data.score.doubleBogeys, 0),
            totalTripleBogeys: golfRounds.reduce((acc, curr) => acc + curr.data.score.tripleBogeys, 0),
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
                <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-4 mb-4">
                    <StatCard
                        title="Longest Drive"
                        stat={totals.totals.longestDrive}
                        average={totals.averageDrive}
                        color="#22c55e"
                        rounds={golfRounds}
                        dataKey="longestDrive"
                        valueUnit="yards"
                    />
                    <StatCard
                        title="Lowest Score"
                        stat={totals.totals.lowestStrokes}
                        average={totals.averageStrokes}
                        color="#3b82f6"
                        rounds={golfRounds.filter(round => round.data.holes === 18)}
                        dataKey="strokes"
                        isMinBetter={true}
                    />
                    <StatCard
                        title="Best Points"
                        stat={totals.totals.highestScore}
                        average={totals.averagePoints}
                        color="#f59e0b"
                        rounds={golfRounds}
                        dataKey="points"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 justify-items-center gap-2">
                    <ScoringButton
                        title="Eagles"
                        value={totals.scoringAverages.eagles}
                        total={totals.totals.totalEagles}
                        color="#2563eb"
                        rounds={golfRounds}
                        scoreKey="eagles"
                    />
                    <ScoringButton
                        title="Birdies"
                        value={totals.scoringAverages.birdies}
                        total={totals.totals.totalBirdies}
                        color="#16a34a"
                        rounds={golfRounds}
                        scoreKey="birdies"
                    />
                    <ScoringButton
                        title="Pars"
                        value={totals.scoringAverages.pars}
                        total={totals.totals.totalPars}
                        color="#ca8a04"
                        rounds={golfRounds}
                        scoreKey="pars"
                    />
                    <ScoringButton
                        title="Bogeys"
                        value={totals.scoringAverages.bogeys}
                        total={totals.totals.totalBogeys}
                        color="#2563eb"
                        rounds={golfRounds}
                        scoreKey="bogeys"
                    />
                    <ScoringButton
                        title="Double bogeys"
                        value={totals.scoringAverages.doubleBogeys}
                        total={totals.totals.totalDoubleBogeys}
                        color="#16a34a"
                        rounds={golfRounds}
                        scoreKey="doubleBogeys"
                    />
                    <ScoringButton
                        title="Tripple bogeys+"
                        value={totals.scoringAverages.tripleBogeys}
                        total={totals.totals.totalTripleBogeys}
                        color="#ca8a04"
                        rounds={golfRounds}
                        scoreKey="tripleBogeys"
                    />
                </div>
            </div>
        </main>
    )
}