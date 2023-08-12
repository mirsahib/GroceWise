import { Products } from '@/interfaces/interfaces'
import {supabase} from '@/lib/supabase'
import { useEffect, useState } from 'react'
const useGetProductData = (category:string)=>{
    const [products,setProducts] = useState<Products[]|null>(null)
    const [loading,setLoading] = useState(false)
    const getProductData = async()=>{
        try {
            setLoading(true)
            const {data,error} = await supabase.from('products').select('*').eq('category',category)
            if(error) throw error
            if(!data) throw new Error('Product data missing')
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
    },[category])
    return{products,loading}
}

export default useGetProductData
