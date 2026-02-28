import { supabase } from "../../lib/supabaseClient"
import { redirect } from "next/navigation"
import Link from "next/link"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Course, Profile } from "@/types/types"

export default async function AdminPage() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (!profile || profile.role !== "admin") {
    redirect("/")
  }

  // Fetch stats
  const { count: totalCourses } = await supabase
    .from("courses")
    .select("*", { count: 'exact', head: true })

  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: 'exact', head: true })

  const { count: videoCourses } = await supabase
    .from("courses")
    .select("*", { count: 'exact', head: true })
    .eq("content_type", "video")

  const { count: pdfCourses } = await supabase
    .from("courses")
    .select("*", { count: 'exact', head: true })
    .eq("content_type", "pdf")

  // Fetch recent courses
  const { data: recentCourses } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <>
      <Navbar />
      <main className="admin-page">
        <div className="container">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">
              Manage your LMS platform
            </p>
          </div>

          {/* Stats Grid */}
          <div className="admin-stats-grid">
            <div className="stat-card admin-stat">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <h3 className="stat-value">{totalCourses || 0}</h3>
                <p className="stat-label">Total Courses</p>
              </div>
            </div>
            
            <div className="stat-card admin-stat">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3 className="stat-value">{totalUsers || 0}</h3>
                <p className="stat-label">Total Users</p>
              </div>
            </div>
            
            <div className="stat-card admin-stat">
              <div className="stat-icon">🎥</div>
              <div className="stat-content">
                <h3 className="stat-value">{videoCourses || 0}</h3>
                <p className="stat-label">Video Courses</p>
              </div>
            </div>
            
            <div className="stat-card admin-stat">
              <div className="stat-icon">📄</div>
              <div className="stat-content">
                <h3 className="stat-value">{pdfCourses || 0}</h3>
                <p className="stat-label">PDF Documents</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="admin-actions-grid">
            <Link href="/admin/courses/new" className="admin-action-card">
              <span className="action-icon">➕</span>
              <h3>Add New Course</h3>
              <p>Create a new video or PDF course</p>
            </Link>

            <Link href="/admin/courses" className="admin-action-card">
              <span className="action-icon">📚</span>
              <h3>Manage Courses</h3>
              <p>Edit or delete existing courses</p>
            </Link>

            <Link href="/admin/users" className="admin-action-card">
              <span className="action-icon">👥</span>
              <h3>Manage Users</h3>
              <p>View and manage user accounts</p>
            </Link>

            <Link href="/admin/settings" className="admin-action-card">
              <span className="action-icon">⚙️</span>
              <h3>Settings</h3>
              <p>Configure platform settings</p>
            </Link>
          </div>

          {/* Recent Courses */}
          {recentCourses && recentCourses.length > 0 && (
            <div className="recent-courses-section">
              <h2 className="section-title">Recent Courses</h2>
              <div className="recent-courses-list">
                {recentCourses.map((course: Course) => (
                  <div key={course.id} className="recent-course-item">
                    <div className="recent-course-info">
                      <h4>{course.title}</h4>
                      <p>{course.description?.substring(0, 100)}...</p>
                      <span className="course-type-small">
                        {course.content_type === 'video' ? '🎥 Video' : '📄 PDF'}
                      </span>
                    </div>
                    <div className="recent-course-actions">
                      <Link href={`/admin/courses/${course.id}/edit`} className="btn-icon btn-edit">✏️</Link>
                      <Link href={`/courses/${course.id}`} className="btn-icon btn-view">👁️</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}