import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton for client components
let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

// For backward compatibility, you can also export a default instance
export const supabase = getSupabaseClient()