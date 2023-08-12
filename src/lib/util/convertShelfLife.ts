export function convertShelfLife(shelfLife: number | null): string {
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
