"use client"
import React from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SearchFormInputs } from "@/interfaces/interfaces";
import useSearch from "@/hooks/useSearch";

type Props = {};

export default function SearchBar({}: Props) {
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<SearchFormInputs>();
    const {products,loading,suggestion}=useSearch(watch)
    const onSubmit = (data: SearchFormInputs) => console.log(data);

    return (
        <div className="flex flex-col items-center">
            <div>
                <form className="mb-2">
                    <Input
                        type="search"
                        {...register('search')}
                        placeholder="Search..."
                        className="md:w-[100px] lg:w-[720px]"
                    />
                </form>
                <div>
                    <ul className="flex flex-col gap-2">
                        <li><Link className="block p-2 border-2 border-gray-200 hover:border-blue-200 rounded text-gray-600 hover:text-gray-800" href={'/'}>Product</Link></li>
                        <li><Link className="block p-2 border-2 border-gray-200 hover:border-blue-200 rounded text-gray-600 hover:text-gray-800" href={'/'}>Product</Link></li>
                        <li><Link className="block p-2 border-2 border-gray-200 hover:border-blue-200 rounded text-gray-600 hover:text-gray-800" href={'/'}>Product</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
