export type Course = {
  id: string
  title: string
  description: string | null
  thumbnail_url: string | null
  content_type: 'video' | 'pdf' | null
  content_url: string | null
  created_at: string
}

export type Profile = {
  id: string
  email: string | null
  role: 'member' | 'admin'
  created_at: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  location: string | null
  website: string | null
  updated_at: string | null
}
export type Enrollment = {
  id: string
  user_id: string
  course_id: string
  progress: number
  completed: boolean
  enrolled_at: string
  completed_at: string | null
  last_accessed: string
  course?: Course
}