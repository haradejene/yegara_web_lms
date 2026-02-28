import { Course, Enrollment } from "../../../types/types"
import Link from "next/link"

type StudentCoursesProps = {
  courses: Course[]
  title?: string
  showProgress?: boolean
  enrollments?: (Enrollment & { course?: Course })[] | null
}

export default function StudentCourses({ 
  courses, 
  title = "My Courses", 
  showProgress = false,
  enrollments = null 
}: StudentCoursesProps) {
  
  const getCourseProgress = (courseId: string): number => {
    if (!enrollments) return 0
    const enrollment = enrollments.find(e => e.course_id === courseId)
    return enrollment?.progress || 0
  }

  const isCompleted = (courseId: string): boolean => {
    if (!enrollments) return false
    const enrollment = enrollments.find(e => e.course_id === courseId)
    return enrollment?.completed || false
  }

  if (!courses.length) {
    return (
      <div className="student-courses-empty">
        <div className="empty-icon">📚</div>
        <h3>No courses yet</h3>
        <p>Start your learning journey by enrolling in a course</p>
        <Link href="/courses" className="btn btn-primary">
          Browse Courses
        </Link>
      </div>
    )
  }

  return (
    <div className="student-courses-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {courses.length > 3 && (
          <Link href="/courses" className="view-all-link">
            View All Courses →
          </Link>
        )}
      </div>

      <div className="student-courses-grid">
        {courses.slice(0, 3).map((course) => {
          const progress = getCourseProgress(course.id)
          const completed = isCompleted(course.id)

          return (
            <div key={course.id} className="student-course-card">
              <div className="course-card-image">
                <img 
                  src={course.thumbnail_url || "https://via.placeholder.com/400x250?text=Course"} 
                  alt={course.title}
                />
                <span className="course-type-badge">
                  {course.content_type === 'video' ? '🎥 Video' : '📄 PDF'}
                </span>
                {completed && (
                  <span className="completed-badge">✅ Completed</span>
                )}
              </div>
              
              <div className="course-card-content">
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-description">
                  {course.description || 'No description available'}
                </p>
                
                {showProgress && progress > 0 && (
                  <div className="course-progress">
                    <div className="progress-label">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="progress-bar-small">
                      <div 
                        className="progress-bar-fill-small" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="course-card-footer">
                  <span className="course-date">
                    📅 {new Date(course.created_at).toLocaleDateString()}
                  </span>
                  <Link href={`/courses/${course.id}`} className="btn btn-secondary btn-small">
                    {progress > 0 ? 'Continue' : 'View Course'}
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {courses.length > 3 && (
        <div className="text-center mt-4">
          <Link href="/courses" className="btn btn-outline">
            Load More Courses
          </Link>
        </div>
      )}
    </div>
  )
}