import { createSupabaseServerClient } from "@/lib/supabaseServer"
import SettingsForm from "../../components/admin/SettingForm"

export default async function AdminSettingsPage() {
  const supabase = await createSupabaseServerClient()
  
  // Get current admin user
  const { data: { user } } = await supabase.auth.getUser()
  
  // Get platform settings
  const { data: settings } = await supabase
    .from("settings")
    .select("*")
    .single()

  return (
    <div className="settings-page">
      <div className="settings-page-header">
        <div>
          <h1 className="settings-page-title">Platform Settings</h1>
          <p className="settings-page-subtitle">Configure and customize your LMS platform</p>
        </div>
      </div>

      <SettingsForm user={user} settings={settings} />
    </div>
  )
}