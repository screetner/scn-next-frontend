import CustomMap from "@/components/map/Map";

export default function Geometry(){
    const initialGeometry = [
        {"lat": 13.737717, "long": 100.523186},  // Top
        {"lat": 13.736717, "long": 100.524673},  // Top Right
        {"lat": 13.735717, "long": 100.524186},  // Bottom Right
        {"lat": 13.735717, "long": 100.522186},  // Bottom Left
        {"lat": 13.736717, "long": 100.521699}   // Top Left
    ]
    return (
        <div className={"flex flex-col md:flex-row h-full"}>
            <div className={"md:w-3/4 h-full"}>
                <CustomMap
                    isSettingMode={true}
                    initialViewState={{
                        longitude: 100.523186,
                        latitude: 13.736717,
                        zoom: 5
                    }}
                    popupData={[]}
                    initialGeometry={initialGeometry}
                    height={"100%"}
                />
            </div>
            <div className={"overflow-y-auto bg-amber-300 md:w-1/4 h-full"}>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </div>
        </div>
    )
}