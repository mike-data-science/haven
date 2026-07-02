import Link from "next/link";
import { adminEntities } from "@/lib/admin";

export default function AdminDashboard() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-600">Admin dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Manage every entity from one place</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              Click any section to open its compact CRUD scaffold. Each page includes a list preview plus the form fields you can wire to your API.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
