import { Products } from '@/interfaces/interfaces'
import {supabase} from '@/lib/supabase'
import { useEffect, useState } from 'react'
const useGetProductData = ()=>{
    const [products,setProducts] = useState<Products[]|null>(null)
    const [loading,setLoading] = useState(false)
    const getProductData = async()=>{
        try {
            setLoading(true)
            const {data,error} = await supabase.from('products').select('*')
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
    useEffect(()=>{
        getProductData()
    },[])
    return{products,loading}
}

export default useGetProductData