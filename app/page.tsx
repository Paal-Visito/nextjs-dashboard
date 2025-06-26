import HammisLogo from '@/app/ui/hammis-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Page() {



  return (
    <main className="flex min-h-screen bg-gray-900 flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-3xl border border-white bg-black p-4 md:h-52">
        <HammisLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 px-6 py-10 md:w-2/5 md:px-20">
          <Link href="/login">
            <Button
              variant="outline"
              className="flex items-center gap-5 self-start border-white rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Card className='aspect-video w-full h-full relative overflow-hidden p-0 rounded-3xl'>
            <Image
              src="/AI-Image3.png"
              alt="Screenshots of the dashboard project showing desktop version"
              fill
              className="object-cover"
              priority
            />
          </Card>
        </div>
      </div>
    </main>
  )
}
