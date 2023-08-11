// Import necessary interfaces
import { ProductEntry, TransformedUserData, UserProductEntry } from "@/interfaces/interfaces";

// Function to transform the product list of all users
function transformAllUserProductList(
    inputData: ProductEntry[]
): TransformedUserData[] {
    // Create a map to store user-product associations
    const userProductsMap: Record<string, number[]> = {};

    // Iterate through the input data and populate the map
    for (const entry of inputData) {
        const userId = entry.user_id;
        const productId = entry.product_id;

        if (!(userId in userProductsMap)) {
            userProductsMap[userId] = [];
        }

        if (!userProductsMap[userId].includes(productId)) {
            userProductsMap[userId].push(productId);
        }
    }

    // Convert the map into the desired transformed data format
    const transformedData: TransformedUserData[] = [];

    for (const userId in userProductsMap) {
        transformedData.push({
            user_id: userId,
            product_id: userProductsMap[userId],
        });
    }

    return transformedData;
}

// Function to transform the product list of a specific user
function transformUserProductList(
    userProductList: UserProductEntry[],
    userId: string
): TransformedUserData {
    // Create a transformed data object for the specified user
    const transformedData: TransformedUserData = {
        user_id: userId,
        product_id: [],
    };

    // Populate the transformed data with product IDs from the user's list
    for (const product of userProductList) {
        transformedData.product_id.push(product.product_id);
    }

    return transformedData;
}

// Export the functions for use in other modules
export { transformAllUserProductList, transformUserProductList };
