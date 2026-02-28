import { createSupabaseServerClient } from "@/lib/supabaseServer"
import AnalyticsDashboard from "../../components/admin/AnalyticsDashboad"

export default async function AdminAnalyticsPage() {
  const supabase = await createSupabaseServerClient()

  // Fetch comprehensive analytics data
  const [
    { data: courses },
    { data: users },
    { data: enrollments },
    { data: recentActivity }
  ] = await Promise.all([
    supabase.from("courses").select("*"),
    supabase.from("profiles").select("*"),
    supabase.from("enrollments").select("*, course:courses(*), user:profiles(*)"),
    supabase.from("enrollments")
      .select("*, course:courses(title), user:profiles(email)")
      .order("last_accessed", { ascending: false })
      .limit(10)
  ])

  // Calculate metrics
  const totalUsers = users?.length || 0
  const totalCourses = courses?.length || 0
  const totalEnrollments = enrollments?.length || 0
  const completedEnrollments = enrollments?.filter(e => e.completed).length || 0
  
  // Course type distribution
  const videoCourses = courses?.filter(c => c.content_type === 'video').length || 0
  const pdfCourses = courses?.filter(c => c.content_type === 'pdf').length || 0

  // User role distribution
  const admins = users?.filter(u => u.role === 'admin').length || 0
  const members = users?.filter(u => u.role === 'member').length || 0

  // Enrollment trends (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  const recentEnrollments = enrollments?.filter(e => 
    new Date(e.enrolled_at) >= thirtyDaysAgo
  ).length || 0

  // Popular courses
  const coursePopularity = new Map()
  enrollments?.forEach(e => {
    if (!coursePopularity.has(e.course_id)) {
      coursePopularity.set(e.course_id, { 
        title: e.course?.title || 'Unknown',
        count: 0,
        completed: 0
      })
    }
    const stats = coursePopularity.get(e.course_id)
    stats.count++
    if (e.completed) stats.completed++
  })

  const popularCourses = Array.from(coursePopularity.entries())
    .map(([id, stats]) => ({ id, ...stats }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">Analytics Dashboard</h1>
        <p className="admin-subtitle">Comprehensive platform insights and metrics</p>
      </div>

      <AnalyticsDashboard 
        metrics={{
          totalUsers,
          totalCourses,
          totalEnrollments,
          completedEnrollments,
          videoCourses,
          pdfCourses,
          admins,
          members,
          recentEnrollments,
          popularCourses,
          recentActivity: recentActivity || []
        }}
      />
    </div>
  )
}