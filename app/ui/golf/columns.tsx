'use client'

import { ColumnDef } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"

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
        accessorFn: (row) => {
            const date = typeof row.data.date === 'string' 
                ? parseISO(row.data.date) 
                : new Date(row.data.date)
            return format(date, 'dd.MM.yyyy')
        },
        enableSorting: true
    },
    {
        id: 'course',
        header: "Course",
        accessorFn: (row) => row.data.course,
        enableSorting: true
    },
    {
        id: 'points',
        header: "Points",
        accessorFn: (row) => row.data.points,
        enableSorting: true
    },
    {
        id: 'holes',
        header: "Holes",
        accessorFn: (row) => row.data.holes,
        enableSorting: true
    },
    {
        id: 'strokes',
        header: "Strokes",
        accessorFn: (row) => row.data.strokes,
        enableSorting: true
    },
    {
        id: 'fairwaysHit',
        header: "Fairways Hit",
        accessorFn: (row) => row.data.fairwaysHit.hit + '/' + row.data.fairwaysHit.total,
        enableSorting: true
    },
    {
        id: 'greensHit',
        header: "Greens Hit",
        accessorFn: (row) => row.data.greensInRegulation.hit + '/' + row.data.greensInRegulation.total,
        enableSorting: true
    },
    {
        id: 'scrambling',
        header: "Scrambling",
        accessorFn: (row) => row.data.scrambling,
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue('scrambling') as number
            return value ? `${value}%` : '-'
        },
    },
]