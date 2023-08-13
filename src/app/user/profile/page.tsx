'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/db/schema';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default function Logout() {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast({
        title: 'Log out successfully!',
      });

      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className='flex justify-center'>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
