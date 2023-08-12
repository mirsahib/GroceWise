'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/db/schema';

const useGetProductCategory = () => {
  const [category, setCatagory] = useState<string[] | null>();
  const [loadingCategory, setCategoryLoading] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const getCategoryData = async () => {
    try {
      setCategoryLoading(true);
      const { data, error } = await supabase.rpc('get_unique_categories');

      if (error) throw error;

      if (!data) throw new Error('Category data missing');

      setCatagory(data);
      setCategoryLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return { category, loadingCategory };
};

export default useGetProductCategory;
