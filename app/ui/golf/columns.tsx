'use client'

import { ColumnDef } from "@tanstack/react-table"

import { format } from "date-fns"

export type GolfRound = {
    id: string
    created: string
    data: {
        course: string
        date: string
        points: number
        holes: number
        strokes: number
        fairwaysHit: {
            hit: number
            total: number
        }
        averageDrive: number
        longestDrive: number
        greensInRegulation: {
            hit: number
            total: number
        }
        scrambling: number
        putts: {
            hit: number
            total: number
        }
        score: {
            eagles: number
            birdies: number
            pars: number
            bogeys: number
            doubleBogeys: number
            tripleBogeys: number
        }
    }
}

export const columns: ColumnDef<GolfRound>[] = [
    {
        id: 'date',
        header: "Date",
        accessorFn: (row) => format(row.data.date, 'dd.MM.yyy')
    },
    {
        id: 'course',
        header: "Course",
        accessorFn: (row) => row.data.course,
    },
    {
        id: 'points',
        header: "Points",
        accessorFn: (row) => row.data.points,
    },
    {
        id: 'holes',
        header: "Holes",
        accessorFn: (row) => row.data.holes,
    },
    {
        id: 'strokes',
        header: "Strokes",
        accessorFn: (row) => row.data.strokes,
    },
    {
        id: 'fairwaysHit',
        header: "Fairways Hit",
        accessorFn: (row) => row.data.fairwaysHit.hit + '/' + row.data.fairwaysHit.total,
    },
    {
        id: 'greensHit',
        header: "Greens Hit",
        accessorFn: (row) => row.data.greensInRegulation.hit + '/' + row.data.greensInRegulation.total,
    },
    {
        id: 'scrambling',
        header: "Scrambling",
        accessorFn: (row) => row.data.scrambling,
        cell: ({ row }) => {
            const value = row.getValue('scrambling') as number
            return value ? `${value}%` : '-'
        },
    },
]