"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import EditUserModal from "./EditUserModal"

interface User {
  id: string
  email: string
  role: 'admin' | 'member'
  created_at: string
  full_name?: string
  last_sign_in?: string
}

interface Props {
  users: User[]
  userStats: Map<string, { total: number; completed: number }>
}

export default function UsersTable({ users, userStats }: Props) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'member') => {
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId)

    if (!error) {
      router.refresh()
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId)

      if (!error) {
        router.refresh()
      }
    }
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setShowEditModal(true)
  }

  return (
    <>
      <div className="admin-table-container">
        <div className="table-controls">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="table-search"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="table-filter"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="member">Members</option>
          </select>
          {/* Removed the Invite User button */}
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Enrollments</th>
              <th>Completion Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => {
              const stats = userStats.get(user.id) || { total: 0, completed: 0 }
              const completionRate = stats.total > 0 
                ? Math.round((stats.completed / stats.total) * 100) 
                : 0

              return (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong>{user.full_name || 'No name'}</strong>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as 'admin' | 'member')}
                      className={`role-select ${user.role}`}
                    >
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>{stats.total}</td>
                  <td>
                    <div className="progress-indicator">
                      <span>{completionRate}%</span>
                      <div className="progress-bar-small">
                        <div 
                          className="progress-bar-fill-small" 
                          style={{ width: `${completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="action-btn edit"
                        title="Edit User"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="action-btn delete"
                        title="Delete User"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showEditModal && selectedUser && (
        <EditUserModal 
          user={selectedUser} 
          onClose={() => {
            setShowEditModal(false)
            setSelectedUser(null)
          }} 
        />
      )}
    </>
  )
}