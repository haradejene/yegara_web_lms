interface Props {
  stats: {
    enrolledCourses: number
    completedCourses: number
    inProgressCourses?: number
    totalProgress?: number
  }
}

export default function StudentStats({ stats }: Props) {
  // Calculate inProgress if not provided
  const inProgress = stats.inProgressCourses ?? 
    (stats.enrolledCourses - stats.completedCourses)

  // Calculate total progress if not provided
  const totalProgress = stats.totalProgress ?? 
    (stats.enrolledCourses > 0 
      ? Math.round((stats.completedCourses / stats.enrolledCourses) * 100)
      : 0)

  return (
    <div className="student-stats-grid">
      <div className="student-stat-card">
        <div className="stat-icon-wrapper enrolled">
          <span className="stat-icon">📚</span>
        </div>
        <div className="stat-content">
          <span className="stat-label">Enrolled</span>
          <span className="stat-value">{stats.enrolledCourses}</span>
        </div>
      </div>

      <div className="student-stat-card">
        <div className="stat-icon-wrapper in-progress">
          <span className="stat-icon">📖</span>
        </div>
        <div className="stat-content">
          <span className="stat-label">In Progress</span>
          <span className="stat-value">{inProgress}</span>
        </div>
      </div>

      <div className="student-stat-card">
        <div className="stat-icon-wrapper completed">
          <span className="stat-icon">✅</span>
        </div>
        <div className="stat-content">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{stats.completedCourses}</span>
        </div>
      </div>

      {stats.enrolledCourses > 0 && (
        <div className="progress-bar-container">
          <div className="progress-bar-label">
            <span>Overall Progress</span>
            <span>{totalProgress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}