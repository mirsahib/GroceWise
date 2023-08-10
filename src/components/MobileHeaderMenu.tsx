'use client';

import { useState, useEffect } from 'react';
import { HamburgerIcon } from '@/assets/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ItemLinkProps } from '@/interfaces/interfaces';
import { useRouter } from 'next/navigation';
import { ClientOnly } from './ClientOnly';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/db/schema';
import { Skeleton } from '@/components/ui/skeleton';

const links: ItemLinkProps[] = [
  { href: '/frequently_bought', children: 'Frequently Bought' },
  { href: '/recipe', children: 'Recipe' },
  { href: '/recommendation', children: 'Recommendation' },
];

export default function MobileHeaderMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [finishLoading, setFinishLoading] = useState(false);

  const router = useRouter();
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
    <ClientOnly>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <HamburgerIcon size='24px' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {links.map((link) => (
              <DropdownMenuItem
                key={link.href}
                onClick={() => router.push(link.href)}>
                {link.children}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {!finishLoading ? (
            <Skeleton className='w-[50px] h-[24px]' />
          ) : isLoggedIn ? (
            <DropdownMenuItem onClick={() => router.push('/user/profile')}>
              Profile
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => router.push('/user/login')}>
              Login
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </ClientOnly>
  );
}
