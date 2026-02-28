import { createSupabaseServerClient } from "@/lib/supabaseServer"
import { redirect } from "next/navigation"
import { Course, Profile, Enrollment } from "@/types/types"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import StudentHeader from "../../components/student/StudentHeader"
import StudentInfoCard from "../../components/student/StudentInfoCard"
import StudentStats from "../../components/student/StudentStats"
import StudentCourses from "../../components/student/StudentCourses"

interface Props {
  params: Promise<{ id: string }> // Note: params is a Promise
}

export default async function StudentProfile({ params }: Props) {
  // ✅ IMPORTANT: Await the params
  const { id } = await params
  
  console.log("=== DEBUG: StudentProfile Page ===")
  console.log("1. Profile ID from params:", id)
  
  const supabase = await createSupabaseServerClient()
  
  // Get the current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    console.error("Auth error:", userError)
    redirect("/login")
  }

  // Try to fetch the profile
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id) // Now id is properly defined
    .maybeSingle()

  if (profileError) {
    console.error("Profile error details:", profileError)
  }

  // If no profile exists and this is the current user, create one
  if (!profileData && user.id === id) {
    console.log("Creating profile for current user")
    
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          email: user.email,
          role: 'member',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (insertError) {
      console.error("Error creating profile:", insertError)
      redirect("/")
    }

    // Use the newly created profile
    const profile = newProfile as Profile

    // Fetch courses
    const { data: coursesData } = await supabase
      .from("courses")
      .select("*")

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

            <StudentStats stats={{ enrolledCourses: 0, completedCourses: 0 }} />

            <StudentInfoCard 
              student={{
                bio: "Welcome to your learning dashboard! Update your bio in profile settings."
              }}
              joinDate={new Date(profile.created_at).toLocaleDateString()}
              location="Not specified"
            />

            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3>No enrolled courses yet</h3>
              <p>Start your learning journey by enrolling in a course</p>
              <Link href="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!profileData) {
    console.log("No profile found and not current user, redirecting")
    redirect("/")
  }

  const profile = profileData as Profile
  const isOwnProfile = user.id === id

  // Fetch enrollments and courses...
  const { data: enrollmentsData } = await supabase
    .from("enrollments")
    .select("*, course:courses(*)")
    .eq("user_id", id)

  const enrollments = (enrollmentsData as (Enrollment & { course: Course })[]) || []

  const { data: allCoursesData } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })

  const allCourses = (allCoursesData as Course[]) || []

  const enrolledCourses = enrollments.map(e => e.course)
  const completedCourses = enrollments.filter(e => e.completed)
  
  const stats = {
    enrolledCourses: enrollments.length,
    completedCourses: completedCourses.length
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

          {enrolledCourses.length > 0 ? (
            <StudentCourses 
              courses={enrolledCourses} 
              title={isOwnProfile ? "My Courses" : "Enrolled Courses"}
              showProgress={isOwnProfile}
              enrollments={isOwnProfile ? enrollments : null}
            />
          ) : isOwnProfile ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3>No enrolled courses yet</h3>
              <p>Start your learning journey by enrolling in a course</p>
              <Link href="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="empty-state">
              <p>No enrolled courses yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}