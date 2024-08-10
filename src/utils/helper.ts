
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