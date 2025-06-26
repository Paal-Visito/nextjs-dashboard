import { date, z } from 'zod'

// Define the golf data schema
export const GolfDataSchema = z.object({
    course: z.string(),
    date: z.string(),
    points: z.number(),
    holes: z.number(),
    strokes: z.number(),
    fairwaysHit: z.object({
        hit: z.number(),
        total: z.number()
    }),
    averageDrive: z.number(),
    longestDrive: z.number(),
    greensInRegulation: z.object({
        hit: z.number(),
        total: z.number()
    }),
    scrambling: z.number(),
    putts: z.object({
        hit: z.number(),
        total: z.number()
    }),
    score: z.object({
        eagles: z.number(),
        birdies: z.number(),
        pars: z.number(),
        bogeys: z.number(),
        doubleBogeys: z.number(),
        tripleBogeys: z.number()
    })
})

export type GolfData = z.infer<typeof GolfDataSchema>