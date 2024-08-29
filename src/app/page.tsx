import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">YourDocsSite</h1>
          {session ? (
            <Button asChild variant="secondary">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="secondary">
              <Link href="/signin">Login</Link>
            </Button>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 flex-grow">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Welcome to YourDocsSite</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your comprehensive resource for project documentation, guides, and
            API references. Explore our extensive collection of well-organized
            and up-to-date documentation.
          </p>
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
              <p>
                Detailed guides on how to use every feature of our product, with
                step-by-step instructions and examples.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Comprehensive API documentation for developers, including
                endpoints, request/response formats, and authentication.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Learn how to accomplish common tasks with our easy-to-follow
                tutorials, perfect for beginners and advanced users alike.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Our Contributors
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['John Doe', 'Jane Smith', 'Alex Johnson', 'Emily Brown'].map(
              (name, index) => (
                <Badge key={index} variant="secondary">
                  {name}
                </Badge>
              ),
            )}
          </div>
        </section>
      </main>

      <footer className="py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 YourDocsSite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
