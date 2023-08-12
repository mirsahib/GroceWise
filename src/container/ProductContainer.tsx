'use client';
import ProductCard from '@/components/ProductCard';
import useGetProductData from '@/hooks/useGetProductData';
import useGetProductCategory from '@/hooks/useGetProductCatagory';
import { Button, buttonVariants } from '@/components/ui/button';
import truncateText from '@/lib/util/truncateText';
import { useState } from 'react';

export default function ProductContainer() {
  const [currentCategory, setCurrentCategory] = useState('Baby Care');
  const { catagory, loadingCategory } = useGetProductCategory();
  const { products, loading } = useGetProductData(currentCategory);
  return (
    <div className='flex flex-col mx-auto'>
      <div className='flex flex-wrap gap-4 mb-5 '>
        {catagory &&
          catagory.length > 0 &&
          catagory.map((item) => (
            <Button
              key={item}
              onClick={() => setCurrentCategory(item)}
              title={item}
              className={`${
                item === currentCategory
                  ? buttonVariants({ variant: 'default' })
                  : buttonVariants({ variant: 'secondary' })
              }`}>
              {truncateText(item, 16)}
            </Button>
          ))}
      </div>

      <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </div>
    </div>
  );
}
