import { Products } from '@/interfaces/interfaces'
import {supabase} from '@/lib/supabase'
import { useEffect, useState } from 'react'
const useGetProductData = (category:string)=>{
    const [products,setProducts] = useState<Products[]|null>(null)
    const [loading,setLoading] = useState(false)
    
    useEffect(()=>{
        const getProductData = async()=>{
            try {
                setLoading(true)
                const {data,error} = await supabase.from('products').select('*').eq('category',category)
                if(error) throw error
                if(!data) throw new Error('Product data missing')
                console.log("🚀 ~ file: useGetProductData.ts:10 ~ useGetProductData ~ data:", data)
                setProducts(data)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }finally{
                setLoading(false)
            }
        }
        getProductData()
    },[category])
    return{products,loading}
}

export default useGetProductData;
