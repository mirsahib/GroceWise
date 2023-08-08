import { useEffect, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { SearchFormInputs } from "@/interfaces/interfaces";
import {supabase} from "@/lib/supabase";
import { Database } from "@/db/schema";

type Products = Database['public']['Tables']['products']['Row']
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
    const handleSearch = async (query: string) => {
        try {
            setLoading(true);
            if (query.length != 0) {
                const { data, error } = await supabase
                .rpc('search_products', {
                  product_title:query
                })
                console.log(
                    "🚀 ~ file: App.tsx:22 ~ subscription ~ data:",
                    data
                );
                if (error) throw error;
                setLoading(false);
                if (data && data.length === 0) {
                    setDisplay(true);
                }
                setProducts(data);
            } else {
                setLoading(false);
                setDisplay(false);
                setProducts(null)
            }
        } catch (error) {
            console.error("🚀 ~ file: App.tsx:29 ~ subscription ~ error:", error);
        } finally {
            setLoading(false);
        }
    };
    const debouncedHandleSearch = debounce(handleSearch, 500);

    useEffect(() => {
        const subscription = watch(async (value) => {
            debouncedHandleSearch(value.search);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return { products, loading, display };
};
export default useSearch;
