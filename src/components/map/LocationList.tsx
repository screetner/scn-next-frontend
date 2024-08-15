// "use client"

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Location } from "@/types/map"
import { Trash2, Save } from "lucide-react"
import {TypographyP} from "@/components/typography/TypographyP";
import {cn} from "@/lib/utils";
import {useTheme} from "next-themes";

interface LocationListProps {
    locations: Location[]
    onHover: (index: number | null) => void
    onDelete: (index: number) => void
    onClearAll: () => void
    onSave: () => void
}

export function LocationList({ locations, onHover, onDelete, onClearAll, onSave }: LocationListProps) {
    const [scrollAreaHeight, setScrollAreaHeight] = useState(0)
    const cardRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const footerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updateScrollAreaHeight = () => {
            if (cardRef.current && headerRef.current && footerRef.current) {
                const cardHeight = cardRef.current.clientHeight
                const headerHeight = headerRef.current.clientHeight
                const footerHeight = footerRef.current.clientHeight
                setScrollAreaHeight(cardHeight - headerHeight - footerHeight)
            }
        }

        updateScrollAreaHeight()
        window.addEventListener('resize', updateScrollAreaHeight)

        return () => {
            window.removeEventListener('resize', updateScrollAreaHeight)
        }
    }, [])

    const {theme} = useTheme()

    return (
        <Card ref={cardRef} className="flex flex-col h-full">
            <CardHeader ref={headerRef}>
                <CardTitle>Locations</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden mb-2">
                <ScrollArea style={{ height: `${scrollAreaHeight}px` }}>
                    <div className="p-4">
                        {locations.map((location, index) => (
                            <div
                                key={index}
                                className={cn("flex justify-between items-center p-2 rounded-md transition-colors",{
                                    "hover:dark:bg-slate-800": theme === "dark",
                                    "hover:bg-slate-50": theme === "light"
                                })}
                                onMouseEnter={() => onHover(index)}
                                onMouseLeave={() => onHover(null)}
                            >
                                <TypographyP
                                    text={`${location.latitude.toFixed(3)}, ${location.longitude.toFixed(3)}`}
                                />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => onDelete(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter ref={footerRef} className="flex justify-between">
                <Button variant="outline" onClick={onClearAll}>
                    Clear All
                </Button>
                <form action={onSave}>
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Save
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}