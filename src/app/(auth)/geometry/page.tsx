"use server"
import EditGeolocation from "@/app/(auth)/geometry/editGeolocation";
import * as action from "@/actions";

export default async function Geometry() {
    const geolocation = await action.getGeolocationOrganizationBorder();
    return (
        <div className="flex flex-col md:flex-row h-full gap-2">
            <EditGeolocation Locations={geolocation?.border ?? []}/>
        </div>
    )
}