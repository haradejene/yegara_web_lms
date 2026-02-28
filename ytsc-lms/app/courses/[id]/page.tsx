import { supabase } from "../../../lib/supabaseClient"
import { notFound } from "next/navigation"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { Course } from "@/types/types"

interface Props {
  params: Promise<{ id: string }>
}

export default async function CourseDetail({ params }: Props) {
  const { id } = await params
  
  if (!id) {
    return <div>Invalid course ID</div>
  }

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !course) {
    notFound()
  }

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
          <div className="course-detail-header">
            <span className="course-type-badge">
              {course.content_type === 'video' ? '🎥 Video Course' : '📄 PDF Document'}
            </span>
            <h1 className="course-detail-title">{course.title}</h1>
            <p className="course-detail-date">
              Added: {new Date(course.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Course Content */}
          <div className="course-content-wrapper">
            {course.content_type === 'video' ? (
              <div className="video-container">
                <iframe
                  src={course.content_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                  className="video-player"
                  allowFullScreen
                  title={course.title}
                />
              </div>
            ) : (
              <div className="pdf-container">
                {course.content_url ? (
                  <iframe
                    src={course.content_url}
                    className="pdf-viewer"
                    title={course.title}
                  />
                ) : (
                  <div className="no-content">
                    <p>PDF content not available</p>
                  </div>
                )}
              </div>
            )}

            {/* Course Description */}
            <div className="course-description-section">
              <h2 className="section-title-small">About This Course</h2>
              <p className="course-description">
                {course.description || 'No description available for this course.'}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}