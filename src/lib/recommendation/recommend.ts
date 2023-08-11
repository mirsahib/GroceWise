// Import necessary interfaces
import { TransformedUserData } from "@/interfaces/interfaces";

// Function to calculate cosine similarity between two product ID arrays
function calculateCosineSimilarity(userAProductIds: number[], userBProductIds: number[]): number {
    // Calculate the intersection of product IDs
    const intersection = userAProductIds.filter(id => userBProductIds.includes(id));

    // Calculate the dot product of the intersection
    const dotProduct = intersection.length;

    // Calculate the norms of the product ID arrays
    const normA = Math.sqrt(userAProductIds.length);
    const normB = Math.sqrt(userBProductIds.length);

    // Calculate the cosine similarity
    const cosineSimilarity = dotProduct / (normA * normB);

    return cosineSimilarity;
}

// Function to recommend products based on cosine similarity
function recommendProducts(userProductList: TransformedUserData, allProductList: TransformedUserData[], similarityThreshold: number): number[] {
    // Create a set to store recommended product IDs
    console.log("🚀 ~ file: recommend.ts:18 ~ recommendProducts ~ allProductList:", allProductList)
    console.log("🚀 ~ file: recommend.ts:18 ~ recommendProducts ~ userProductList:", userProductList)
    const recommendedProducts = new Set<number>();

    // Iterate through all users' product lists
    for (const productEntry of allProductList) {
        const userId = productEntry.user_id;
        const productIds = productEntry.product_id;

        if (userId === userProductList.user_id) {
            continue; // Skip the specified user
        }

        // Calculate the cosine similarity between the user's product list and the current user's list
        const similarity = calculateCosineSimilarity(userProductList.product_id, productIds);
        console.log("🚀 ~ file: recommend.ts:31 ~ recommendProducts ~ similarity:", similarity)

        // Check if the similarity is above the specified threshold
        if (similarity >= similarityThreshold) {
            // Add products from the current user's list to recommendations
            for (const productId of productIds) {
                if (!userProductList.product_id.includes(productId)) {
                    recommendedProducts.add(productId);
                }
            }
        }
    }

    // Convert the set of recommended product IDs to an array
    return Array.from(recommendedProducts);
}

// Export the function for use in other modules
export default recommendProducts;
