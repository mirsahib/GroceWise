import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

const useGetProductCategory = () => {
  const [category, setCategory] = useState<string[] | null>();
  const [loadingCategory, setCategoryLoading] = useState(false);
  const getCategoryData = async () => {
    try {
      setCategoryLoading(true);
      let { data, error } = await supabase.rpc('get_unique_categories');
      if (error) throw error;
      if (!data) throw new Error('Category data missing');

      setCategory(data);
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
