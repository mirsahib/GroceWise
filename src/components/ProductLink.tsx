import { Database } from '@/db/schema';
import React, { SetStateAction } from 'react';
import { Button } from './ui/button';
type Products = Database['public']['Tables']['products']['Row'];

type Props = {
  product: Products;
  action:React.Dispatch<SetStateAction<Products|null>>
}
export default function ProductLink({product,action}: Props) {
  
  return (
    <li>
      <Button
        onMouseDown={() =>action(product) }
        variant={'secondary'}
        className="w-full block text-gray-800 hover:bg-gray-800 hover:text-white p-2 rounded"
      >
        {product.title}
      </Button>
    </li>
  );
}
