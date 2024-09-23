'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ChevronRight, Book } from 'lucide-react'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'use', title: '2. Use of Service' },
  { id: 'privacy', title: '3. Privacy Policy' },
  { id: 'intellectual-property', title: '4. Intellectual Property' },
  { id: 'termination', title: '5. Termination' },
  { id: 'changes', title: '6. Changes to Terms' },
  { id: 'contact', title: '7. Contact Us' },
]

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="container mx-auto py-12 px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">
            Last updated: September 23, 2024
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Table of Contents */}
          <Card className="w-full lg:w-1/4 lg:sticky top-4 h-fit">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold flex items-center mb-6">
                <Book className="mr-2 h-5 w-5" /> Table of Contents
              </h2>
              <ScrollArea className="h-[40vh] pr-2">
                <ul className="space-y-3">
                  {sections.map(section => (
                    <li key={section.id}>
                      <Button
                        variant="ghost"
                        className={cn(
                          'w-full justify-start text-left hover:bg-primary/10 hover:text-primary transition-all',
                          activeSection === section.id
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700',
                        )}
                        onClick={() => scrollToSection(section.id)}
                      >
                        <ChevronRight className="mr-2 h-4 w-4" />
                        {section.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card className="w-full lg:w-3/4">
            <CardContent className="p-8">
              <ScrollArea className="h-[60vh] lg:h-[65vh] pr-2">
                <div className="space-y-12">
                  {sections.map(section => (
                    <section
                      id={section.id}
                      key={section.id}
                      className="scroll-mt-24"
                    >
                      <h2 className="text-3xl font-bold mb-6">
                        {section.title}
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {/* Add content specific to each section here */}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque auctor urna id orci volutpat, vel consequat
                        metus placerat.
                      </p>
                    </section>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
