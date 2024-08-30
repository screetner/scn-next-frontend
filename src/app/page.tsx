import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cookies } from 'next/headers';
import { TypographyH2 } from '@/components/typography/TypographyH2';
import { TypographyP } from '@/components/typography/TypographyP';

export default async function Home() {
  const session = await auth();
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  const isDarkTheme = theme?.value === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col ${isDarkTheme ? 'bg-gradient-to-b from-gray-900 to-black text-white' : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'}`}
    >
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <TypographyH2 text={'Screetner'} />
          {session ? (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/signin">Login</Link>
            </Button>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 flex-grow">
        <section className="text-center mb-16">
          <TypographyH2
            text={'Welcome to YourDocsSite'}
            className={'text-5xl font-bold mb-6'}
          />
          <TypographyP
            text={
              'Your comprehensive resource for project documentation, guides, and\n' +
              '            API references. Explore our extensive collection of well-organized\n' +
              '            and up-to-date documentation.'
            }
            className={'text-xl mb-8 max-w-2xl mx-auto'}
          />
          <Button asChild size="lg">
            <Link href="#">Explore Docs</Link>
          </Button>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Feature Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP
                text={
                  'Detailed guides on how to use every feature of our product, with\n' +
                  '  step-by-step instructions and examples.'
                }
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP
                text={
                  'Comprehensive API documentation for developers, including\n' +
                  '  endpoints, request/response formats, and authentication.'
                }
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP
                text={
                  'Learn how to accomplish common tasks with our easy-to-follow\n' +
                  '  tutorials, perfect for beginners and advanced users alike.'
                }
              />
            </CardContent>
          </Card>
        </section>

        <section className="mt-16">
          <TypographyH2 text={'Our Contributors'} className={'text-center'} />
          <div className="flex flex-wrap justify-center gap-4">
            {['AuJung', 'Quercussi', 'ball46'].map((name, index) => (
              <Badge key={index}>{name}</Badge>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="container mx-auto px-4 text-center">
          <TypographyP text={'© 2024 YourDocsSite. All rights reserved.'} />
        </div>
      </footer>
    </div>
  );
}
