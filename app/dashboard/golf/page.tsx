import { lusitana } from "../../ui/fonts";
import { DataTable } from "@/app/ui/golf/data-table";
import { fetchGolfRounds } from "@/app/lib/data";
import { columns } from '@/app/ui/golf/columns'
import { CreateGolfForm } from "@/app/ui/golf/create-form";

export default async function GolfPage() {
    const golfRounds = (await fetchGolfRounds()).toSorted((a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    )

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
        </main>
    )
}