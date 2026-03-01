"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../../../../lib/supabaseClient"
import Navbar from "../../../../components/lms/Navbar"
import Footer from "../../../../components/lms/Footer"
import Image from "next/image"
import Link from "next/link"

export default function EditProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    location: "",
    website: "",
    avatar_url: ""
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      setUser(user)

      // Fetch profile data
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (error) {
        console.error("Error loading profile:", error)
      } else if (profile) {
        setFormData({
          full_name: profile.full_name || "",
          bio: profile.bio || "",
          location: profile.location || "",
          website: profile.website || "",
          avatar_url: profile.avatar_url || ""
        })
        if (profile.avatar_url) {
          setAvatarPreview(profile.avatar_url)
        }
      }

      setLoading(false)
    }

    loadProfile()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !user) return null

    const fileExt = avatarFile.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile)

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError)
      return null
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      let avatarUrl = formData.avatar_url

      // Upload new avatar if selected
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar()
        if (uploadedUrl) {
          avatarUrl = uploadedUrl
        }
      }

      // Update profile
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          location: formData.location,
          website: formData.website,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      
      // Refresh the page after 2 seconds
      setTimeout(() => {
        router.push(`/students/${user.id}`)
        router.refresh()
      }, 2000)

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="edit-profile-page">
        <div className="container">
          <div className="edit-profile-header">
            <h1 className="page-title">Edit Profile</h1>
            <Link href={`/students/${user.id}`} className="btn btn-secondary">
              Cancel
            </Link>
          </div>

          <div className="edit-profile-grid">
            {/* Avatar Section */}
            <div className="avatar-section">
              <div className="avatar-upload">
                <div className="current-avatar">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" />
                  ) : (
                    <div className="avatar-placeholder">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <label htmlFor="avatar-upload" className="btn btn-secondary btn-small">
                  Change Photo
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
                <p className="avatar-hint">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
              <form onSubmit={handleSubmit} className="edit-profile-form">
                {message && (
                  <div className={`message ${message.type}`}>
                    {message.text}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="form-input disabled"
                  />
                  <p className="input-hint">Email cannot be changed</p>
                </div>

                <div className="form-group">
                  <label htmlFor="full_name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bio" className="form-label">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="form-input"
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="website" className="form-label">Website</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-large"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}