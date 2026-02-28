"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { User } from "@supabase/supabase-js"

// Types
interface Course {
  id: number
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  students: number
  rating: number
  image: string
  category: string
}

interface StatCardProps {
  icon: string
  value: string
  label: string
}

interface CourseCardProps {
  course: Course
}

// Mock courses data
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript from scratch",
    instructor: "Sarah Johnson",
    duration: "8 weeks",
    level: "Beginner",
    students: 1234,
    rating: 4.8,
    image: "/api/placeholder/400/250",
    category: "Development"
  },
  {
    id: 2,
    title: "Data Science Essentials",
    description: "Master Python, SQL, and data visualization",
    instructor: "Michael Chen",
    duration: "10 weeks",
    level: "Intermediate",
    students: 892,
    rating: 4.6,
    image: "/api/placeholder/400/250",
    category: "Data Science"
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Create beautiful user interfaces and experiences",
    instructor: "Emma Davis",
    duration: "6 weeks",
    level: "Beginner",
    students: 2156,
    rating: 4.9,
    image: "/api/placeholder/400/250",
    category: "Design"
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    description: "Master social media, SEO, and content marketing",
    instructor: "Alex Martinez",
    duration: "8 weeks",
    level: "Intermediate",
    students: 1567,
    rating: 4.7,
    image: "/api/placeholder/400/250",
    category: "Marketing"
  },
  {
    id: 5,
    title: "Mobile App Development with React Native",
    description: "Build iOS and Android apps with JavaScript",
    instructor: "David Wilson",
    duration: "12 weeks",
    level: "Advanced",
    students: 723,
    rating: 4.5,
    image: "/api/placeholder/400/250",
    category: "Development"
  },
  {
    id: 6,
    title: "Business Analytics Fundamentals",
    description: "Learn data-driven decision making",
    instructor: "Lisa Thompson",
    duration: "6 weeks",
    level: "Beginner",
    students: 945,
    rating: 4.4,
    image: "/api/placeholder/400/250",
    category: "Business"
  }
]

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <h3 className="stat-value">{value}</h3>
      <p className="stat-label">{label}</p>
    </div>
  </div>
)

// Course Card Component
const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
  <div className="course-card">
    <div className="course-image">
      <Image 
        src={course.image} 
        alt={course.title}
        width={400}
        height={250}
        className="course-img"
      />
      <span className="course-category">{course.category}</span>
      <span className="course-level">{course.level}</span>
    </div>
    
    <div className="course-content">
      <h3 className="course-title">{course.title}</h3>
      <p className="course-description">{course.description}</p>
      
      <div className="course-instructor">
        <div className="instructor-avatar">
          {course.instructor.charAt(0)}
        </div>
        <span>{course.instructor}</span>
      </div>
      
      <div className="course-meta">
        <div className="meta-item">
          <span className="meta-icon">⏱️</span>
          {course.duration}
        </div>
        <div className="meta-item">
          <span className="meta-icon">👥</span>
          {course.students.toLocaleString()} students
        </div>
        <div className="meta-item">
          <span className="meta-icon">⭐</span>
          {course.rating}
        </div>
      </div>
      
      <button className="btn btn-primary course-btn">Enroll Now</button>
    </div>
  </div>
)

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
      } else {
        setUser(session.user)
        setLoading(false)
      }
    }
    checkSession()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  // Filter courses by category
  const categories: string[] = ["All", ...new Set(mockCourses.map(course => course.category))]
  const filteredCourses: Course[] = selectedCategory === "All" 
    ? mockCourses 
    : mockCourses.filter(course => course.category === selectedCategory)

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading your dashboard...</p>
    </div>
  )

  return (
    <div className="dashboard">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-container">
          <Link href="/" className="logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">LMS</span>
          </Link>
          
          <div className="nav-links">
            <Link href="/courses" className="nav-link">Courses</Link>
            <Link href="/dashboard" className="nav-link active">Dashboard</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/about" className="nav-link">About</Link>
          </div>
          
          <div className="nav-actions">
            {user ? (
              <div className="user-menu">
                <div className="user-avatar">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <button onClick={handleLogout} className="btn btn-secondary btn-small">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn btn-secondary btn-small">Login</Link>
                <Link href="/register" className="btn btn-primary btn-small">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with Get Started CTA */}
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
              <button className="btn btn-primary btn-large">
                Get Started Now →
              </button>
              <Link href="/courses" className="btn btn-secondary btn-large">
                Browse All Courses
              </Link>
            </div>
          </div>
          
          <div className="hero-stats">
            <StatCard icon="📚" value="50+" label="Courses" />
            <StatCard icon="👥" value="5K+" label="Students" />
            <StatCard icon="⭐" value="4.8" label="Rating" />
            <StatCard icon="🏆" value="15+" label="Instructors" />
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Continue Learning</h2>
              <p className="section-subtitle">Pick up where you left off with your enrolled courses</p>
            </div>
            <Link href="/courses" className="view-all-link">
              View All Courses →
            </Link>
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="courses-grid">
            {filteredCourses.slice(0, 3).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* All Courses Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Popular Courses</h2>
              <p className="section-subtitle">Most enrolled courses by our students</p>
            </div>
          </div>
          
          <div className="courses-grid">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark cta-section">
        <div className="container cta-container">
          <h2 className="cta-title">Ready to start your learning journey?</h2>
          <p className="cta-description">
            Join thousands of students already learning on our platform. 
            Get unlimited access to all courses and start learning today.
          </p>
          <div className="cta-actions">
            <Link href="/register" className="btn btn-primary btn-large">
              Get Started For Free
            </Link>
            <Link href="/pricing" className="btn btn-outline-light btn-large">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4 className="footer-title">About Us</h4>
              <p className="footer-text">
                We provide high-quality online courses to help you advance your career and achieve your goals.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">📘</a>
                <a href="#" className="social-link">🐦</a>
                <a href="#" className="social-link">📷</a>
                <a href="#" className="social-link">💼</a>
              </div>
            </div>
            
            <div className="footer-col">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4 className="footer-title">Categories</h4>
              <ul className="footer-links">
                <li><Link href="/courses?category=development">Development</Link></li>
                <li><Link href="/courses?category=design">Design</Link></li>
                <li><Link href="/courses?category=marketing">Marketing</Link></li>
                <li><Link href="/courses?category=business">Business</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4 className="footer-title">Support</h4>
              <ul className="footer-links">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/cookies">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 LMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}