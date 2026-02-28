"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      alert("Account created! Please check your email to confirm.")
      router.push("/login")
    }
  }

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <div className="container auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join our community and start learning today</p>
            </div>

            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <p className="input-hint">Must be at least 6 characters</p>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary btn-large auth-btn"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

              <div className="auth-footer">
                <p>
                  Already have an account?{" "}
                  <Link href="/login" className="auth-link">
                    Sign in
                  </Link>
                </p>
                <p className="terms-text">
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="auth-link">Terms of Service</Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="auth-link">Privacy Policy</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}