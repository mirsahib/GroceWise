"use client";
import { ProductCardProps } from "@/interfaces/interfaces";
import ProductCard from "@/components/ProductCard";
import useGetProductData from "@/hooks/useGetProductData";
import useGetProductCategory from "@/hooks/useGetProductCatagory";
import { Button } from "@/components/ui/button";
import truncateText from "@/lib/util/truncateText";

const products: ProductCardProps[] = [
    {
        product_id: 1,
        product_image: "/website-2.0-header.png",
        product_title: "Product 1",
        product_description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam hic saepe totam voluptates impedit exercitationem eligendi placeat id nihil debitis!",
        product_price: 9.0,
        product_shelf_life: "2021-10-10",
    },
];

export default function ProductContainer() {
    const { catagory, loadingCategory } = useGetProductCategory();
    const { products, loading } = useGetProductData();
    return (
        <div className="">
            <div className="flex gap-4 mb-5">
              {catagory && catagory.length > 0 && (
                catagory.map(item=><Button title={item} variant={'secondary'} >{truncateText(item,16)}</Button>)
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
            </div>
        </div>
    );
}
