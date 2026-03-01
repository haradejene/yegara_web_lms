import { createSupabaseServerClient } from "@/lib/supabaseServer"
import UsersTable from "../../../components/lms/admin/UsersTable"
import UsersHeader from "../../../components/lms/admin/UsersHeader"

export default async function AdminUsersPage() {
  const supabase = await createSupabaseServerClient()
  
  const { data: users, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
  }

  // Get enrollment stats for each user
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("user_id, course_id, completed")

  // Create a map of user stats
  const userStats = new Map()
  
  if (enrollments && enrollments.length > 0) {
    enrollments.forEach(enrollment => {
      const userId = enrollment.user_id
      const currentStats = userStats.get(userId) || { total: 0, completed: 0 }
      
      currentStats.total += 1
      if (enrollment.completed) {
        currentStats.completed += 1
      }
      
      userStats.set(userId, currentStats)
    })
  }

  return (
    <div className="admin-page">
      <UsersHeader />
      <UsersTable users={users || []} userStats={userStats} />
    </div>
  )
}