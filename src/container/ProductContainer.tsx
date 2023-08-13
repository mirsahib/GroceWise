'use client';
import ProductCard from '@/components/ProductCard';
import useGetProductData from '@/hooks/useGetProductData';
import useGetProductCategory from '@/hooks/useGetProductCatagory';
import { Button, buttonVariants } from '@/components/ui/button';
import truncateText from '@/lib/util/truncateText';
import { useState } from 'react';

export default function ProductContainer() {
  const [currentCategory, setCurrentCategory] = useState('Baby Care');
  const { category, loadingCategory } = useGetProductCategory();
  const { products, loading } = useGetProductData(currentCategory);
  return (
    <div className="flex flex-col mx-auto">
      <div className="flex flex-wrap justify-center mx-auto gap-4 my-5 md:w-[480px] lg:w-[720px]">
        {category &&
          category.length > 0 &&
          category.map((item) => (
            <Button
              onClick={() => setCurrentCategory(item)}
              title={item}
              key={item}
              className={`
              ${
                item === currentCategory
                  ? buttonVariants({ variant: 'default' })
                  : buttonVariants({ variant: 'secondary' })
              }`}
            >
              <span className="text-xs">{truncateText(item, 24)}</span>
            </Button>
          ))}
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
