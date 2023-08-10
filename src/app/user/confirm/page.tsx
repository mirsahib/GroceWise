import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UserConfirm() {
  return (
    <div className='pt-20 flex flex-col gap-5 items-center'>
      <h1 className='text-xl font-bold'>Your email has been confirmed!</h1>

      <Button>
        <Link href='/user/login'>Go to login</Link>
      </Button>
    </div>
  );
}
