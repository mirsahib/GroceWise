
"use client"
import { ProductCardProps } from '@/interfaces/interfaces';
import ProductCard from '@/components/ProductCard';
import useGetProductData from '@/hooks/useGetProductData';

const products: ProductCardProps[] = [
    {
      product_id: 1,
      product_image: '/website-2.0-header.png',
      product_title: 'Product 1',
      product_description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam hic saepe totam voluptates impedit exercitationem eligendi placeat id nihil debitis!',
      product_price: 9.0,
      product_shelf_life: '2021-10-10',
    },
  ];
  
export default function ProductContainer() {
    const {products,loading} = useGetProductData()
  return (
    <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
        {products && products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
  )
}