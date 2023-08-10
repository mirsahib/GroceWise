import { TransformedUserData } from "@/interfaces/interfaces";

function calculateCosineSimilarity(userAProductIds: number[], userBProductIds: number[]): number {
    const intersection = userAProductIds.filter(id => userBProductIds.includes(id));

    const dotProduct = intersection.length;

    const normA = Math.sqrt(userAProductIds.length);
    const normB = Math.sqrt(userBProductIds.length);

    const cosineSimilarity = dotProduct / (normA * normB);

    return cosineSimilarity;
}


function recommendProducts(userProductList: TransformedUserData, allProductList: TransformedUserData[], similarityThreshold: number): number[] {
    console.log("🚀 ~ file: recommend.ts:18 ~ recommendProducts ~ allProductList:", allProductList)
    console.log("🚀 ~ file: recommend.ts:18 ~ recommendProducts ~ userProductList:", userProductList)
    const recommendedProducts = new Set<number>();

    for (const productEntry of allProductList) {
        const userId = productEntry.user_id;
        const productIds = productEntry.product_id;

        if (userId === userProductList.user_id) {
            continue;
        }

        const similarity = calculateCosineSimilarity(userProductList.product_id, productIds);

        if (similarity >= similarityThreshold) {
            for (const productId of productIds) {
                if (!userProductList.product_id.includes(productId)) {
                    recommendedProducts.add(productId);
                }
            }
        }
    }

    console.log("🚀 ~ file: recommend.ts:40 ~ recommendProducts ~ recommendedProducts:", recommendedProducts)
    return Array.from(recommendedProducts);
}
export default recommendProducts