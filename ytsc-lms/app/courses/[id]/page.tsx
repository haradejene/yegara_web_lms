import { createSupabaseServerClient } from "@/lib/supabaseServer"
import { notFound } from "next/navigation"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import CourseContent from "../../components/courses/CourseContaint"
import { Course, CourseModule, Lesson, Enrollment, LessonProgress } from "@/types/types"

interface Props {
  params: Promise<{ id: string }>
}

export default async function CourseDetail({ params }: Props) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch course details
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !course) {
    notFound()
  }

  // Fetch course modules with lessons
  const { data: modulesData } = await supabase
    .from("course_modules")
    .select(`
      *,
      lessons:lessons(*)
    `)
    .eq("course_id", id)
    .order("position", { ascending: true })

  const modules = modulesData as (CourseModule & { lessons: Lesson[] })[] || []

  // Check if user is enrolled
  let enrollment: Enrollment | null = null
  const lessonProgressMap = new Map<string, LessonProgress>()

  if (user) {
    const { data: enrollmentData } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", user.id)
      .eq("course_id", id)
      .single()

    enrollment = enrollmentData as Enrollment | null

    // If enrolled, fetch lesson progress
    if (enrollment) {
      const lessonIds = modules?.flatMap(m => m.lessons?.map((l: Lesson) => l.id) || []) || []
      
      if (lessonIds.length > 0) {
        const { data: progressData } = await supabase
          .from("lesson_progress")
          .select("*")
          .eq("user_id", user.id)
          .in("lesson_id", lessonIds)

        const progress = progressData as LessonProgress[] || []
        
        progress.forEach((p: LessonProgress) => {
          lessonProgressMap.set(p.lesson_id, p)
        })
      }
    }
  }

  // Calculate overall progress
  const totalLessons = modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0
  const completedLessons = Array.from(lessonProgressMap.values()).filter(p => p.completed).length
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <>
      <Navbar />
      <main className="course-detail-page">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/courses">Courses</Link>
            <span className="separator">/</span>
            <span className="current">{course.title}</span>
          </div>

          {/* Course Header */}
          <div className="course-header">
            <div className="course-header-content">
              <span className="course-type-badge">
                {course.content_type === 'video' ? '🎥 Video Course' : '📄 PDF Course'}
              </span>
              <h1 className="course-title">{course.title}</h1>
              <p className="course-description">{course.description}</p>
              
              <div className="course-meta">
                <span className="meta-item">
                  <span className="meta-icon">📚</span>
                  {modules?.length || 0} Modules
                </span>
                <span className="meta-item">
                  <span className="meta-icon">📖</span>
                  {totalLessons} Lessons
                </span>
                {enrollment && (
                  <span className="meta-item">
                    <span className="meta-icon">📊</span>
                    {progressPercentage}% Complete
                  </span>
                )}
              </div>

              {user ? (
                enrollment ? (
                  <div className="progress-bar-container">
                    <div className="progress-bar-label">
                      <span>Your Progress</span>
                      <span>{progressPercentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <form action="/api/enroll" method="POST">
                    <input type="hidden" name="courseId" value={course.id} />
                    <button type="submit" className="btn btn-primary btn-large">
                      Enroll Now
                    </button>
                  </form>
                )
              ) : (
                <Link href="/login" className="btn btn-primary btn-large">
                  Login to Enroll
                </Link>
              )}
            </div>
          </div>

          {/* Course Content */}
          <CourseContent 
            modules={modules} 
            enrollment={enrollment}
            lessonProgress={lessonProgressMap}
            courseId={course.id}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}