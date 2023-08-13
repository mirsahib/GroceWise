import { Products, ShoppingListProps } from '@/interfaces/interfaces';
import { formatDate } from '@/lib/util/truncateText';
import Image from 'next/image';
import { Button } from './ui/button';

export default function ShoppingList({ shoppingList }: ShoppingListProps) {
  return (
    <div className="border-4  p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">
        Shopping List #{shoppingList.shopping_list_id}
      </h2>
      <p className="mb-2">List added at: {formatDate(shoppingList.created_at)}</p>
      <div className="grid gap-4 grid-cols-2">
        {shoppingList.products.map((product) => (
          <div key={product.product_id} className="flex flex-col items-center justify-center border p-2">
            <Image
              priority
              width={100}
              height={100}
              sizes="100vw"
              style={{objectFit: 'cover'}}
              className="rounded-lg"
              src={product.img_url ?? ''}
              alt="Example image"
            />
            <p className="text-lg font-semibold">{product.product_title}</p>
            <p className='mb-2'>Price: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
