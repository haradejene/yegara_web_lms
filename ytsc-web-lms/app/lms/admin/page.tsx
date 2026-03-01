import { createSupabaseServerClient } from "@/lib/supabaseServer"
import Link from "next/link"
import { Course, Profile } from "@/types/types"

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient()

  // Fetch comprehensive stats
  const [
    { count: totalCourses },
    { count: totalUsers },
    { count: videoCourses },
    { count: pdfCourses },
    { count: totalEnrollments },
    { count: completedEnrollments },
    { data: recentCourses },
    { data: recentUsers },
    { data: popularCourses }
  ] = await Promise.all([
    supabase.from("courses").select("*", { count: 'exact', head: true }),
    supabase.from("profiles").select("*", { count: 'exact', head: true }),
    supabase.from("courses").select("*", { count: 'exact', head: true }).eq("content_type", "video"),
    supabase.from("courses").select("*", { count: 'exact', head: true }).eq("content_type", "pdf"),
    supabase.from("enrollments").select("*", { count: 'exact', head: true }),
    supabase.from("enrollments").select("*", { count: 'exact', head: true }).eq("completed", true),
    supabase.from("courses").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("enrollments")
      .select("course:courses(*), count")
      .order("count", { ascending: false })
      .limit(5)
  ])

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">Dashboard</h1>
        <p className="admin-subtitle">Welcome back to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon blue">📚</div>
          <div className="stat-details">
            <span className="stat-value">{totalCourses || 0}</span>
            <span className="stat-label">Total Courses</span>
          </div>
          <Link href="/lms/admin/courses" className="stat-link">View All →</Link>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon green">👥</div>
          <div className="stat-details">
            <span className="stat-value">{totalUsers || 0}</span>
            <span className="stat-label">Total Users</span>
          </div>
          <Link href="/lms/admin/users" className="stat-link">View All →</Link>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon orange">📊</div>
          <div className="stat-details">
            <span className="stat-value">{totalEnrollments || 0}</span>
            <span className="stat-label">Enrollments</span>
          </div>
          <div className="stat-sublabel">{completedEnrollments || 0} completed</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon purple">🎥</div>
          <div className="stat-details">
            <span className="stat-value">{videoCourses || 0}</span>
            <span className="stat-label">Video Courses</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon indigo">📄</div>
          <div className="stat-details">
            <span className="stat-value">{pdfCourses || 0}</span>
            <span className="stat-label">PDF Courses</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon pink">⏱️</div>
          <div className="stat-details">
            <span className="stat-value">
              {totalEnrollments && totalUsers 
                ? Math.round((totalEnrollments / totalUsers) * 10) / 10 
                : 0}
            </span>
            <span className="stat-label">Avg Courses/User</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-quick-actions">
        <h2 className="admin-section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link href="/lms/admin/courses/new" className="quick-action-card">
            <span className="action-icon">➕</span>
            <h3>Add New Course</h3>
            <p>Create a new video or PDF course</p>
          </Link>

         
          <Link href="/lms/admin/analytics/export" className="quick-action-card">
            <span className="action-icon">📥</span>
            <h3>Export Data</h3>
            <p>Download reports and analytics</p>
          </Link>

          <Link href="/lms/admin/settings" className="quick-action-card">
            <span className="action-icon">⚙️</span>
            <h3>System Settings</h3>
            <p>Configure platform settings</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-recent-section">
        <div className="recent-column">
          <h2 className="admin-section-title">Recent Courses</h2>
          <div className="recent-list">
            {recentCourses && recentCourses.length > 0 ? (
              recentCourses.map((course: Course) => (
                <div key={course.id} className="recent-item">
                  <div className="recent-item-info">
                    <h4>{course.title}</h4>
                    <p>{course.description?.substring(0, 60)}...</p>
                    <span className="recent-badge">
                      {course.content_type === 'video' ? '🎥' : '📄'}
                    </span>
                  </div>
                  <div className="recent-item-actions">
                    <Link href={`/lms/admin/courses/${course.id}/edit`} className="action-btn edit">✏️</Link>
                    <Link href={`/lms/courses/${course.id}`} className="action-btn view">👁️</Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No courses yet</p>
            )}
          </div>
          <Link href="/lms/admin/courses" className="view-all-link">View All Courses →</Link>
        </div>

        <div className="recent-column">
          <h2 className="admin-section-title">Recent Users</h2>
          <div className="recent-list">
            {recentUsers && recentUsers.length > 0 ? (
              recentUsers.map((user: Profile) => (
                <div key={user.id} className="recent-item">
                  <div className="recent-item-info">
                    <h4>{user.email}</h4>
                    <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="recent-item-actions">
                    <Link href={`/lms/admin/users/${user.id}`} className="action-btn view">👁️</Link>
                    <Link href={`/lms/admin/users/${user.id}/edit`} className="action-btn edit">✏️</Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No users yet</p>
            )}
          </div>
          <Link href="/lms/admin/users" className="view-all-link">View All Users →</Link>
        </div>
      </div>
    </div>
  )
}