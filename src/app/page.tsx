import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { ProductCardProps } from '@/interfaces/interfaces';

export const dynamic = 'force-dynamic';

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

export default async function Home() {
  return (
    <>
      <SearchBar />

      <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.product_id} {...product} />
        ))}
      </div>
    </>
  );
}
