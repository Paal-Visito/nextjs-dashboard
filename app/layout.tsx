import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Hammis Dashboard',
    default: 'Hammis Dashboard',
  },
  description: 'Hammis golf stats',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  icons: {
    icon: '/golf-player_icon.ico'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
