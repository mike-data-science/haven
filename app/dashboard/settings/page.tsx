import { getCurrentUser } from "@/lib/auth/session";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-lg font-bold font-serif mb-[14px]">Settings</h1>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-[14px] mb-[18px]">
        <h2 className="text-sm font-semibold mb-[9px]">Appearance</h2>
        <p className="text-xs text-slate-500 mb-[14px]">
          Customize the appearance of your dashboard. Choose an accent color that suits your preference.
        </p>
        
        <SettingsClient initialColor={user.themeColor || "blue"} userId={user.id} />
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-[14px]">
        <h2 className="text-sm font-semibold mb-[9px]">Profile Information</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-[2px]">Name</label>
            <input type="text" disabled defaultValue={user.name} className="w-full px-[9px] py-[3px].5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-[2px]">Email</label>
            <input type="email" disabled defaultValue={user.email} className="w-full px-[9px] py-[3px].5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500" />
          </div>
          <p className="text-xs text-slate-400 mt-[3px].5">Profile details are managed via your authentication provider.</p>
        </div>
      </div>
    </div>
  );
}
