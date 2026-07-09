import prisma from "@/lib/db";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import AnalyticsClient from "./AnalyticsClient";

export default async function AnalyticsPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { properties: true }
      }
    }
  });

  const propertyData = categories.map(c => ({
    name: c.name,
    count: c._count.properties
  }));

  const totalProperties = propertyData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold font-serif mb-6">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Total System Properties</h2>
          <p className="text-3xl font-bold text-[var(--theme-accent)]">{totalProperties}</p>
          <p className="text-sm text-slate-500 mt-2">Across all categories</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Properties by Category</h2>
        <div className="h-[400px] w-full">
          <AnalyticsClient data={propertyData} />
        </div>
      </div>
    </div>
  );
}
