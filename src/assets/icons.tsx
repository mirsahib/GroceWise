import { IconProps } from '@/interfaces/interfaces';

export const HamburgerIcon = ({ size }: IconProps) => (
  <svg fill='none' viewBox='0 0 15 15' width={size} height={size}>
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M1.5 3a.5.5 0 000 1h12a.5.5 0 000-1h-12zM1 7.5a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5z'
      clipRule='evenodd'
    />
  </svg>
);

export const AddToCartIcon = ({ size }: IconProps) => (
  <svg fill='currentColor' viewBox='0 0 16 16' width={size} height={size}>
    <path d='M9 5.5a.5.5 0 00-1 0V7H6.5a.5.5 0 000 1H8v1.5a.5.5 0 001 0V8h1.5a.5.5 0 000-1H9V5.5z' />
    <path d='M.5 1a.5.5 0 000 1h1.11l.401 1.607 1.498 7.985A.5.5 0 004 12h1a2 2 0 100 4 2 2 0 000-4h7a2 2 0 100 4 2 2 0 000-4h1a.5.5 0 00.491-.408l1.5-8A.5.5 0 0014.5 3H2.89l-.405-1.621A.5.5 0 002 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z' />
  </svg>
);
