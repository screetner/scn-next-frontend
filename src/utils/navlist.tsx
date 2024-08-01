import {TNav} from "@/types/navList";
import {Home, LocateFixed} from "lucide-react";

export const navList : TNav[] = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: <Home className={"h-5 w-5"}/>
    },
    {
        label: "Geometry",
        path: "/geometry",
        icon: <LocateFixed className={"h-5 w-5"}/>
    }
]