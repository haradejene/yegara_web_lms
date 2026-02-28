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

interface Props {
  params: {
    id: string
  }
}

export default async function StudentProfile({ params }: Props) {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch profile
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .single()

  if (profileError || !profileData) {
    console.error("Profile fetch error:", profileError)
    redirect("/login")
  }

  const profile = profileData as Profile
  const isOwnProfile = user.id === params.id

  // Fetch user's enrollments with course details
  const { data: enrollmentsData } = await supabase
    .from("enrollments")
    .select("*, course:courses(*)")
    .eq("user_id", params.id)

  const enrollments = (enrollmentsData as (Enrollment & { course: Course })[]) || []

  // Fetch all courses (for recommended section)
  const { data: allCoursesData } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })

  const allCourses = (allCoursesData as Course[]) || []

  // Calculate stats
  const enrolledCourses = enrollments.map(e => e.course)
  const completedCourses = enrollments.filter(e => e.completed)
  const inProgressCourses = enrollments.filter(e => !e.completed && e.progress > 0)
  
  const totalProgress = enrollments.length 
    ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length)
    : 0

  const stats = {
    enrolledCourses: enrolledCourses.length,
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
            isOwnProfile={isOwnProfile}
          />

          <StudentStats stats={stats} />

          <StudentInfoCard 
            student={{
              bio: profile.bio || (isOwnProfile 
                ? "Welcome to your learning dashboard! Update your bio in profile settings."
                : `${profile.full_name || 'This student'} is an active learner on our platform.`)
            }}
            joinDate={joinDate}
            location={profile.location || "Not specified"}
          />

          {/* Show enrolled courses first */}
          {enrolledCourses.length > 0 && (
            <StudentCourses 
              courses={enrolledCourses} 
              title="My Courses"
              showProgress={true}
              enrollments={enrollments}
            />
          )}

          {/* Show recommended courses (non-enrolled) */}
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
                          View Course
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