import { ProductEntry, TransformedUserData, UserProductEntry } from "@/interfaces/interfaces";

function transformAllUserProductList(
    inputData: ProductEntry[]
): TransformedUserData[] {
    const userProductsMap: Record<string, number[]> = {};

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

    const transformedData: TransformedUserData[] = [];

    for (const userId in userProductsMap) {
        transformedData.push({
            user_id: userId,
            product_id: userProductsMap[userId],
        });
    }

    return transformedData;
}
function transformUserProductList(
    userProductList: UserProductEntry[],
    userId: string
): TransformedUserData {
    const transformedData: TransformedUserData = {
        user_id: userId,
        product_id: [],
    };

    for (const product of userProductList) {
        transformedData.product_id.push(product.product_id);
    }

    return transformedData;
}

export { transformAllUserProductList, transformUserProductList };
