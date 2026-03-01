import { createSupabaseServerClient } from "@/lib/supabaseServer"

export default async function TestPage() {
  const supabase = await createSupabaseServerClient()
  
  const tests = []
  
  // Test 1: Check if we can connect
  const { data: connectionTest, error: connectionError } = await supabase
    .from("profiles")
    .select("count")
    .limit(1)
  
  tests.push({
    name: "Database Connection",
    success: !connectionError,
    error: connectionError?.message,
    data: connectionTest
  })

  // Test 2: Check auth
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  tests.push({
    name: "Auth",
    success: !authError && !!user,
    error: authError?.message,
    user: user?.email
  })

  // Test 3: Check profiles table structure
  const { data: profileColumns, error: columnsError } = await supabase
    .rpc('get_table_columns', { table_name: 'profiles' })

  tests.push({
    name: "Profiles Table Columns",
    success: !columnsError,
    error: columnsError?.message,
    columns: profileColumns
  })

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Supabase Connection Test</h1>
      <pre>{JSON.stringify(tests, null, 2)}</pre>
    </div>
  )
}