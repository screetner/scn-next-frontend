import {DashboardMap} from "@/app/(auth)/dashboard/DashboardMap";
import * as actions from "@/actions";

export default async function Dashboard() {
    const assets = await actions.getAssets()
    return (
        <div className="h-full w-full overflow-auto">
            <DashboardMap
                data={assets}
            />
        </div>
    )
}