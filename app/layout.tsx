import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Teach Hub',
  description: 'Teach Hub: All your students, in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ClerkProvider>
        <body className={inter.className}> 
          {/* Will be a Header component, not tag */}
          <header>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>      
            {children}
        </body>
      </ClerkProvider>
    </html>
  );
}