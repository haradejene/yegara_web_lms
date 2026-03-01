import Link from "next/link"

interface Props {
  student: {
    name: string
    email: string
    role: string
    avatar_url?: string
  }
  isOwnProfile?: boolean
}

export default function StudentHeader({ student, isOwnProfile }: Props) {
  const initials = student.name 
    ? student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : student.email.charAt(0).toUpperCase()

  return (
    <div className="student-header">
      <div className="student-avatar-large">
        {student.avatar_url ? (
          <img src={student.avatar_url} alt={student.name} />
        ) : (
          initials
        )}
      </div>

      <div className="student-info">
        <h1 className="student-name">{student.name}</h1>
        <p className="student-email">{student.email}</p>
        <span className={`student-role-badge ${student.role === 'admin' ? 'role-admin' : 'role-member'}`}>
          {student.role === 'admin' ? 'Administrator' : 'Student'}
        </span>
      </div>

      {isOwnProfile && (
        <Link href="/students/me/edit" className="btn btn-secondary edit-profile-btn">
          Edit Profile
        </Link>
      )}
    </div>
  )
}