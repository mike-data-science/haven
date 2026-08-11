"use client";

import { useState } from "react";
import Image from "next/image";
import { Activity, TrendingUp, TrendingDown, DollarSign, Map as MapIcon, Home, PieChart as PieChartIcon, Eye, Star, Zap, Search, BrainCircuit } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsDashboard({
  marketStats,
  sectors,
  propertyTypes,
  priceTrends,
  userProperties,
  topAgents,
  userName
}: {
  marketStats: { totalProperties: number; avgPrice: number; avgPricePerSqm: number; minPricePerSqm: number; };
  sectors: { name: string; avgPrice: number; count: number }[];
  propertyTypes: { name: string; value: number }[];
  priceTrends: { month: string; price: number }[];
  userProperties: { id: number; title: string; price: number; image: string; views: number; status: string }[];
  topAgents: { id: number; name: string; image: string; listings: number; rating: string }[];
  userName: string;
}) { 
  const [aiSector, setAiSector] = useState("Centru");
  const [aiSqm, setAiSqm] = useState(65);
  const [aiPrice, setAiPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `€${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `€${(val / 1000).toFixed(0)}k`;
    return `€${val}`;
  };

  const handlePredictPrice = () => {
    // Disabled in this iteration
  };

  return (
    <div className="font-sans text-slate-200 min-h-full pb-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif mb-1 tracking-tight text-white">Welcome back, {userName}</h1>
          <p className="text-slate-400">Here is what's happening with your properties and the market today.</p>
        </div>
        <div className="flex items-center gap-3 bg-[#1A1A18] p-2 rounded-full border border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[var(--theme-accent)]/20 flex items-center justify-center text-[var(--theme-accent)] shadow-[0_0_15px_var(--theme-accent)]/20">
            <Zap className="w-5 h-5" />
          </div>
          <div className="pr-4">
            <div className="text-sm font-bold text-white">{formatCurrency(marketStats.avgPrice)}</div>
            <div className="text-xs text-slate-500">Avg Market Price</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Main Column */}
        <div className="lg:col-span-8 flex flex-col gap-8 min-w-0">
          
          {/* Your Properties Overview */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Home className="w-5 h-5 text-[var(--theme-accent)]" /> Your Top Properties
              </h2>
              <button className="text-sm font-semibold text-[var(--theme-accent)] hover:text-white transition-colors">View All</button>
            </div>
            
            {userProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {userProperties.map(prop => (
                  <div key={prop.id} className="bg-[#1A1A18] rounded-3xl p-3 border border-slate-800 shadow-xl hover:-translate-y-1 hover:border-slate-700 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-all group cursor-pointer">
                    <div className="relative h-32 w-full rounded-2xl overflow-hidden mb-3">
                      <Image src={prop.image} alt={prop.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-white shadow-sm border border-white/10">
                        {prop.status}
                      </div>
                    </div>
                    <div className="px-1">
                      <h3 className="font-bold text-sm mb-1 truncate text-white" title={prop.title}>{prop.title}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-[var(--theme-accent)]">{formatCurrency(prop.price)}</span>
                        <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                          <Eye className="w-3.5 h-3.5" /> {prop.views}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#1A1A18] rounded-3xl p-8 border border-slate-800 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-[#27272a] rounded-full flex items-center justify-center mb-3">
                  <Home className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="font-bold text-lg mb-1 text-white">No properties yet</h3>
                <p className="text-slate-400 text-sm mb-4">You haven't listed any properties. Start earning today.</p>
                <button className="px-6 py-2.5 bg-[var(--theme-accent)] text-white rounded-full font-bold shadow-lg shadow-[var(--theme-accent)]/20 hover:opacity-90 transition-opacity">
                  Add Property
                </button>
              </div>
            )}
          </section>

          {/* Popular Sectors Cards */}
          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
              <MapIcon className="w-5 h-5 text-emerald-400" /> Popular Sectors
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {sectors.slice(0, 5).map((sector, idx) => (
                <div key={sector.name} className="relative overflow-hidden bg-[#1A1A18] rounded-3xl p-5 border border-slate-800 shadow-xl hover:shadow-[0_8px_30px_rgba(52,211,153,0.1)] hover:border-slate-700 transition-all">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/5 rounded-full blur-xl"></div>
                  <h3 className="text-base font-bold text-white mb-1 relative z-10">{sector.name}</h3>
                  <p className="text-xs font-semibold text-slate-500 mb-4 relative z-10">{sector.count} properties</p>
                  <div className="flex items-end justify-between relative z-10">
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-0.5">Avg. Price</span>
                      <span className="font-bold text-lg text-emerald-400">{formatCurrency(sector.avgPrice)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Price Trend Chart */}
          <section className="bg-[#1A1A18] p-6 rounded-3xl border border-slate-800 shadow-xl overflow-hidden min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-[var(--theme-accent)]" /> Market Price Trends
              </h2>
              <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                <TrendingUp className="w-4 h-4" /> Market is up
              </div>
            </div>
            <div className="h-64 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceTrends}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--theme-accent, #3b82f6)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--theme-accent, #3b82f6)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} tickFormatter={(val) => `€${val/1000}k`} />
                  <Tooltip 
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                    contentStyle={{ borderRadius: '16px', border: '1px solid #334155', backgroundColor: '#18181b', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)', padding: '12px', color: '#fff' }} 
                    formatter={(value: any) => [`€${Number(value).toLocaleString()}`, 'Avg Price']}
                  />
                  <Area type="monotone" dataKey="price" stroke="var(--theme-accent, #3b82f6)" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-4 flex flex-col gap-8 min-w-0">
          
          {/* AI Price Estimator */}
          <section className="bg-[#1A1A18] rounded-3xl p-6 relative overflow-hidden border border-slate-800 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-accent)]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 h-full">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#27272a] flex items-center justify-center text-slate-400 border border-slate-700">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg leading-tight">AI Estimator</h2>
                    <p className="text-slate-500 text-xs">Haven ML Engine</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#27272a] text-slate-400 px-2 py-1 rounded-lg border border-slate-700 whitespace-nowrap">Unavailable</span>
              </div>

              <div className="space-y-4 opacity-50 pointer-events-none">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Sector</label>
                  <select 
                    value={aiSector} 
                    onChange={(e) => setAiSector(e.target.value)}
                    disabled
                    className="w-full bg-[#111114] border border-slate-800 rounded-xl px-4 py-3 text-slate-400 text-sm appearance-none"
                  >
                    <option value="Botanica">Botanica</option>
                    <option value="Buiucani">Buiucani</option>
                    <option value="Centru">Centru</option>
                    <option value="Ciocana">Ciocana</option>
                    <option value="Rîșcani">Rîșcani</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex justify-between">
                    <span>Area (Sqm)</span>
                    <span className="text-slate-400">{aiSqm} m²</span>
                  </label>
                  <input 
                    type="range" 
                    min="20" max="300" 
                    value={aiSqm} 
                    onChange={(e) => setAiSqm(parseInt(e.target.value))}
                    disabled
                    className="w-full accent-slate-600"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    disabled
                    className="w-full py-3.5 bg-[#27272a] text-slate-500 rounded-xl font-bold flex items-center justify-center gap-2 border border-slate-700"
                  >
                    Predict Price
                  </button>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-slate-500">This feature is currently undergoing maintenance.</p>
              </div>
            </div>
          </section>

          {/* Top Agents */}
          <section className="bg-[#1A1A18] rounded-3xl p-6 border border-slate-800 shadow-xl">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-5 text-white">
              <Star className="w-5 h-5 text-amber-500" /> Top Agents
            </h2>
            <div className="space-y-4">
              {topAgents.map((agent, index) => (
                <div key={agent.id} className="flex items-center gap-4 group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-[#27272a] transition-colors">
                  <div className="relative font-bold text-slate-600 text-xl w-4 text-center group-hover:text-[var(--theme-accent)] transition-colors">
                    {index + 1}
                  </div>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-[var(--theme-accent)] transition-colors">
                    <Image src={agent.image} alt={agent.name} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-white truncate">{agent.name}</h3>
                    <p className="text-xs text-slate-400 font-semibold">{agent.listings} active listings</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-amber-500">{agent.rating}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 bg-[#27272a] hover:bg-slate-800 text-slate-300 rounded-xl text-sm font-bold transition-colors border border-slate-700">
              View All Agents
            </button>
          </section>

        </div>
      </div>
    </div>
  );
}
