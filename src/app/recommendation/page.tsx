import Protected from '@/views/Protected';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/db/schema';
import useGetRecommendation from '@/hooks/useGetRecommendation';

export default async function Recommendation() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // console.log("🚀 ~ file: page.tsx:10 ~ Recommendation ~ session:", session)
  useGetRecommendation(supabase)
  
  if (!session) {
    return <Protected />;
  }

  return (
    <>
      <h1>Recommendation</h1>
    </>
  );
}
