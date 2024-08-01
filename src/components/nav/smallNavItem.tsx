import {Home} from "lucide-react";
import Link from "next/link";
import {TNav} from "@/types/navList";

export default function SmallNavItem({nav}: { nav: TNav }) {
    return (
        <Link
            href={nav.path}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
            {nav.icon}
            {nav.label}
        </Link>
    )
}