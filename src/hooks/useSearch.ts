import { useEffect, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { SearchFormInputs } from '@/interfaces/interfaces';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/db/schema';
import { toast } from '@/components/ui/use-toast';

type Products = Database['public']['Tables']['products']['Row'];
function debounce(func: Function, delay: number) {
  let timerId: ReturnType<typeof setTimeout>;

  return function (...args: any[]) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const useSearch = (watch: UseFormWatch<SearchFormInputs>) => {
  const [products, setProducts] = useState<Products[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      if (query?.length != 0) {
        const { data, error } = await supabase.rpc('search_products', {
          product_title: query,
        });

        if (error) {
          toast({
            title: 'Error',
            description: error.message,
          });
          setLoading(false);
          return;
        }

        setLoading(false);

        if (Array.isArray(data) && data.length === 0) {
          setDisplay(true);
        }

        setProducts(data);
      } else {
        setLoading(false);
        setDisplay(false);
        setProducts(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const debouncedHandleSearch = debounce(handleSearch, 500);

  useEffect(() => {
    const subscription = watch(async (value) => {
      if (!value?.search) {
        return;
      }

      debouncedHandleSearch(value.search);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch,debouncedHandleSearch]);

  return { products, loading, display };
};
export default useSearch;
