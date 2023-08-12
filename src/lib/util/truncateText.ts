export default function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    }

    const truncatedText = text.substr(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');

    if (lastSpaceIndex !== -1) {
        return truncatedText.substr(0, lastSpaceIndex) + '...';
    }

    return text; // If no suitable space found, return original text
}

// Example usage:
//const originalText = "Eggs, Meat & Fish";
//const truncated = truncateText(originalText, 10);
//console.log(truncated); // Output: "Eggs, Meat..."
