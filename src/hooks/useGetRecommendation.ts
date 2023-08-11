// Import necessary modules and interfaces
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

// Define the type for the 'Product' object
type Product = Database["public"]["Tables"]["products"]["Row"];

// Custom hook to fetch recommendation data
const useGetRecommendation = () => {
    const [product, setProduct] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Function to fetch and process recommendation data
    const getProductData = async () => {
        try {
            setLoading(true);
            const supabase = createClientComponentClient<Database>();
            const {
                data: { user: user },
            } = await supabase.auth.getUser();
            if (!user) {
                throw new Error("User not found");
            }

            // Fetch data using Supabase RPC
            const [allProductResult, userProductResult] = await Promise.all([
                supabase.rpc("get_all_product_info"),
                supabase.rpc("get_user_product_info", {
                    input_user_id: user.id,
                }),
            ]);

            const { data: allProductJson, error: allProductError } = allProductResult;
            const { data: userProductJson, error: userProductError } = userProductResult;

            if (!allProductJson) throw new Error("All product json Missing");
            if (!userProductJson) throw new Error("User Product json Missing");
            if (allProductError) throw allProductError;
            if (userProductError) throw userProductError;

            // Transform data using transformer functions
            const allUserProductList = transformAllUserProductList(
                allProductJson.valueOf() as ProductEntry[]
            );
            const userProductList = transformUserProductList(
                userProductJson.valueOf() as UserProductEntry[],
                user.id
            );

            // Set similarity threshold
            const similarityThreshold = 0.04;

            // Use recommendation function to get recommended product IDs
            const RecommendedProduct = recommendProducts(
                userProductList,
                allUserProductList,
                similarityThreshold
            );
            console.log(
                "🚀 ~ file: useGetRecommendation.ts:36 ~ getProductData ~ RecommendedProduct:",
                RecommendedProduct
            );
            // Fetch product data based on recommended product IDs
            if (RecommendedProduct.length !== 0) {
                const { data: Products, error } = await supabase
                    .from("products")
                    .select("*")
                    .in("id", RecommendedProduct);
                if (error) throw error;
                setProduct(Products);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch recommendation data on component mount
    useEffect(() => {
        getProductData();
    }, []);

    return { product, loading };
};

export default useGetRecommendation;
