"use client"

import { useState } from "react"
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieLabelRenderProps, TooltipProps
} from 'recharts'

interface PopularCourse {
  title: string
  count: number
  completed: number
}

interface RecentActivity {
  user?: { email: string }
  course?: { title: string }
  completed: boolean
  last_accessed: string
}

interface Props {
  metrics: {
    totalUsers: number
    totalCourses: number
    totalEnrollments: number
    completedEnrollments: number
    videoCourses: number
    pdfCourses: number
    admins: number
    members: number
    recentEnrollments: number
    popularCourses: PopularCourse[]
    recentActivity: RecentActivity[]
  }
}

interface CourseTypeData {
  name: string
  value: number
}

interface UserRoleData {
  name: string
  value: number
}

export default function AnalyticsDashboard({ metrics }: Props) {
  const [timeRange, setTimeRange] = useState('30d')

  const completionRate = metrics.totalEnrollments > 0
    ? Math.round((metrics.completedEnrollments / metrics.totalEnrollments) * 100)
    : 0

  const courseTypeData: CourseTypeData[] = [
    { name: 'Video Courses', value: metrics.videoCourses },
    { name: 'PDF Courses', value: metrics.pdfCourses }
  ]

  const userRoleData: UserRoleData[] = [
    { name: 'Admins', value: metrics.admins },
    { name: 'Members', value: metrics.members }
  ]

  const COLORS = ['#4F86A6', '#F26522', '#6C9BB6', '#FF8A4C']

  // Custom label renderer for pie charts
  const renderPieLabel = (props: PieLabelRenderProps) => {
    const { name, percent } = props
    if (typeof percent === 'number') {
      return `${name}: ${(percent * 100).toFixed(0)}%`
    }
    return name
  }

  return (
    <div className="analytics-dashboard">
      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon blue">👥</div>
          <div className="metric-details">
            <span className="metric-value">{metrics.totalUsers}</span>
            <span className="metric-label">Total Users</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon green">📚</div>
          <div className="metric-details">
            <span className="metric-value">{metrics.totalCourses}</span>
            <span className="metric-label">Total Courses</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon orange">📊</div>
          <div className="metric-details">
            <span className="metric-value">{metrics.totalEnrollments}</span>
            <span className="metric-label">Enrollments</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon purple">✅</div>
          <div className="metric-details">
            <span className="metric-value">{completionRate}%</span>
            <span className="metric-label">Completion Rate</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Course Distribution */}
        <div className="chart-card">
          <h3>Course Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderPieLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {courseTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* User Role Distribution */}
        <div className="chart-card">
          <h3>User Roles</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userRoleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderPieLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {userRoleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Courses */}
        <div className="chart-card full-width">
          <h3>Most Popular Courses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics.popularCourses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4F86A6" name="Enrollments" />
              <Bar dataKey="completed" fill="#F26522" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity-card">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {metrics.recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                {activity.completed ? '✅' : '📖'}
              </div>
              <div className="activity-details">
                <p>
                  <strong>{activity.user?.email || 'Unknown user'}</strong> 
                  {activity.completed ? ' completed ' : ' accessed '}
                  <strong>{activity.course?.title || 'Unknown course'}</strong>
                </p>
                <span className="activity-time">
                  {new Date(activity.last_accessed).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}