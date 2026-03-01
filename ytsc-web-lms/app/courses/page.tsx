import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import Navbar from "@/app/components/lms/Navbar"
import Footer from "@/app/components/lms/Footer"
import { Course } from "@/types/types"

export default async function CoursesPage() {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return (
    <>
      <Navbar />
      <div className="error-container">
        <p>Error loading courses: {error.message}</p>
      </div>
      <Footer />
    </>
  )
  
  if (!courses || courses.length === 0) return (
    <>
      <Navbar />
      <div className="empty-state">
        <div className="empty-state-icon">📚</div>
        <h3>No courses available</h3>
        <p>Check back later for new courses</p>
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <main className="courses-page">
        <div className="container">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">All Courses</h1>
            <p className="page-subtitle">
              Discover our comprehensive collection of courses
            </p>
          </div>

          {/* Courses Grid */}
          <div className="courses-grid">
            {courses.map((course: Course) => (
              <div key={course.id} className="course-card">
                <div className="course-image">
                  <img 
                    src={course.thumbnail_url || "https://via.placeholder.com/400x250?text=Course"} 
                    alt={course.title}
                    className="course-img"
                  />
                  <span className="course-type">{course.content_type === 'video' ? '🎥 Video' : '📄 PDF'}</span>
                </div>
                
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description || 'No description available'}</p>
                  
                  <div className="course-meta">
                    <span className="meta-item">
                      {course.content_type === 'video' ? '🎥 Video Course' : '📄 PDF Document'}
                    </span>
                    <span className="meta-item">
                      📅 {new Date(course.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <Link href={`/courses/${course.id}`} className="btn btn-primary course-btn">
                    View Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}