import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

const useGetRecommendation =async (client:SupabaseClient)=>{
    const [loading ,setLoading] = useState(false)
    const {data:{user:user}} = await client.auth.getUser()
    console.log("🚀 ~ file: useGetRecommendation.ts:5 ~ useGetRecommendation ~ user:", user)
}

export default useGetRecommendation