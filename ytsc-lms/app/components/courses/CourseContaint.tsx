"use client"

import { useState } from "react"
import { CourseModule, Lesson, Enrollment, LessonProgress } from "@/types/types"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

interface Props {
  modules: (CourseModule & { lessons: Lesson[] })[]
  enrollment: Enrollment | null
  lessonProgress: Map<string, LessonProgress>
  courseId: string
}

export default function CourseContent({ modules, enrollment, lessonProgress, courseId }: Props) {
  const [activeModule, setActiveModule] = useState<string | null>(modules[0]?.id || null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const router = useRouter()

  const handleLessonComplete = async (lesson: Lesson) => {
    if (!enrollment) return

    const progress = lessonProgress.get(lesson.id)
    
    if (progress?.completed) {
      // Mark as incomplete
      await supabase
        .from("lesson_progress")
        .update({ completed: false, completed_at: null })
        .eq("id", progress.id)
    } else {
      // Mark as complete
      if (progress) {
        await supabase
          .from("lesson_progress")
          .update({ completed: true, completed_at: new Date().toISOString() })
          .eq("id", progress.id)
      } else {
        await supabase
          .from("lesson_progress")
          .insert({
            user_id: enrollment.user_id,
            lesson_id: lesson.id,
            completed: true,
            completed_at: new Date().toISOString()
          })
      }
    }

    router.refresh()
  }

  const calculateModuleProgress = (lessons: Lesson[]) => {
    if (lessons.length === 0) return 0
    const completed = lessons.filter(l => lessonProgress.get(l.id)?.completed).length
    return Math.round((completed / lessons.length) * 100)
  }

  if (!enrollment) {
    return (
      <div className="course-preview">
        <h2>Course Content</h2>
        <div className="modules-list">
          {modules.map(module => (
            <div key={module.id} className="module-preview">
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <div className="lessons-preview">
                {module.lessons.map(lesson => (
                  <div key={lesson.id} className="lesson-preview-item">
                    <span className="lesson-type">
                      {lesson.content_type === 'video' ? '🎥' : 
                       lesson.content_type === 'pdf' ? '📄' : 
                       lesson.content_type === 'quiz' ? '❓' : '📝'}
                    </span>
                    <span>{lesson.title}</span>
                    {lesson.duration && (
                      <span className="lesson-duration">{lesson.duration} min</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="preview-cta">
          <p>Enroll to access all course content and track your progress</p>
        </div>
      </div>
    )
  }

  if (selectedLesson) {
    return (
      <div className="lesson-view">
        <button 
          className="back-to-course"
          onClick={() => setSelectedLesson(null)}
        >
          ← Back to Course
        </button>

        <div className="lesson-header">
          <h2>{selectedLesson.title}</h2>
          <button 
            className={`btn ${lessonProgress.get(selectedLesson.id)?.completed ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => handleLessonComplete(selectedLesson)}
          >
            {lessonProgress.get(selectedLesson.id)?.completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>

        {selectedLesson.content_type === 'video' && selectedLesson.content_url && (
          <div className="video-container">
            <iframe
              src={selectedLesson.content_url}
              className="video-player"
              allowFullScreen
              title={selectedLesson.title}
            />
          </div>
        )}

        {selectedLesson.content_type === 'pdf' && selectedLesson.content_url && (
          <div className="pdf-container">
            <iframe
              src={selectedLesson.content_url}
              className="pdf-viewer"
              title={selectedLesson.title}
            />
          </div>
        )}

        {selectedLesson.content_type === 'text' && selectedLesson.content_text && (
          <div className="text-content">
            <div className="text-content-inner">
              {selectedLesson.content_text.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {selectedLesson.content_type === 'quiz' && (
          <div className="quiz-content">
            <p>Quiz functionality coming soon!</p>
          </div>
        )}

        <div className="lesson-description">
          <h3>About this lesson</h3>
          <p>{selectedLesson.description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="course-content">
      <h2>Course Content</h2>
      
      <div className="modules-accordion">
        {modules.map(module => {
          const moduleProgress = calculateModuleProgress(module.lessons)
          
          return (
            <div key={module.id} className="module-item">
              <button
                className={`module-header ${activeModule === module.id ? 'active' : ''}`}
                onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
              >
                <div className="module-title">
                  <h3>{module.title}</h3>
                  <span className="module-progress">{moduleProgress}%</span>
                </div>
                <span className="module-toggle">
                  {activeModule === module.id ? '−' : '+'}
                </span>
              </button>

              {activeModule === module.id && (
                <div className="module-lessons">
                  {module.lessons.map(lesson => {
                    const progress = lessonProgress.get(lesson.id)
                    
                    return (
                      <div
                        key={lesson.id}
                        className={`lesson-item ${progress?.completed ? 'completed' : ''}`}
                      >
                        <button
                          className="lesson-content-btn"
                          onClick={() => setSelectedLesson(lesson)}
                        >
                          <span className="lesson-status">
                            {progress?.completed ? '✅' : '○'}
                          </span>
                          <span className="lesson-type-icon">
                            {lesson.content_type === 'video' ? '🎥' : 
                             lesson.content_type === 'pdf' ? '📄' : 
                             lesson.content_type === 'quiz' ? '❓' : '📝'}
                          </span>
                          <span className="lesson-title">{lesson.title}</span>
                          {lesson.duration && (
                            <span className="lesson-duration">{lesson.duration} min</span>
                          )}
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}