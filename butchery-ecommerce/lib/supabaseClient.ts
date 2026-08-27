import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// During local/dev builds without env vars set, this still constructs a
// client so pages don't crash at import time — calls will simply fail
// until real Supabase credentials are added to .env.local / Vercel.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey
);
