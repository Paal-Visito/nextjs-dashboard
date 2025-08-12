import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center gap-4 leading-none text-white`}
    >
      <Image
        src="/golf-player.png"
        alt="Screenshots of the dashboard project showing desktop version"
        height={60}
        width={60}
        className="object-cover"
        priority
      />
      <p className="text-[44px]">Hammis Golf Stats</p>
    </div>
  );
}
