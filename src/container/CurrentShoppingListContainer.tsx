"use client";
import TableComponent from "@/components/TableComponent";
import {  buttonVariants } from "@/components/ui/button";
import { Products } from "@/interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeFromShoppingListCart } from "@/store/shoppingListCart";
import Link from "next/link";

type Props = {};

export default function CurrentShoppingListContainer({}: Props) {
    const columns = [
        { name: "ID" },
        { name: "IMG" },
        { name: "TITLE" },
        { name: "PRICE" },
        { name: "SHELF LIFE" },
        { name: "ACTION" },
    ];
    const store = useAppSelector((state) => state.cartStore);
    const dispatch = useAppDispatch()
    const handleDelete = (item:Products|null) => {
        // Implement your delete logic here
        if(item){
            console.log(`Deleting item with ID: ${item.id}`);
            dispatch(removeFromShoppingListCart(item))
        }
    };

    return (
        <div className="flex flex-col mt-8">
            {store.totalItem===0?<div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-semibold text-gray-800 mb-5">Your Current Shopping List Is Empty</h1>
                <Link href={"/"} className={buttonVariants({variant:'default'})}>Add product to shopping list</Link>
            </div> :
            <TableComponent columns={columns} store={store.itemList} action={handleDelete}/>
            }      
        </div>
    );
}