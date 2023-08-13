'use client';
import { Products } from '@/interfaces/interfaces';
import { convertShelfLifeToText } from '@/lib/util/convertShelfLife';
import Image from 'next/image';
import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/db/schema';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetShoppingListCart } from '@/store/shoppingListCart';

type Props = {
  columns: { name: string }[];
  store: { product: Products | null }[];
  action: (item: Products | null) => void;
};
function formatDateToYYYYMMDD(date: Date): string {
  const yyyy: number = date.getFullYear();
  const mm: string = String(date.getMonth() + 1).padStart(2, '0');
  const dd: string = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function TableComponent({ columns, store, action }: Props) {
  const [shoppingDate, setshoppingDate] = useState(
    formatDateToYYYYMMDD(new Date()),
  );
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleUpdateShoppingDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setshoppingDate(e.target.value);
  };

  const handleSubmitShoppingList = async () => {
    try {
      setSubmitting(true);
      const productIds = store
        .map(({ product }) => product?.id) // Get an array with nulls and valid IDs
        .filter((id) => id !== null && id !== undefined); // Remove null and undefined values from the array
      const supabase = createClientComponentClient<Database>();
      const {
        data: { user: currentUser },
        error: currentUserError,
      } = await supabase.auth.getUser();
      if (currentUserError) throw currentUserError;
      if (!currentUser) throw new Error('User not found');

      let { data: shoppingListId, error: shoppingListError } =
      await supabase.rpc('create_shopping_list', {
          date: shoppingDate,
          input_user_id: currentUser.id,
          //@ts-ignore
          product_id_arr: productIds,
        });
        
        if (shoppingListError) throw shoppingListError;
        else {
        console.log("🚀 ~ file: TableComponent.tsx:55 ~ handleSubmitShoppingList ~ shoppingListId:", shoppingListId)
        setSubmitting(false);
        toast({
          title: 'Shopping list saved!',
          color: 'green',
        });
        dispatch(resetShoppingListCart())
        router.push('/');
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: TableComponent.tsx:56 ~ handleSubmitShoppingList ~ error:',
        error,
      );
      toast({
        title: 'Failed to save shopping list!',
        color: 'red',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {store.map(({ product }) => (
                <tr key={product?.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product?.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Image
                      priority
                      width={25}
                      height={25}
                      style={{ objectFit: 'cover' }}
                      className="w-full h-auto rounded-lg"
                      src={product?.img_url ?? ''}
                      alt="Example image"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product?.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {convertShelfLifeToText(product?.shelf_life ?? 0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <button
                      onClick={() => action(product)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col ml-auto">
          <div className="flex items-center ml-auto mb-5">
            <p className="mr-5">Shopping Date </p>
            <div className="flex items-center">
              <Input
                type="date"
                value={shoppingDate}
                defaultValue={shoppingDate}
                onChange={handleUpdateShoppingDate}
              />
            </div>
          </div>
          <Button
            disabled={submitting}
            onClick={() => handleSubmitShoppingList()}
            className="flex ml-auto"
          >
            {submitting ? 'Saving...' : 'Save Shopping List'}
          </Button>
        </div>
      </div>
    </div>
  );
}
