// Import necessary modules and interfaces
import { Database } from '@/db/schema';
import {
  ProductEntry,
  ShoppingList,
  TransformedUserData,
  UserProductEntry,
} from '@/interfaces/interfaces';
import recommendProducts from '@/lib/recommendation/recommend';
import {
  transformAllUserProductList,
  transformShoppingLists,
  transformUserProductList,
} from '@/lib/recommendation/transformer';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

// Define the type for the 'Product' object
type Product = Database['public']['Tables']['products']['Row'];

// Custom hook to fetch recommendation data
const useGetShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingList[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();

  // Function to fetch and process recommendation data
  const getShoppingListData = async () => {
    try {
      setLoading(true);
      const {
        data: { user: user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not found');
      }

      // Fetch data using Supabase RPC
      const {
        data: userProductJson,
        error: userProductError,
    } = await supabase.rpc('get_user_product_info', {
        input_user_id: user.id,
      });
      if (!userProductJson) throw new Error('User Product json Missing');
      if (userProductError) throw userProductError;
      console.log("🚀 ~ file: useGetShoppingList.ts:39 ~ getShoppingListData ~ userProductJson:", userProductJson)
      

      // Transform data using transformer functions
      const shoppingList = transformShoppingLists(
        userProductJson.valueOf() as UserProductEntry[]
      );
      console.log(
        '🚀 ~ file: useGetFrequentProduct.ts:40 ~ getProductData ~ frequentProduct:',
        shoppingList
      );
      setShoppingList(shoppingList);
      setLoading(false);

    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  };
  // Fetch shopping list data on component mount
  useEffect(() => {
    getShoppingListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { shoppingList, loading };
};

export default useGetShoppingList;
