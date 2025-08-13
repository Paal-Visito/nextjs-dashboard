import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import HammisLogo from '@/app/ui/hammis-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full bg-gray-800 flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-black p-4 md:h-40 border border-white"
        href="/"
      >
        <div className="text-white">
          <HammisLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-700 md:block"></div>
        <form 
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/' })
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-700 p-3 text-sm font-medium text-gray-200 hover:bg-gray-600 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
