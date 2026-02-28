import Link from "next/link"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { createSupabaseServerClient } from "@/lib/supabaseServer"

export default async function AboutPage() {
  const supabase = await createSupabaseServerClient()
  
  // Fetch some stats for the about page
  const { count: totalCourses } = await supabase
    .from("courses")
    .select("*", { count: 'exact', head: true })

  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: 'exact', head: true })

  return (
    <>
      <Navbar />
      <main className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="container">
            <h1 className="about-hero-title">Empowering Learning Journeys</h1>
            <p className="about-hero-subtitle">
              We're on a mission to make quality education accessible to everyone, everywhere.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section">
          <div className="container">
            <div className="mission-grid">
              <div className="mission-content">
                <h2 className="section-title">Our Mission</h2>
                <p className="mission-text">
                  At LMS, we believe that learning should be accessible, engaging, and effective. 
                  Our platform brings together expert instructors, comprehensive courses, and a 
                  supportive community to help learners achieve their goals.
                </p>
                <p className="mission-text">
                  Whether you're looking to advance your career, learn a new skill, or explore 
                  a passion, we provide the tools and resources you need to succeed.
                </p>
                <div className="mission-stats">
                  <div className="stat-item">
                    <span className="stat-number">{totalCourses || 50}+</span>
                    <span className="stat-label">Courses</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{totalUsers || 1000}+</span>
                    <span className="stat-label">Students</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">20+</span>
                    <span className="stat-label">Instructors</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">95%</span>
                    <span className="stat-label">Satisfaction</span>
                  </div>
                </div>
              </div>
              <div className="mission-image">
                <div className="image-placeholder">
                  <span className="placeholder-icon">🎯</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section section-light">
          <div className="container">
            <h2 className="section-title text-center">Our Core Values</h2>
            <p className="section-subtitle text-center">
              The principles that guide everything we do
            </p>

            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">📚</div>
                <h3>Quality Education</h3>
                <p>We partner with industry experts to create high-quality, practical courses that deliver real value.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">🌍</div>
                <h3>Accessibility</h3>
                <p>Learning should be available to everyone. We keep our platform affordable and accessible worldwide.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3>Community</h3>
                <p>We foster a supportive community where learners can connect, share, and grow together.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">🚀</div>
                <h3>Innovation</h3>
                <p>We continuously improve our platform with the latest technology and teaching methods.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">🎯</div>
                <h3>Results-Driven</h3>
                <p>We focus on practical skills that help learners achieve their career goals.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">💡</div>
                <h3>Lifelong Learning</h3>
                <p>We believe in continuous growth and encourage learning at every stage of life.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section">
          <div className="container">
            <h2 className="section-title text-center">Meet Our Team</h2>
            <p className="section-subtitle text-center">
              The passionate people behind your learning experience
            </p>

            <div className="team-grid">
              <div className="team-card">
                <div className="team-image">
                  <div className="team-avatar">👩‍💼</div>
                </div>
                <h3>Sarah Johnson</h3>
                <p className="team-role">Founder & CEO</p>
                <p className="team-bio">Former educator with 15+ years of experience in ed-tech.</p>
                <div className="team-social">
                  <a href="#" className="social-link">📧</a>
                  <a href="#" className="social-link">🔗</a>
                  <a href="#" className="social-link">🐦</a>
                </div>
              </div>

              <div className="team-card">
                <div className="team-image">
                  <div className="team-avatar">👨‍💻</div>
                </div>
                <h3>Michael Chen</h3>
                <p className="team-role">CTO</p>
                <p className="team-bio">Full-stack developer passionate about educational technology.</p>
                <div className="team-social">
                  <a href="#" className="social-link">📧</a>
                  <a href="#" className="social-link">🔗</a>
                  <a href="#" className="social-link">🐦</a>
                </div>
              </div>

              <div className="team-card">
                <div className="team-image">
                  <div className="team-avatar">👩‍🎓</div>
                </div>
                <h3>Emma Davis</h3>
                <p className="team-role">Head of Curriculum</p>
                <p className="team-bio">PhD in Education, ensuring our courses meet the highest standards.</p>
                <div className="team-social">
                  <a href="#" className="social-link">📧</a>
                  <a href="#" className="social-link">🔗</a>
                  <a href="#" className="social-link">🐦</a>
                </div>
              </div>

              <div className="team-card">
                <div className="team-image">
                  <div className="team-avatar">👨‍🏫</div>
                </div>
                <h3>David Wilson</h3>
                <p className="team-role">Lead Instructor</p>
                <p className="team-bio">Expert in web development with 10+ years of teaching experience.</p>
                <div className="team-social">
                  <a href="#" className="social-link">📧</a>
                  <a href="#" className="social-link">🔗</a>
                  <a href="#" className="social-link">🐦</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section section-light">
          <div className="container">
            <h2 className="section-title text-center">What Our Students Say</h2>
            <p className="section-subtitle text-center">
              Hear from learners who have transformed their careers with us
            </p>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">
                  The courses here completely changed my career path. I went from beginner to 
                  professional developer in just 6 months!
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">👤</div>
                  <div className="author-info">
                    <h4>Alex Rivera</h4>
                    <p>Web Developer</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">
                  The instructors are amazing and really care about your progress. Best learning 
                  platform I've ever used.
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">👩</div>
                  <div className="author-info">
                    <h4>Priya Patel</h4>
                    <p>Data Scientist</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">
                  Flexible learning schedule and practical projects helped me balance work and study. 
                  Highly recommended!
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">👨</div>
                  <div className="author-info">
                    <h4>James Kim</h4>
                    <p>UX Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section section-dark cta-section">
          <div className="container cta-container">
            <h2 className="cta-title">Ready to Start Your Learning Journey?</h2>
            <p className="cta-description">
              Join thousands of students already learning on our platform
            </p>
            <div className="cta-actions">
              <Link href="/register" className="btn btn-primary btn-large">
                Get Started Free
              </Link>
              <Link href="/courses" className="btn btn-outline-light btn-large">
                Browse Courses
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}