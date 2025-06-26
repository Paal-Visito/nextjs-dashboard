import { lusitana } from '@/app/ui/fonts';
import { Guitar } from 'lucide-react';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center gap-4 leading-none text-white`}
    >
      <Guitar className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Hammis</p>
    </div>
  );
}
