"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User } from "@supabase/supabase-js"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import StudentStats from "../components/student/StudentStats"
import StudentCourses from "../components/student/StudentCourses"
import { Course, Enrollment } from "@/types/types"

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [enrollments, setEnrollments] = useState<(Enrollment & { course: Course })[]>([])
  const [selectedType, setSelectedType] = useState<string>("All")

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
      } else {
        setUser(session.user)
        await fetchData(session.user.id)
        setLoading(false)
      }
    }
    checkSession()
  }, [router])

  const fetchData = async (userId: string) => {
    // Fetch all courses
    const { data: coursesData } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false })

    setCourses(coursesData || [])

    // Fetch user's enrollments
    const { data: enrollmentsData } = await supabase
      .from("enrollments")
      .select("*, course:courses(*)")
      .eq("user_id", userId)

    setEnrollments((enrollmentsData as (Enrollment & { course: Course })[]) || [])
  }

  // Calculate stats
  const enrolledCourses = enrollments.map(e => e.course)
  const completedCourses = enrollments.filter(e => e.completed)
  
  const stats = {
    enrolledCourses: enrollments.length,
    completedCourses: completedCourses.length
  }

  // Filter courses by type
  const types: string[] = ["All", "video", "pdf"]
  const filteredCourses: Course[] = selectedType === "All" 
    ? courses 
    : courses.filter(course => course.content_type === selectedType)

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading your dashboard...</p>
    </div>
  )

  return (
    <>
      <Navbar />
      <main className="dashboard">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                Welcome back, <span className="highlight">{user?.email?.split('@')[0] || 'Learner'}!</span>
              </h1>
              <p className="hero-description">
                Continue your learning journey with our comprehensive courses. 
                Master new skills and advance your career today.
              </p>
              <div className="hero-actions">
                <Link href="/courses" className="btn btn-primary btn-large">
                  Browse All Courses →
                </Link>
                <Link href={`/students/${user?.id}`} className="btn btn-secondary btn-large">
  View My Profile
</Link>
              </div>
            </div>
            
            <div className="hero-stats">
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-content">
                  <h3 className="stat-value">{courses.length}</h3>
                  <p className="stat-label">Total Courses</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎥</div>
                <div className="stat-content">
                  <h3 className="stat-value">{courses.filter(c => c.content_type === 'video').length}</h3>
                  <p className="stat-label">Video Courses</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📄</div>
                <div className="stat-content">
                  <h3 className="stat-value">{courses.filter(c => c.content_type === 'pdf').length}</h3>
                  <p className="stat-label">PDF Documents</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3 className="stat-value">{enrollments.length}</h3>
                  <p className="stat-label">Your Courses</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Stats Section */}
        {enrollments.length > 0 && (
          <section className="section section-light">
            <div className="container">
              <h2 className="section-title">Your Learning Progress</h2>
              <StudentStats stats={stats} />
            </div>
          </section>
        )}

        {/* My Learning Section */}
        {enrolledCourses.length > 0 && (
          <section className="section">
            <div className="container">
              <StudentCourses 
                courses={enrolledCourses} 
                title="Continue Learning"
                showProgress={true}
                enrollments={enrollments}
              />
            </div>
          </section>
        )}

        {/* All Courses Section with Filter */}
        <section className="section section-light">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">All Courses</h2>
              <div className="category-filter">
                {types.map(type => (
                  <button
                    key={type}
                    className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                    onClick={() => setSelectedType(type)}
                  >
                    {type === 'All' ? 'All' : type === 'video' ? '🎥 Videos' : '📄 PDFs'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="courses-grid">
              {filteredCourses.map(course => (
                <div key={course.id} className="course-card">
                  <div className="course-image">
                    <img 
                      src={course.thumbnail_url || "https://via.placeholder.com/400x250"} 
                      alt={course.title}
                    />
                    <span className="course-type">
                      {course.content_type === 'video' ? '🎥 Video' : '📄 PDF'}
                    </span>
                  </div>
                  <div className="course-content">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-description">{course.description}</p>
                    <div className="course-meta">
                      <span>📅 {new Date(course.created_at).toLocaleDateString()}</span>
                    </div>
                    <Link href={`/courses/${course.id}`} className="btn btn-primary course-btn">
                      View Course
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section section-dark cta-section">
          <div className="container cta-container">
            <h2 className="cta-title">Ready to advance your skills?</h2>
            <p className="cta-description">
              Join our community of learners and start mastering new skills today.
            </p>
            <div className="cta-actions">
              <Link href="/courses" className="btn btn-primary btn-large">
                Explore All Courses
              </Link>
              <Link href={`/students/${user?.id}`} className="btn btn-outline-light btn-large">
                Go to Profile
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}