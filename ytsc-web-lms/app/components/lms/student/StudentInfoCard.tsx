interface Props {
  student: {
    bio: string
  }
  joinDate?: string
  location?: string
}

export default function StudentInfoCard({ student, joinDate, location }: Props) {
  return (
    <div className="student-info-card">
      <h2 className="info-card-title">About</h2>
      <p className="student-bio">{student.bio}</p>
      
      {(joinDate || location) && (
        <div className="student-meta-details">
          {joinDate && (
            <div className="meta-detail-item">
              <span className="detail-icon">📅</span>
              <div>
                <span className="detail-label">Joined</span>
                <span className="detail-value">{joinDate}</span>
              </div>
            </div>
          )}
          
          {location && (
            <div className="meta-detail-item">
              <span className="detail-icon">📍</span>
              <div>
                <span className="detail-label">Location</span>
                <span className="detail-value">{location}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}