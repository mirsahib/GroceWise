export function convertShelfLifeToText(shelfLife: number | null): string {
    if (shelfLife === null) {
        return 'Unknown shelf life';
    } else if (shelfLife === 7) {
        return '7 days';
    } else if (shelfLife === 30) {
        return '30 days';
    } else if (shelfLife === 60) {
        return '2 months';
    } else if (shelfLife === 180) {
        return '6 months';
    } else if (shelfLife === 730) {
        return '2 years';
    } else if (shelfLife === 520) {
        return '1.5 years';
    } else if (shelfLife === 365) {
        return '1 year';
    } else {
        return 'Unknown shelf life';
    }
}
export function convertShelfLifeToDays(shelfLife: string): number | null {
    if (shelfLife === 'Unknown shelf life') {
        return null;
    } else if (shelfLife === '7 days') {
        return 7;
    } else if (shelfLife === '30 days') {
        return 30;
    } else if (shelfLife === '2 months') {
        return 60;
    } else if (shelfLife === '6 months') {
        return 180;
    } else if (shelfLife === '2 years') {
        return 730;
    } else if (shelfLife === '1.5 years') {
        return 520;
    } else if (shelfLife === '1 year') {
        return 365;
    } else {
        // Return a default value or handle the case of an unknown input
        return null;
    }
}
