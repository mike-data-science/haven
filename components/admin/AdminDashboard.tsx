import Link from "next/link";
import { adminEntities } from "@/lib/admin";

export default function AdminDashboard() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <section className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-600">Admin dashboard</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Manage every entity from one place</h1>
            <p className="mt-3 max-w-3xl text-xs leading-7 text-slate-600">
              Click any section to open its compact CRUD scaffold. Each page includes a list preview plus the form fields you can wire to your API.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
