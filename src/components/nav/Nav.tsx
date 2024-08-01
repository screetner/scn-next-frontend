import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"

import {
    TooltipProvider
} from "@/components/ui/tooltip"
import {ModeToggle} from "@/components/ModeToggle";
import {Person} from "@/components/nav/person";
import {PropsWithChildren} from "react";
import {navList} from "@/utils/navlist"
import NavIcon from "@/components/nav/navIcon";
import SideNav from "@/components/nav/SideNav";

export function Nav({children} : PropsWithChildren) {
    return (
        <TooltipProvider>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    {
                        navList.map((nav) => {
                            return (
                                <NavIcon key={nav.label} nav={nav}/>
                            )
                        })
                    }
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <ModeToggle/>
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header
                    className="sticky top-0 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <SideNav/>
                    <Breadcrumb className="hidden sm:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <Person/>
                </header>
                <main className={"p-2 md:px-6"}>
                    {children}
                </main>
            </div>
        </TooltipProvider>
    )
}