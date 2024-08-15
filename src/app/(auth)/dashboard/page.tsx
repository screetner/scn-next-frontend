import CustomMap from "@/components/map/Map";

export default async function Dashboard() {
    return (
        <div className="h-full w-full overflow-auto">
            <CustomMap
                isSettingMode={false}
                initialViewState={{latitude: 0, longitude: 0, zoom: 1}}
                popupData={[]}
                locations={[]}
                height="100%"
            />
        </div>
    )
}