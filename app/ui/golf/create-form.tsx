'use client'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface GolfFormData {
    course: string
    date: string
    points: number | null
    holes: number | null
    strokes: number | null
    fairwaysHit: {
        hit: number | null
        total: number | null
    }
    averageDrive: number | null
    longestDrive: number | null
    greensInRegulation: {
        hit: number | null
        total: number | null
    }
    scrambling: number | null
    putts: {
        hit: number | null
        total: number | null
    }
    score: {
        eagles: number | null
        birdies: number | null
        pars: number | null
        bogeys: number | null
        doubleBogeys: number | null
        tripleBogeys: number | null
    }
}

export function CreateGolfForm() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<GolfFormData>({
        course: '',
        date: '',
        points: null,
        holes: null,
        strokes: null,
        fairwaysHit: {
            hit: null,
            total: null
        },
        averageDrive: null,
        longestDrive: null,
        greensInRegulation: {
            hit: null,
            total: null
        },
        scrambling: null,
        putts: {
            hit: null,
            total: null
        },
        score: {
            eagles: null,
            birdies: null,
            pars: null,
            bogeys: null,
            doubleBogeys: null,
            tripleBogeys: null
        }
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/golf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit golf round')
            }
            setFormData({
                course: '',
                date: '',
                points: null,
                holes: null,
                strokes: null,
                fairwaysHit: {
                    hit: null,
                    total: null
                },
                averageDrive: null,
                longestDrive: null,
                greensInRegulation: {
                    hit: null,
                    total: null
                },
                scrambling: null,
                putts: {
                    hit: null,
                    total: null
                },
                score: {
                    eagles: null,
                    birdies: null,
                    pars: null,
                    bogeys: null,
                    doubleBogeys: null,
                    tripleBogeys: null
                }
            });
            setOpen(false);
            router.refresh()

        } catch (error) {
            console.error('Error submitting golf round:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name.includes('.')) {
            const [parent, child] = name.split('.') as [keyof GolfFormData, string]
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent] as Record<string, number | null>),
                    [child]: value === '' ? null : Number(value)
                }
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value === '' ? null : (Number(value) || value)
            }))
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-white rounded-lg bg-black text-white">+</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
                    <DialogTitle>Registrer ny runde</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 py-4">
                        <Card>
                            <CardContent className="pt-6 grid gap-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="course">Bane</Label>
                                        <Input
                                            id="course"
                                            name="course"
                                            value={formData.course}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="date">Dato</Label>
                                        <Input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 grid gap-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="points">Poeng</Label>
                                        <Input
                                            type="number"
                                            id="points"
                                            name="points"
                                            value={formData.points || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="holes">Hull</Label>
                                        <Input
                                            type="number"
                                            id="holes"
                                            name="holes"
                                            value={formData.holes || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="strokes">Slag</Label>
                                        <Input
                                            type="number"
                                            id="strokes"
                                            name="strokes"
                                            value={formData.strokes || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6 grid gap-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="averageDrive">Gjennomsnittlig Drive</Label>
                                        <Input
                                            type="number"
                                            id="averageDrive"
                                            name="averageDrive"
                                            value={formData.averageDrive || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="longestDrive">Lengste Drive</Label>
                                        <Input
                                            type="number"
                                            id="longestDrive"
                                            name="longestDrive"
                                            value={formData.longestDrive || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="fairwaysHit.hit">Fairways Truffet</Label>
                                        <Input
                                            type="number"
                                            id="fairwaysHit.hit"
                                            name="fairwaysHit.hit"
                                            value={formData.fairwaysHit.hit ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="fairwaysHit.total">Fairways Totalt</Label>
                                        <Input
                                            type="number"
                                            id="fairwaysHit.total"
                                            name="fairwaysHit.total"
                                            value={formData.fairwaysHit.total ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="greensInRegulation.hit">Green Truffet</Label>
                                        <Input
                                            type="number"
                                            id="greensInRegulation.hit"
                                            name="greensInRegulation.hit"
                                            value={formData.greensInRegulation.hit ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="greensInRegulation.total">Green Totalt</Label>
                                        <Input
                                            type="number"
                                            id="greensInRegulation.total"
                                            name="greensInRegulation.total"
                                            value={formData.greensInRegulation.total ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="putts.hit">Putter Truffet</Label>
                                        <Input
                                            type="number"
                                            id="putts.hit"
                                            name="putts.hit"
                                            value={formData.putts.hit ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="putts.total">Putter Totalt</Label>
                                        <Input
                                            type="number"
                                            id="putts.total"
                                            name="putts.total"
                                            value={formData.putts.total ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="putts.hit">Scrambling</Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                id="scrambling"
                                                name="scrambling"
                                                value={formData.scrambling ?? ''}
                                                onChange={handleInputChange}
                                                min="0"
                                                max="100"
                                                className="pr-7" // Add padding for the percentage sign
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                %
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid w-full items-center gap-1.5" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6 grid gap-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="score.eagles">Eagles</Label>
                                        <Input
                                            type="number"
                                            id="score.eagles"
                                            name="score.eagles"
                                            value={formData.score.eagles ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="score.birdies">Birdies</Label>
                                        <Input
                                            type="number"
                                            id="score.birdies"
                                            name="score.birdies"
                                            value={formData.score.birdies ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="score.pars">Pars</Label>
                                        <Input
                                            type="number"
                                            id="score.pars"
                                            name="score.pars"
                                            value={formData.score.pars ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="score.bogeys">Bogeys</Label>
                                        <Input
                                            type="number"
                                            id="score.bogeys"
                                            name="score.bogeys"
                                            value={formData.score.bogeys ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="score.doubleBogeys">Double Bogeys</Label>
                                        <Input
                                            type="number"
                                            id="score.doubleBogeys"
                                            name="score.doubleBogeys"
                                            value={formData.score.doubleBogeys ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="score.tripleBogeys">Triple+ Bogeys</Label>
                                        <Input
                                            type="number"
                                            id="score.tripleBogeys"
                                            name="score.tripleBogeys"
                                            value={formData.score.tripleBogeys ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <DialogFooter className="sticky bottom-0 bg-background pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Round'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}