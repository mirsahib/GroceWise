'use client';

import { useEffect, useState } from 'react';
import { Products } from '@/interfaces/interfaces';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/db/schema';

const useGetProductData = (category: string) => {
  const [products, setProducts] = useState<Products[] | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const getProductData = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category);

      if (error) throw error;

      if (!data) throw new Error('Product data missing');

      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return { products, loading };
};

export default useGetProductData;
