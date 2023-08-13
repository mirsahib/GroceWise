'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from './ui/button';
import { AddToCartIcon } from '@/assets/icons';
import Image from 'next/image';
import { Products } from '@/interfaces/interfaces';
import { Input } from './ui/input';
import { convertShelfLifeToDays, convertShelfLifeToText } from '@/lib/util/convertShelfLife';
import { useAppDispatch } from '@/store';
import { addToShoppingListCart } from '@/store/shoppingListCart';

export default function ProductCard(props: Products) {
  const dispatch = useAppDispatch()

  const [priceValue, setPriceValue] = useState<number | null>(
    props.price
  );
  const [shelfLifeValue, setShelfLifeValue] = useState(
    convertShelfLifeToText(props.shelf_life)
  );

  const handleAddToCart = () => {
    console.log(props.id);
    // validation of shelf life incomplete
    const updatedProduct:Products = {
      ...props,
      price: priceValue,
      shelf_life: convertShelfLifeToDays(shelfLifeValue)
    }
    if(props){
      dispatch(addToShoppingListCart(updatedProduct))
    }
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
    <TooltipProvider>
      <Card className='max-w-[300px] h-full flex flex-col justify-between'>
        <CardHeader className='flex flex-col gap-2'>
          <Image
            priority
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-auto rounded-lg'
            src={props.img_url ?? ''}
            alt='Example image'
          />
          <Tooltip>
            <TooltipTrigger className='text-left'>
              <CardTitle className='line-clamp-1'>{props.title}</CardTitle>
            </TooltipTrigger>
            <TooltipContent>{props.title}</TooltipContent>
          </Tooltip>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
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
    </TooltipProvider>
  );
}
