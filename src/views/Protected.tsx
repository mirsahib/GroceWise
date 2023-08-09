import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Protected() {
  return (
    <div className='py-20 max-w-[200px] mx-auto flex flex-col items-center gap-4'>
      <h1>Please login or signup</h1>
      <Button className='w-full p-0'>
        <Link
          className='w-full h-full flex justify-center items-center'
          href='/user/login'>
          Login
        </Link>
      </Button>
      <Button variant='secondary' className='w-full p-0'>
        <Link
          className='w-full h-full flex justify-center items-center'
          href='/user/signup'>
          Sign up
        </Link>
      </Button>
    </div>
  );
}
