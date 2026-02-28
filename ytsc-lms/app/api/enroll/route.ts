import { createSupabaseServerClient } from "@/lib/supabaseServer"
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { courseId } = await request.json()
    
    const supabase = await createSupabaseServerClient()
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .single()

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      )
    }

    // Create enrollment
    const { data, error } = await supabase
      .from('enrollments')
      .insert([
        {
          user_id: user.id,
          course_id: courseId,
          progress: 0,
          completed: false,
          enrolled_at: new Date().toISOString(),
          last_accessed: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Enrollment error:', error)
      return NextResponse.json(
        { error: 'Failed to enroll in course' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, enrollment: data })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}