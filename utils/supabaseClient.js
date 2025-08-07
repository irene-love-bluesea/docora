import { SUPABASE_PROJECT_URL , SUPABASE_ANON_KEY } from '@env';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = SUPABASE_PROJECT_URL;
const supabaseAnonKey = SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseAnonKey);