import { UserProductEntry } from "@/interfaces/interfaces";

function findMostFrequentProductIds(products: UserProductEntry[]): number[] {
    const productCountMap: Record<number, number> = {}; // Map to store product frequency count
    let highestFrequency = 0;

    for (const product of products) {
        if (product.product_id in productCountMap) {
            productCountMap[product.product_id]++;
        } else {
            productCountMap[product.product_id] = 1;
        }

        if (productCountMap[product.product_id] > highestFrequency) {
            highestFrequency = productCountMap[product.product_id];
        }
    }

    const mostFrequentProductIds: number[] = [];

    for (const productId in productCountMap) {
        if (productCountMap[productId] === highestFrequency) {
            mostFrequentProductIds.push(Number(productId));
        }
    }

    return mostFrequentProductIds;
}

export default findMostFrequentProductIds