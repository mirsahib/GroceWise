import { Database } from '@/supabase/db.types';

export type UserProfile = Database['public']['Tables']['user_profile']['Row'];
