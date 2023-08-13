"use client";
import { Products } from "@/interfaces/interfaces";
import { convertShelfLifeToText } from "@/lib/util/convertShelfLife";
import Image from "next/image";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
    columns: { name: string }[];
    store: { product: Products | null }[];
    action: (item: Products | null) => void;
};
function formatDateToYYYYMMDD(date: Date): string {
    const yyyy: number = date.getFullYear();
    const mm: string = String(date.getMonth() + 1).padStart(2, '0');
    const dd: string = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}


export default function TableComponent({ columns, store, action }: Props) {
    const [shoppingDate, setshoppingDate] = useState(formatDateToYYYYMMDD(new Date()));
    const handleUpdateShoppingDate = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setshoppingDate(e.target.value);
    };
    return (
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-5">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map((col, index) => (
                                    <th
                                        key={index}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {col.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {store.map(({ product }) => (
                                <tr key={product?.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product?.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Image
                                            priority
                                            width={25}
                                            height={25}
                                            style={{ objectFit: "cover" }}
                                            className="w-full h-auto rounded-lg"
                                            src={product?.img_url ?? ""}
                                            alt="Example image"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product?.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product?.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {convertShelfLifeToText(
                                            product?.shelf_life ?? 0
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap ">
                                        <button
                                            onClick={() => action(product)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col ml-auto">
                    <div className="flex items-center ml-auto mb-5">
                        <p className="mr-5">Shopping Date </p>
                        <div className="flex items-center">
                            <Input
                                type="date"
                                value={shoppingDate}
                                defaultValue={shoppingDate}
                                onChange={handleUpdateShoppingDate}
                            />
                        </div>
                    </div>
                    <Button className="flex ml-auto">Submit</Button>
                </div>
            </div>
        </div>
    );
}
