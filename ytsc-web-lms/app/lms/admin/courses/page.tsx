import { createSupabaseServerClient } from "@/lib/supabaseServer"
import Link from "next/link"
import { Course } from "@/types/types"
import CourseTable from "../../../components/lms/admin/CourseTable"

export default async function AdminCoursesPage() {
  const supabase = await createSupabaseServerClient()
  
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching courses:", error)
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Manage Courses</h1>
          <p className="admin-subtitle">Create, edit, and manage all courses</p>
        </div>
        <Link href="/admin/courses/new" className="btn btn-primary">
          + Add New Course
        </Link>
      </div>

      <CourseTable courses={courses || []} />
    </div>
  )
}