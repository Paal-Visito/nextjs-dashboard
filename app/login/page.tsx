import HammisLogo from '@/app/ui/hammis-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
 
export const metadata: Metadata = {
  title: 'Login'
}

export default function LoginPage() {
    return (
        <main className="flex items-center bg-gray-900 justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <Card className='rounded-lg'>
                    <CardContent className='p-0'>
                        <div className="flex h-20 w-full items-end rounded-lg bg-black md:h-36">
                            <div className="w-32 text-white md:w-36">
                                <HammisLogo />
                            </div>
                        </div>
                        <Suspense>
                            <LoginForm />
                        </Suspense>                        
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}