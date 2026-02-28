import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabaseServer"
import { Course, Profile, Enrollment } from "@/types/types"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import StudentHeader from "../../components/student/StudentHeader"
import StudentInfoCard from "../../components/student/StudentInfoCard"
import StudentStats from "../../components/student/StudentStats"
import StudentCourses from "../../components/student/StudentCourses"

export default async function MyProfile() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profileError || !profileData) {
    console.error("Profile fetch error:", profileError)
    redirect("/login")
  }

  const profile = profileData as Profile

  // Fetch user's enrollments with course details
  const { data: enrollmentsData } = await supabase
    .from("enrollments")
    .select("*, course:courses(*)")
    .eq("user_id", user.id)

  const enrollments = (enrollmentsData as (Enrollment & { course: Course })[]) || []
  const enrolledCourses = enrollments.map(e => e.course)

  // Fetch all courses for recommendations
  const { data: allCoursesData } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })

  const allCourses = (allCoursesData as Course[]) || []

  // Calculate stats
  const completedCourses = enrollments.filter(e => e.completed)
  const inProgressCourses = enrollments.filter(e => !e.completed && e.progress > 0)
  
  const totalProgress = enrollments.length 
    ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length)
    : 0

  const stats = {
    enrolledCourses: enrollments.length,
    completedCourses: completedCourses.length,
    inProgressCourses: inProgressCourses.length,
    totalProgress
  }

  const joinDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <>
      <Navbar />
      <main className="student-profile-page">
        <div className="container">
          <StudentHeader
            student={{
              name: profile.full_name || profile.email?.split('@')[0] || 'User',
              email: profile.email || '',
              role: profile.role,
              avatar_url: profile.avatar_url || undefined
            }}
            isOwnProfile={true}
          />

          <StudentStats stats={stats} />

          <StudentInfoCard 
            student={{
              bio: profile.bio || "Welcome to your personal learning dashboard! Track your progress, manage your courses, and continue your learning journey."
            }}
            joinDate={joinDate}
            location={profile.location || "Online"}
          />

          {/* Enrolled Courses */}
          {enrolledCourses.length > 0 ? (
            <StudentCourses 
              courses={enrolledCourses} 
              title="Continue Learning"
              showProgress={true}
              enrollments={enrollments}
            />
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3>No enrolled courses yet</h3>
              <p>Start your learning journey by enrolling in a course</p>
              <Link href="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          )}

          {/* Quick Actions */}
          <div className="profile-quick-actions">
            <h2 className="section-title">Quick Actions</h2>
            <div className="quick-actions-grid">
              <Link href="/courses" className="quick-action-card">
                <span className="quick-action-icon">📚</span>
                <h3>Browse All Courses</h3>
                <p>Discover new learning opportunities</p>
              </Link>
              <Link href="/dashboard" className="quick-action-card">
                <span className="quick-action-icon">📊</span>
                <h3>Learning Dashboard</h3>
                <p>View detailed analytics</p>
              </Link>
              <Link href="/students/me/edit" className="quick-action-card">
                <span className="quick-action-icon">✏️</span>
                <h3>Edit Profile</h3>
                <p>Update your information</p>
              </Link>
            </div>
          </div>

          {/* Recommended Courses */}
          {allCourses.length > enrolledCourses.length && (
            <div className="recommended-section">
              <h2 className="section-title">Recommended for You</h2>
              <div className="courses-grid">
                {allCourses
                  .filter(c => !enrolledCourses.some(ec => ec.id === c.id))
                  .slice(0, 3)
                  .map(course => (
                    <div key={course.id} className="course-card">
                      <div className="course-image">
                        <img 
                          src={course.thumbnail_url || "https://via.placeholder.com/400x250"} 
                          alt={course.title}
                        />
                        <span className="course-type">
                          {course.content_type === 'video' ? '🎥' : '📄'}
                        </span>
                      </div>
                      <div className="course-content">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <Link href={`/courses/${course.id}`} className="btn btn-primary btn-small">
                          Learn More
                        </Link>
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