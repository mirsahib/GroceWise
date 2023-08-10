import Protected from '@/views/Protected';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/db/schema';
import RecContainer from '@/components/RecContainer';

export default async function Recommendation() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  if (!session) {
    return <Protected />;
  }

  return (
    <>
      <h1>Recommendation</h1>
      <RecContainer/>
    </>
  );
}
