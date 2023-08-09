import Protected from '@/views/Protected';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function FrequentlyBought() {
  // const supabase = createServerComponentClient({ cookies });
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (!session) {
  //   return <Protected />;
  // }

  return (
    <>
      <h1>Frequently</h1>
    </>
  );
}
