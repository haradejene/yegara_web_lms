"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function AdminNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const isActive = (path: string) => pathname === path

  const navItems = [
    { path: "/lms/admin", label: "Dashboard", icon: "📊" },
    { path: "/lms/admin/courses", label: "Courses", icon: "📚" },
    { path: "/lms/admin/users", label: "Users", icon: "👥" },
    { path: "/lms/admin/analytics", label: "Analytics", icon: "📈" },
    { path: "/lms/admin/settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <Link href="/lms/admin" className="admin-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Admin Panel</span>
        </Link>

        <div className="admin-nav-links">
          {navItems.map(item => (
            <Link
              key={item.path}
              href={item.path}
              className={`admin-nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="admin-nav-actions">
          <Link href="/lms" className="admin-view-site" title="View Site">
            🌐
          </Link>
          <button onClick={handleLogout} className="admin-logout-btn" title="Logout">
            🚪
          </button>
        </div>
      </div>
    </nav>
  )
}