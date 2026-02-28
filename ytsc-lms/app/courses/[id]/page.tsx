import { supabase } from "../../../lib/supabaseClient"
import { notFound } from "next/navigation"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

interface Props {
  params: Promise<{ id: string }>
}

export default async function CourseDetail({ params }: Props) {
  // ✅ Await the params
  const { id } = await params
  
  if (!id) {
    return <div>Invalid course ID</div>
  }

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !course) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="course-detail-page">
        {/* Rest of your component... */}
      </main>
      <Footer />
    </>
  )
}