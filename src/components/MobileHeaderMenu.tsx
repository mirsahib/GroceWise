'use client';

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

const links: ItemLinkProps[] = [
  { href: '/frequently_bought', children: 'Frequently Bought' },
  { href: '/recipe', children: 'Recipe' },
  { href: '/recommendation', children: 'Recommendation' },
];

export default function MobileHeaderMenu() {
  const router = useRouter();

  return (
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
              className='cursor-pointer hover:underline focus:underline'
              key={link.href}
              onClick={() => router.push(link.href)}>
              {link.children}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer hover:underline focus:underline'
          onClick={() => router.push('/user/login')}>
          Login
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}