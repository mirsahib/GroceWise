'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { AddToCartIcon } from '@/assets/icons';
import Image from 'next/image';
import {  Products } from '@/interfaces/interfaces';
import { Input } from './ui/input';
import { convertShelfLife } from '@/lib/util/convertShelfLife';

export default function ProductCard(props: Products) {
  const [priceValue, setPriceValue] = useState<number | null>(
    props.price
  );
  const [shelfLifeValue, setShelfLifeValue] = useState(
    convertShelfLife(props.shelf_life)
  );

  const handleAddToCart = () => {
    console.log(props.id);
  };

  const handleUpdatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;

    setPriceValue(value);
  };

  const handleUpdateShelfLife = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShelfLifeValue(e.target.value);
  };

  return (
    <Card className='max-w-[300px]'>
      <CardHeader className='flex flex-col gap-2'>
        <Image
          priority
          width={0}
          height={0}
          sizes='100vw'
          className='w-full h-auto rounded-lg'
          src={props.img_url??''}
          alt='Example image'
        />
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        {/* <CardDescription>{props.}</CardDescription> */}
        <div className='flex items-center'>
          <div className='max-w-max flex gap-0.5 items-center'>
            <span>$</span>
            <Input
              className='w-3/5'
              type='number'
              value={priceValue ?? ''}
              onChange={handleUpdatePrice}
            />
          </div>
          <div className='flex items-center'>
            <Input
              type='text'
              title='Shelf Life'
              value={shelfLifeValue}
              onChange={handleUpdateShelfLife}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className='w-full flex items-center gap-2'
          onClick={handleAddToCart}>
          <AddToCartIcon size='1.25rem' />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
