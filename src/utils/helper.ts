
export function get2CapitalizedWords(str: string | undefined): string {
    return (str?.match(/\b(\w)/g) || []).join('').toUpperCase()
}