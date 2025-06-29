'use client'
import {
  HomeIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { LandPlot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Golf - Stats', href: '/dashboard/golf', icon: LandPlot }  
];

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-700 p-3 text-sm font-medium text-gray-200 hover:bg-gray-600 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-600 text-white': pathname === link.href
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}