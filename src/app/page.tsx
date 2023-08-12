import SearchBar from '@/components/SearchBar';
import ProductContainer from '@/container/ProductContainer';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <>
      <SearchBar />
      <ProductContainer/>
    </>
  );
}
