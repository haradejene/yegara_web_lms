import { createSupabaseServerClient } from "@/lib/supabaseServer"
import { redirect } from "next/navigation"
import Link from "next/link"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default async function HomePage() {
  const supabase = await createSupabaseServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profile?.role === 'admin') {
      redirect("/admin")
    } else {
      redirect("/dashboard")
    }
  }

  // Rest of your landing page for non-authenticated users...
  return (
    <>
      <Navbar />
      <main className="landing-page">
        {/* Your existing landing page content */}
        <section className="hero-section">
          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                Welcome to <span className="highlight">LMS Platform</span>
              </h1>
              <p className="hero-description">
                Your premier learning management system. Access courses, track progress, 
                and advance your career with our comprehensive online learning platform.
              </p>
              <div className="hero-actions">
                <Link href="/register" className="btn btn-primary btn-large">
                  Get Started Free
                </Link>
                <Link href="/courses" className="btn btn-secondary btn-large">
                  Browse Courses
                </Link>
              </div>
            </div>
            
            <div className="hero-stats">
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-content">
                  <h3 className="stat-value">50+</h3>
                  <p className="stat-label">Courses</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3 className="stat-value">1000+</h3>
                  <p className="stat-label">Students</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎥</div>
                <div className="stat-content">
                  <h3 className="stat-value">30+</h3>
                  <p className="stat-label">Video Courses</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📄</div>
                <div className="stat-content">
                  <h3 className="stat-value">20+</h3>
                  <p className="stat-label">PDF Resources</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}