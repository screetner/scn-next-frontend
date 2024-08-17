import {Location} from "@/types/map";

export function get2CapitalizedWords(str: string | undefined): string {
    return (str?.match(/\b(\w)/g) || []).join('').toUpperCase()
}

export function shouldRefreshToken(expiryTime: Date, thresholdInSeconds: number): boolean {
    const currentTime = new Date().getTime();
    const expiryTimeInMillis = expiryTime.getTime();
    const timeRemaining = expiryTimeInMillis - currentTime;

    // If the time remaining is less than the threshold, we should refresh the token
    return timeRemaining < thresholdInSeconds * 1000;
}

export const calculateCenter = (locations: Location[]) => {
    const totalPoints = locations.length;
    const { lat, long } = locations.reduce(
        (acc, { latitude, longitude }) => {
            acc.lat += latitude;
            acc.long += longitude;
            return acc;
        },
        { lat: 0, long: 0 }
    );

    return {
        lat: lat / totalPoints,
        long: long / totalPoints
    };
};