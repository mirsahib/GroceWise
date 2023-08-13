"use client"

import ShoppingList from "@/components/ShoppingList"
import useGetShoppingList from "@/hooks/useGetShoppingList"
import { Loader2 } from "lucide-react"

type Props = {}

export default function ShoppingListContainer({}: Props) {
    const {shoppingList,loading} = useGetShoppingList()
  return (
    <div>
        <h1 className="text-xl font-bold mb-5 ">Shopping history</h1>
        <div className="flex flex-col ">
                {loading ? (
                    <div className="w-full flex justify-center text-slate-800">
                        <Loader2 className=" animate-spin" size={60} />
                    </div>
                ) : (
                    ""
                )}
                
                {/* <div className="flex flex-wrap gap-4">
                    {product &&
                        product.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                </div> */}
                {shoppingList && shoppingList.map(item=>(
                    <ShoppingList key={item.shopping_list_id} shoppingList={item} />
                ))}
            </div>
    </div>
  )
}