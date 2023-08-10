import { Database } from "@/db/schema";
import {
    ProductEntry,
    TransformedUserData,
    UserProductEntry,
} from "@/interfaces/interfaces";
import recommendProducts from "@/lib/recommendation/recommend";
import {
    transformAllUserProductList,
    transformUserProductList,
} from "@/lib/recommendation/transformer";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

type Product = Database["public"]["Tables"]["products"]["Row"];
const useGetRecommendation = () => {
    const [product, setProduct] = useState<Product[] | null>(null);
    const [loading,setLoading] = useState<boolean>(false)
    const getProductData = async () => {
        try {
            setLoading(true)
            const supabase = createClientComponentClient<Database>();
            const {
                data: { user: user },
            } = await supabase.auth.getUser();
            if (!user) {
                throw new Error("User not found");
            }
            const [allProductResult, userProductResult] = await Promise.all([
                supabase.rpc("get_all_product_info"),
                supabase.rpc("get_user_product_info", {
                    input_user_id: user.id,
                }),
            ]);
            const { data: allProductJson, error: allProductError } =
                allProductResult;
            const { data: userProductJson, error: userProductError } =
                userProductResult;
            if (!allProductJson) throw new Error("All product json Missing");
            if (!userProductJson) throw new Error("User Product json Missing");
            if (allProductError) throw allProductError;
            if (userProductError) throw userProductError;
            //console.log("🚀 ~ file: useGetRecommendation.ts:33 ~ getProductData ~ allProductList:", allProductJson)
            //console.log("🚀 ~ file: useGetRecommendation.ts:35 ~ getProductData ~ userProductList:", userProductJson)
            const allUserProductList = transformAllUserProductList(
                allProductJson.valueOf() as ProductEntry[]
            );
            const userProductList = transformUserProductList(
                userProductJson.valueOf() as UserProductEntry[],
                user.id
            );
            console.log(
                "🚀 ~ file: useGetRecommendation.ts:42 ~ getProductData ~ allUserProductList:",
                allUserProductList
            );
            console.log(
                "🚀 ~ file: useGetRecommendation.ts:44 ~ getProductData ~ userProductList:",
                userProductList
            );

            // text dataset
            // const userProductList: TransformedUserData = {
            //     user_id: '1664a92b-6a53-43c0-88e0-aef242e54c73',
            //     product_id: [1, 2, 3],
            // };

            // const allUserProductList: TransformedUserData[] = [
            //     {
            //         user_id: '1664a92b-6a53-43c0-88e0-aef242e54c73',
            //         product_id: [4, 5, 6],
            //     },
            //     {
            //         user_id: 'efb92c5a-a65a-4ce4-8e66-f1c3b48049d3',
            //         product_id: [1, 2, 7],
            //     },
            //     {
            //         user_id: '80862ed3-5024-46e6-b7ac-0d5435046a15',
            //         product_id: [3, 6, 8],
            //     },
            // ];
            // const recommendedProducts = recommendProducts(
            //     userProductList,
            //     allUserProductList,
            //     similarityThreshold
            // );
            //console.log("🚀 ~ file: useGetRecommendation.ts:72 ~ getProductData ~ recommendedProducts:", recommendedProducts)

            const similarityThreshold = 0.5;
            const RecommendedProduct = recommendProducts(
                userProductList,
                allUserProductList,
                similarityThreshold
            );
            console.log(
                "🚀 ~ file: useGetRecommendation.ts:36 ~ getProductData ~ RecommendedProduct:",
                RecommendedProduct
            );

            if (RecommendedProduct.length != 0) {
                const { data: Products, error } = await supabase
                    .from("products")
                    .select("*")
                    .in("id", RecommendedProduct);
                if (error) throw error;
                setProduct(Products);
                setLoading(false)
            }

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getProductData();
    }, [product,loading]);

    return {product,loading}
};

export default useGetRecommendation;
