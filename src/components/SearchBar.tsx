'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Products, SearchFormInputs } from '@/interfaces/interfaces';
import useSearch from '@/hooks/useSearch';
import ProductLink from './ProductLink';
import { Loader2, PlusSquare } from 'lucide-react';
import { useAppDispatch } from '@/store';
import { addToShoppingListCart } from '@/store/shoppingListCart';

type Props = {};

export default function SearchBar({}: Props) {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SearchFormInputs>();
  const { products, loading } = useSearch(watch);
  const [selectProduct,setSelectedProduct] = useState<Products|null>(null);
  const dispatch = useAppDispatch();
  const handleBlur = ()=>{
    console.log("🚀 ~ file: SearchBar.tsx:36 ~ handleBlur ~ handleBlur:", selectProduct)
    if(selectProduct){
      dispatch(addToShoppingListCart(selectProduct))
    }
    reset();
  }

  const renderProductLink = () => {
    if (!loading && Array.isArray(products) && products?.length === 0) {
      return (
        <div className="flex flex-col items-center mx-auto">
          <p className="text-gray-400">Nothing found</p>
          <Link
            className="flex gap-2 text-gray-400 hover:text-gray-700"
            href={'/'}
          >
            <PlusSquare size={24} />
          </Link>
        </div>
      );
    }

    return products?.map((item) => <ProductLink key={item.id} product={item} action={setSelectedProduct} />);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Input
        type="search"
        autoComplete="off"
        {...register('search')}
        placeholder="Search GroceWise"
        className="sm:w-[480px] md:w-[560px] lg:w-[560px] mx-auto"
        onBlur={() => handleBlur()}
      />

      {watch('search') ? (
        <div className="sm:w-[480px] md:w-[560px] lg:w-[560px] mx-auto max-h-48 overflow-auto">
          <ul className="flex flex-col absolute z-10 bg-white sm:w-[480px] md:w-[560px] lg:w-[560px] mx-auto shadow-md rounded border border-slate-50">
            {loading || !products ? (
              <Loader2 className="animate-spin flex flex-col mx-auto" />
            ) : (
              renderProductLink()
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
