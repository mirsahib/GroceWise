// Import necessary modules and interfaces
import { Database } from '@/db/schema';
import { UserProductEntry } from '@/interfaces/interfaces';
import findMostFrequentProductIds from '@/lib/frequentlyProduct/findMostFrequentProductIds';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

// Define the type for the 'Product' object
type Product = Database['public']['Tables']['products']['Row'];

// Custom hook to fetch recommendation data
const useGetFrequentProduct = () => {
  const [product, setProduct] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();

  // Function to fetch and process recommendation data
  const getProductData = async () => {
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
      console.log(
        '🚀 ~ file: useGetFrequentProduct.ts:29 ~ getProductData ~ userProductJson:',
        userProductJson
      );
      const frequentProduct = findMostFrequentProductIds(
        userProductJson.valueOf() as UserProductEntry[]
      );
      console.log(
        '🚀 ~ file: useGetFrequentProduct.ts:40 ~ getProductData ~ frequentProduct:',
        frequentProduct
      );
      //Fetch product data based on frequent product IDs
      if (frequentProduct.length !== 0) {
        const { data: Products, error } = await supabase
          .from('products')
          .select('*')
          .in('id', frequentProduct);
        if (error) throw error;
        console.log(
          '🚀 ~ file: useGetFrequentProduct.ts:47 ~ getProductData ~ Products:',
          Products
        );
        setProduct(Products);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch frequent product data on component mount
  useEffect(() => {

    getProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { product, loading };
};

export default useGetFrequentProduct;
