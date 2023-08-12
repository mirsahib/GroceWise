"use client";
import ProductCard from "@/components/ProductCard";
import useGetFrequentProduct from "@/hooks/useGetFrequentProduct";
import { Loader2 } from "lucide-react";

type Props = {};

export default function FrequentlyBoughtContainer({}: Props) {
    const { product, loading } = useGetFrequentProduct();
    return (
        <div>
            <h1 className="text-xl font-bold mb-5 ">Frequently Bought Item</h1>
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
