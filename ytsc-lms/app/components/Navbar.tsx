"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "../../lib/supabaseClient"
import { User } from "@supabase/supabase-js"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">LMS</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav">
          <Link href="/courses" className={`nav-link ${isActive('/courses') ? 'active' : ''}`}>
            Courses
          </Link>
          <Link href="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link href="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            About
          </Link>
        </div>

        {/* Desktop User Menu */}
        <div className="nav-actions desktop-menu">
          {user ? (
            <div className="user-menu">
              <Link href={`/students/${user.id}`} className="user-avatar-link" title="View Profile">
                <div className="user-avatar">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </Link>
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

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <Link href="/courses" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Courses
            </Link>
            <Link href="/dashboard" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </Link>
            <Link href="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            {user ? (
              <>
                <Link href={`/students/${user.id}`} className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
                <button onClick={handleLogout} className="mobile-nav-link mobile-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}