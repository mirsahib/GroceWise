// Import necessary interfaces
import { Product, ProductEntry, ShoppingList, TransformedUserData, UserProductEntry } from "@/interfaces/interfaces";

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



function transformShoppingLists(inputJSON: any[]): ShoppingList[] {
    const resultMap: Map<number, ShoppingList> = new Map();

    for (const item of inputJSON) {
        const product: Product = {
            product_id: item.product_id,
            product_title: item.product_title,
            price: item.price,
            img_url: item.img_url
        };

        if (!resultMap.has(item.shopping_list_id)) {
            resultMap.set(item.shopping_list_id, {
                shopping_list_id: item.shopping_list_id,
                products: [product],
                created_at: item.created_at
            });
        } else {
            const existingList = resultMap.get(item.shopping_list_id);
            if (existingList) {
                existingList.products.push(product);
            }
        }
    }

    const sortedLists = Array.from(resultMap.values()).sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return sortedLists;
}


// Export the functions for use in other modules
export { transformAllUserProductList, transformUserProductList,transformShoppingLists };
