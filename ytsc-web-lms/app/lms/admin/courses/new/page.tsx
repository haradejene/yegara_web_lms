"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

export default function NewCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail_url: "",
    content_type: "video",
    content_url: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from("courses")
      .insert([formData])

    setLoading(false)

    if (!error) {
      router.push("/admin/courses")
      router.refresh()
    } else {
      alert("Error creating course: " + error.message)
    }
  }

  return (
    <div className="new-course-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Create New Course</h1>
          <p className="page-subtitle">Add a new course to your learning platform</p>
        </div>
        <Link href="/admin/courses" className="btn btn-outline">
          ← Back to Courses
        </Link>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="course-form">
          {/* Basic Information Section */}
          <div className="form-section">
            <h2 className="section-title">Basic Information</h2>
            <p className="section-description">Enter the core details of your course</p>

            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Course Title <span className="required">*</span>
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input"
                placeholder="e.g., Introduction to Web Development"
              />
              <span className="input-hint">Give your course a clear, descriptive title</span>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea"
                placeholder="Describe what students will learn in this course..."
              />
              <span className="input-hint">Provide a detailed overview of the course content</span>
            </div>
          </div>

          {/* Media Section */}
          <div className="form-section">
            <h2 className="section-title">Course Media</h2>
            <p className="section-description">Add visual elements and content</p>

            <div className="form-group">
              <label htmlFor="thumbnail" className="form-label">Thumbnail URL</label>
              <div className="input-with-preview">
                <input
                  id="thumbnail"
                  type="url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.thumbnail_url && (
                  <div className="thumbnail-preview">
                    <img src={formData.thumbnail_url} alt="Thumbnail preview" />
                  </div>
                )}
              </div>
              <span className="input-hint">Add an eye-catching image for your course</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="content_type" className="form-label">
                  Content Type <span className="required">*</span>
                </label>
                <div className="content-type-selector">
                  <button
                    type="button"
                    className={`type-btn ${formData.content_type === 'video' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, content_type: 'video' })}
                  >
                    <span className="type-icon">🎥</span>
                    <span className="type-label">Video Course</span>
                  </button>
                  <button
                    type="button"
                    className={`type-btn ${formData.content_type === 'pdf' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, content_type: 'pdf' })}
                  >
                    <span className="type-icon">📄</span>
                    <span className="type-label">PDF Document</span>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="content_url" className="form-label">
                  Content URL <span className="required">*</span>
                </label>
                <input
                  id="content_url"
                  type="url"
                  required
                  value={formData.content_url}
                  onChange={(e) => setFormData({ ...formData, content_url: e.target.value })}
                  className="form-input"
                  placeholder={formData.content_type === 'video' 
                    ? 'https://www.youtube.com/watch?v=...' 
                    : 'https://example.com/course.pdf'}
                />
                <span className="input-hint">
                  {formData.content_type === 'video' 
                    ? 'Enter YouTube, Vimeo, or direct video URL' 
                    : 'Enter the URL to your PDF document'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <Link href="/admin/courses" className="btn btn-secondary">
              Cancel
            </Link>
            <button 
              type="submit" 
              className="btn btn-primary btn-large"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Course...
                </>
              ) : (
                'Create Course'
              )}
            </button>
          </div>
        </form>

        {/* Preview Card */}
        <div className="preview-card">
          <h3 className="preview-title">Course Preview</h3>
          <div className="preview-content">
            <div className="preview-thumbnail">
              {formData.thumbnail_url ? (
                <img src={formData.thumbnail_url} alt="Course thumbnail" />
              ) : (
                <div className="preview-thumbnail-placeholder">
                  <span>📷</span>
                  <p>No thumbnail</p>
                </div>
              )}
              <span className="preview-badge">
                {formData.content_type === 'video' ? '🎥 Video' : '📄 PDF'}
              </span>
            </div>
            <h4 className="preview-course-title">
              {formData.title || 'Course Title'}
            </h4>
            <p className="preview-course-description">
              {formData.description || 'Course description will appear here...'}
            </p>
            <div className="preview-meta">
              <span>✨ New Course</span>
              <span>📅 Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}