"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

interface Props {
  user: any
  settings: any
}

export default function SettingsForm({ user, settings }: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('general')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    platformName: settings?.platform_name || 'LMS Platform',
    platformEmail: settings?.platform_email || 'admin@lms.com',
    allowRegistrations: settings?.allow_registrations ?? true,
    requireEmailVerification: settings?.require_email_verification ?? true,
    defaultUserRole: settings?.default_user_role || 'member'
  })

  // Appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: settings?.primary_color || '#4F86A6',
    secondaryColor: settings?.secondary_color || '#F26522',
    logo: settings?.logo_url || '',
    favicon: settings?.favicon_url || ''
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: settings?.two_factor_auth ?? false,
    sessionTimeout: settings?.session_timeout || 30,
    maxLoginAttempts: settings?.max_login_attempts || 5,
    passwordMinLength: settings?.password_min_length || 8
  })

  const handleSaveGeneral = async () => {
    setLoading(true)
    setMessage(null)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setMessage({ type: 'success', text: 'Settings saved successfully!' })
    setLoading(false)
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData(e.target as HTMLFormElement)
    const currentPassword = formData.get('currentPassword') as string
    const newPassword = formData.get('newPassword') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' })
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Password updated successfully!' })
      ;(e.target as HTMLFormElement).reset()
    }

    setLoading(false)
  }

  return (
    <div className="settings-container">
      {/* Settings Tabs */}
      <div className="settings-tabs">
        <button 
          className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <span className="tab-icon">⚙️</span>
          <span className="tab-label">General</span>
        </button>
        <button 
          className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
          onClick={() => setActiveTab('appearance')}
        >
          <span className="tab-icon">🎨</span>
          <span className="tab-label">Appearance</span>
        </button>
        <button 
          className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <span className="tab-icon">🔒</span>
          <span className="tab-label">Security</span>
        </button>
        <button 
          className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          <span className="tab-icon">👤</span>
          <span className="tab-label">Account</span>
        </button>
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        {/* Notification Message */}
        {message && (
          <div className={`settings-message ${message.type}`}>
            <span className="message-icon">{message.type === 'success' ? '✅' : '❌'}</span>
            <span>{message.text}</span>
            <button className="message-close" onClick={() => setMessage(null)}>✕</button>
          </div>
        )}

        {/* General Settings Tab */}
        {activeTab === 'general' && (
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">General Settings</h2>
              <p className="section-description">Configure your platform's basic information and user preferences</p>
            </div>
            
            <div className="settings-grid">
              <div className="form-card">
                <h3 className="form-card-title">Platform Information</h3>
                
                <div className="form-group">
                  <label className="form-label">
                    Platform Name
                    <span className="label-hint">The name of your LMS platform</span>
                  </label>
                  <input
                    type="text"
                    value={generalSettings.platformName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, platformName: e.target.value })}
                    className="form-input"
                    placeholder="e.g., LMS Platform"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Platform Email
                    <span className="label-hint">Primary email for system notifications</span>
                  </label>
                  <input
                    type="email"
                    value={generalSettings.platformEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, platformEmail: e.target.value })}
                    className="form-input"
                    placeholder="admin@lms.com"
                  />
                </div>
              </div>

              <div className="form-card">
                <h3 className="form-card-title">User Registration</h3>
                
                <div className="form-group toggle-group">
                  <div className="toggle-header">
                    <div>
                      <label className="form-label">Allow New Registrations</label>
                      <span className="label-hint">Let new users create accounts</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={generalSettings.allowRegistrations}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, allowRegistrations: e.target.checked })}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="form-group toggle-group">
                  <div className="toggle-header">
                    <div>
                      <label className="form-label">Require Email Verification</label>
                      <span className="label-hint">Users must verify email before accessing content</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={generalSettings.requireEmailVerification}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, requireEmailVerification: e.target.checked })}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Default User Role
                    <span className="label-hint">Role assigned to new users</span>
                  </label>
                  <select
                    value={generalSettings.defaultUserRole}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, defaultUserRole: e.target.value })}
                    className="form-select"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                className="btn-save"
                onClick={handleSaveGeneral}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-small"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <span>💾</span>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Appearance Settings Tab */}
        {activeTab === 'appearance' && (
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">Appearance Settings</h2>
              <p className="section-description">Customize the look and feel of your platform</p>
            </div>

            <div className="settings-grid">
              <div className="form-card">
                <h3 className="form-card-title">Brand Colors</h3>
                
                <div className="color-picker-group">
                  <div className="color-input">
                    <label className="form-label">Primary Color</label>
                    <div className="color-preview" style={{ backgroundColor: appearanceSettings.primaryColor }}>
                      <input
                        type="color"
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })}
                        className="color-picker"
                      />
                    </div>
                  </div>

                  <div className="color-input">
                    <label className="form-label">Secondary Color</label>
                    <div className="color-preview" style={{ backgroundColor: appearanceSettings.secondaryColor }}>
                      <input
                        type="color"
                        value={appearanceSettings.secondaryColor}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, secondaryColor: e.target.value })}
                        className="color-picker"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-card">
                <h3 className="form-card-title">Brand Assets</h3>
                
                <div className="form-group">
                  <label className="form-label">Logo URL</label>
                  <input
                    type="url"
                    value={appearanceSettings.logo}
                    onChange={(e) => setAppearanceSettings({ ...appearanceSettings, logo: e.target.value })}
                    className="form-input"
                    placeholder="https://example.com/logo.png"
                  />
                  {appearanceSettings.logo && (
                    <div className="image-preview">
                      <img src={appearanceSettings.logo} alt="Logo preview" />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Favicon URL</label>
                  <input
                    type="url"
                    value={appearanceSettings.favicon}
                    onChange={(e) => setAppearanceSettings({ ...appearanceSettings, favicon: e.target.value })}
                    className="form-input"
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-save">
                <span>💾</span>
                Save Appearance
              </button>
            </div>
          </div>
        )}

        {/* Security Settings Tab */}
        {activeTab === 'security' && (
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">Security Settings</h2>
              <p className="section-description">Configure security preferences and access controls</p>
            </div>

            <div className="settings-grid">
              <div className="form-card">
                <h3 className="form-card-title">Session & Authentication</h3>
                
                <div className="form-group">
                  <label className="form-label">
                    Session Timeout (minutes)
                    <span className="label-hint">Automatically log out inactive users</span>
                  </label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })}
                    className="form-input"
                    min="5"
                    max="120"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Maximum Login Attempts
                    <span className="label-hint">Lock account after failed attempts</span>
                  </label>
                  <input
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: parseInt(e.target.value) })}
                    className="form-input"
                    min="3"
                    max="10"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Minimum Password Length
                    <span className="label-hint">Enforce password complexity</span>
                  </label>
                  <input
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: parseInt(e.target.value) })}
                    className="form-input"
                    min="6"
                    max="20"
                  />
                </div>
              </div>

              <div className="form-card">
                <h3 className="form-card-title">Advanced Security</h3>
                
                <div className="form-group toggle-group">
                  <div className="toggle-header">
                    <div>
                      <label className="form-label">Two-Factor Authentication</label>
                      <span className="label-hint">Require 2FA for all admin accounts</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="security-badge">
                  <span className="badge-icon">🛡️</span>
                  <div>
                    <strong>Security Score: </strong>
                    <span className="score-high">High</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-save">
                <span>🔒</span>
                Update Security
              </button>
            </div>
          </div>
        )}

        {/* Account Settings Tab */}
        {activeTab === 'account' && (
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">Account Settings</h2>
              <p className="section-description">Update your personal account information</p>
            </div>

            <div className="settings-grid">
              <div className="form-card">
                <h3 className="form-card-title">Profile Information</h3>
                
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="form-input disabled"
                  />
                  <span className="input-hint">Email cannot be changed</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Account Type</label>
                  <div className="account-type-badge">Administrator</div>
                </div>

                <div className="form-group">
                  <label className="form-label">Member Since</label>
                  <div className="account-date">
                    {new Date(user?.created_at || '').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="form-card">
                <h3 className="form-card-title">Change Password</h3>
                
                <form onSubmit={handleUpdatePassword}>
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      required
                      className="form-input"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      required
                      minLength={securitySettings.passwordMinLength}
                      className="form-input"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      className="form-input"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-update-password"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-small"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <span>🔑</span>
                        Update Password
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}