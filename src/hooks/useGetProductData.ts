'use client';

import { Products } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/db/schema';

const useGetProductData = (category: string) => {
  const [products, setProducts] = useState<Products[] | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getProductData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', category);
        if (error) throw error;
        if (!data) throw new Error('Product data missing');
        console.log(
          '🚀 ~ file: useGetProductData.ts:10 ~ useGetProductData ~ data:',
          data
        );
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  return { products, loading };
};

export default useGetProductData;
