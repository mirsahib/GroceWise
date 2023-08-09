import { ItemLinkProps } from '@/interfaces/interfaces';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import MobileHeaderMenu from './MobileHeaderMenu';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const links: ItemLinkProps[] = [
  { href: '/frequently_bought', children: 'Frequently Bought' },
  { href: '/recipe', children: 'Recipe' },
  { href: '/recommendation', children: 'Recommendation' },
];

export default async function Header() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <header className='w-full shadow sticky -top-1 z-10 bg-white'>
      <div className='max-w-[1280px] xl:mx-auto px-3 py-6 hidden md:flex justify-between items-center'>
        <Link
          className='font-semibold hover:underline focus:underline'
          href='/'>
          GroseWise
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

        {session ? (
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
