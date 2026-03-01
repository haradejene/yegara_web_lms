"use client"

import { useState } from "react"
import Link from "next/link"
import { Course } from "@/types/types"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

interface Props {
  courses: Course[]
}

export default function CourseTable({ courses }: Props) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || course.content_type === filter
    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("id", id)

      if (!error) {
        router.refresh()
      } else {
        alert("Error deleting course")
      }
    }
  }

  return (
    <div className="admin-table-container">
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="table-search"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="table-filter"
        >
          <option value="all">All Types</option>
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map(course => (
            <tr key={course.id}>
              <td>
                <div className="course-info">
                  <img 
                    src={course.thumbnail_url || "/placeholder.jpg"} 
                    alt={course.title}
                    className="course-thumbnail"
                  />
                  <div>
                    <strong>{course.title}</strong>
                    <p>{course.description?.substring(0, 50)}...</p>
                  </div>
                </div>
              </td>
              <td>
                <span className={`type-badge ${course.content_type}`}>
                  {course.content_type === 'video' ? '🎥 Video' : '📄 PDF'}
                </span>
              </td>
              <td>{new Date(course.created_at).toLocaleDateString()}</td>
              <td>
                <div className="action-buttons">
                  <Link href={`/lms/admin/courses/${course.id}/edit`} className="action-btn edit">
                    ✏️ Edit
                  </Link>
                  <Link href={`/courses/${course.id}`} className="action-btn view">
                    👁️ View
                  </Link>
                  <button 
                    onClick={() => handleDelete(course.id)} 
                    className="action-btn delete"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}