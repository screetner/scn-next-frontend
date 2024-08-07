"use client"

import CustomMap from "@/components/map/Map"
import { LocationList } from "@/components/map/LocationList"
import {useMemo, useState} from "react"
import { Location } from "@/types/map"

export default function Geometry() {
    const [savedGeometry, setSavedGeometry] = useState<Location[]>([
        { lat: 13.737717, long: 100.523186 },
        { lat: 13.736717, long: 100.524673 },
        { lat: 13.735717, long: 100.524186 },
        { lat: 13.735717, long: 100.522186 },
    ])
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const center = useMemo(() => {
        const totalPoints = savedGeometry.length;
        const { lat, long } = savedGeometry.reduce(
            (acc, { lat, long }) => {
                acc.lat += lat;
                acc.long += long;
                return acc;
            },
            { lat: 0, long: 0 }
        );

        return {
            lat: lat / totalPoints,
            long: long / totalPoints
        };
    }, [savedGeometry]);

    const handleGeometryChange = (newGeometry: Location[]) => {
        setSavedGeometry(newGeometry)
    }

    const handleDelete = (index: number) => {
        setSavedGeometry(prevLocations =>
            prevLocations.filter((_, i) => i !== index)
        )
    }

    const handleClearAll = () => {
        setSavedGeometry([])
    }

    const handleSave = () => {
        // Implement save functionality
        console.log("Saving locations:", savedGeometry)
    }

    return (
        <div className={"flex flex-col md:flex-row h-full gap-2"}>
            <div className={"md:w-3/4 h-full border-2"}>
                <CustomMap
                    isSettingMode={true}
                    initialViewState={{
                        longitude: center.long || 100.523186,
                        latitude: center.lat || 13.736717,
                        zoom: center.lat && center.long ? 15 : 5,
                    }}
                    popupData={[]}
                    initialGeometry={savedGeometry}
                    height="100%"
                    onGeometryChange={handleGeometryChange}
                    hoveredIndex={hoveredIndex}
                />
            </div>
            <div className="overflow-y-auto md:w-1/4 h-full max-h-full">
                <LocationList
                    locations={savedGeometry}
                    onHover={setHoveredIndex}
                    onDelete={handleDelete}
                    onClearAll={handleClearAll}
                    onSave={handleSave}
                />
            </div>
        </div>
    )
}