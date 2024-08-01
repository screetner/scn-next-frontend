"use client"

import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import Link from "next/link";
import {TNav} from "@/types/navList";
import { usePathname } from 'next/navigation'

interface NavIconProps {
    nav: TNav
}
export default function NavIcon({nav} : NavIconProps) {
    const pathname = usePathname()
    const active = pathname === nav.path

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={nav.path}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${active ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
                >
                    {nav.icon}
                    <span className="sr-only">{nav.label}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
    )
}