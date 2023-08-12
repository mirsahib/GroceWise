"use client"
import ProductCard from "@/components/ProductCard";
import useGetRecommendation from "@/hooks/useGetRecommendation";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

export default function RecommendationContainer({}: Props) {
    const {product,loading}= useGetRecommendation()

    return (
        <div>
            <h1 className="text-xl font-semibold mb-5">Recommendation</h1>
            <div className="flex flex-col ">
                {loading ? (
                    <div className="w-full flex justify-center text-slate-800">
                        <Loader2 className=" animate-spin" size={60} />
                    </div>
                ) : (
                    ""
                )}
                
                <div className="flex flex-wrap gap-4">
                    {product &&
                        product.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                </div>
            </div>

        </div>
    );
}
