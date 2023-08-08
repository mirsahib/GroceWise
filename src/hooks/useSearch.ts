import { useEffect, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { SearchFormInputs } from "@/interfaces/interfaces";
import {supabase} from "@/lib/supabase";

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
    const [products, setProducts] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState("");
    const handleSearch = async (query: string) => {
        try {
            setLoading(true);
            if (query.length != 0) {
                const { data, error } = await supabase
                    .from("products")
                    .select()
                    .textSearch("title", query);
                console.log(
                    "🚀 ~ file: App.tsx:22 ~ subscription ~ data:",
                    data
                );
                if (error) throw error;
                setLoading(false);
                if (data && data.length === 0) {
                    setSuggestion("Not found");
                }
                setProducts(data);
            } else {
                setLoading(false);
                setSuggestion("");
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

    return { products, loading, suggestion };
};
export default useSearch;
