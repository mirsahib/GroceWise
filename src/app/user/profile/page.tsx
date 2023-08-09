'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/supabase/db.types';

export default function Logout() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      toast({
        title: 'Log out successfully!',
      });

      router.refresh();
      router.push('/');
    }
  };

  return (
    <>
      <h1>Logout</h1>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
