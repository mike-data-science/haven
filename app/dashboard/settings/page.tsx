import { getCurrentUser } from "@/lib/auth/session";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold font-serif mb-6">Settings</h1>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Appearance</h2>
        <p className="text-sm text-slate-500 mb-6">
          Customize the appearance of your dashboard. Choose an accent color that suits your preference.
        </p>
        
        <SettingsClient initialColor={user.themeColor || "blue"} userId={user.id} />
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input type="text" disabled defaultValue={user.name} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" disabled defaultValue={user.email} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500" />
          </div>
          <p className="text-xs text-slate-400 mt-2">Profile details are managed via your authentication provider.</p>
        </div>
      </div>
    </div>
  );
}
