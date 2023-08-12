'use client';
import React from 'react';
import { Input } from './ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { SearchFormInputs } from '@/interfaces/interfaces';
import useSearch from '@/hooks/useSearch';
import ProductLink from './ProductLink';
import { Loader2, PlusSquare } from 'lucide-react';

type Props = {};

export default function SearchBar({}: Props) {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchFormInputs>();
  const { products, loading, display } = useSearch(watch);
  const renderProductLink = () => {
    if (!products) {
      return null; // Return early if products is not defined
    }

    if (products.length === 0) {
      return (
        <div className="flex flex-col items-center">
          <p className="text-gray-400">Not Found</p>
          <Link href={'/'}>
            <PlusSquare
              className="text-gray-400 hover:text-gray-700"
              size={45}
            />
          </Link>
        </div>
      );
    }

    return products.map((item) => <ProductLink key={item.id} {...item} />);
  };
  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="mb-5">
          <Input
            type="search"
            {...register('search')}
            placeholder="Search..."
            className="sm:w-[480px] md:w-[560px] lg:w-[720px]"
          />
        </div>
        <div className="lg:w-[720px] max-h-48 overflow-auto">
          {loading ? <Loader2 className="animate-spin" /> : ''}

          <ul className="flex flex-col gap-2 absolute z-10 bg-white">
            {renderProductLink()}
          </ul>
        </div>
      </div>
    </div>
  );
}
{
  /*  */
}
