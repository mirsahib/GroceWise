'use client';

import { useState, useEffect } from 'react';
import { ItemLinkProps } from '@/interfaces/interfaces';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import MobileHeaderMenu from './MobileHeaderMenu';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/db/schema';
import { Skeleton } from '@/components/ui/skeleton';

const links: ItemLinkProps[] = [
  { href: '/frequently_bought', children: 'Frequently Bought' },
  { href: '/recipe', children: 'Recipe' },
  { href: '/recommendation', children: 'Recommendation' },
];

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [finishLoading, setFinishLoading] = useState(false);

  const supabase = createClientComponentClient<Database>();

  const checkLoggedIn = async () => {
    setFinishLoading(false);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setFinishLoading(true);
  };

  useEffect(() => {
    checkLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase.auth.getSession()]);

  return (
    <header className='w-full shadow sticky -top-1 z-10 bg-white'>
      <div className='max-w-[1280px] xl:mx-auto px-3 py-6 hidden md:flex justify-between items-center'>
        <Link
          className='font-semibold hover:underline focus:underline'
          href='/'>
          GroceWise
        </Link>

        <nav>
          <ul className='flex gap-3'>
            {links.map((link, index) => (
              <ItemLink
                key={link.href}
                {...link}
                separator={index < links.length - 1}
              />
            ))}
          </ul>
        </nav>

        {!finishLoading ? (
          <Skeleton className='w-[50px] h-[24px]' />
        ) : isLoggedIn ? (
          <Link
            className='hover:underline focus:underline'
            href='/user/profile'>
            Profile
          </Link>
        ) : (
          <Link className='hover:underline focus:underline' href='/user/login'>
            Login
          </Link>
        )}
      </div>

      <div className='px-3 py-6 flex md:hidden justify-between'>
        <Link
          className='font-semibold hover:underline focus:underline'
          href='/'>
          GroseWise
        </Link>

        <MobileHeaderMenu />
      </div>
    </header>
  );
}

function ItemLink(props: ItemLinkProps) {
  return (
    <li className='flex gap-3'>
      <Link className='hover:underline focus:underline' href={props.href}>
        {props.children}
      </Link>
      {props.separator && <Separator orientation='vertical' />}
    </li>
  );
}
