"use client";

import Image from "next/image";
import { TrendingUp, Home, Eye, Star, Zap, ArrowRight, MapPin } from "lucide-react";
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

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `€${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `€${(val / 1000).toFixed(0)}k`;
    return `€${val}`;
  };

  return (
    <div className="font-sans text-slate-600 min-h-full pb-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      
      {/* HERO BENTO ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        
        {/* Welcome Card */}
        <div className="lg:col-span-2 relative overflow-hidden bg-white rounded-[32px] p-8 lg:p-10 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-center min-h-[220px]">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#1E65FF]/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <span className="text-[#1E65FF] font-sans font-bold text-[10px] tracking-widest uppercase mb-3 block">Dashboard Overview</span>
            <h1 className="text-[clamp(2rem,3vw,3rem)] font-bold font-serif mb-2 tracking-tight text-[#1A1A18] leading-[1.1]">
              Welcome back, {userName}.
            </h1>
            <p className="text-slate-500 font-medium text-base sm:text-lg max-w-lg">
              Here is what's happening with your properties and the market today.
            </p>
          </div>
        </div>

        {/* Highlight Stat */}
        <div className="relative overflow-hidden bg-[#1E65FF] rounded-[32px] p-8 lg:p-10 shadow-[0_20px_50px_rgba(30,101,255,0.25)] flex flex-col justify-between min-h-[220px] text-white">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1.5 rounded-xl backdrop-blur-md text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" /> +5.2%
            </div>
          </div>
          <div className="relative z-10 mt-auto">
            <div className="text-xs font-bold text-blue-100 uppercase tracking-widest mb-1">Avg Market Price</div>
            <div className="text-4xl lg:text-5xl font-bold tracking-tight">{formatCurrency(marketStats.avgPrice)}</div>
          </div>
        </div>
      </div>

      {/* MAIN BENTO ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col min-h-[420px]">
          <div className="flex items-center justify-between mb-8 shrink-0">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[#1A1A18] tracking-tight">Market Trajectory</h2>
              <p className="text-sm font-medium text-slate-500">6-month valuation trends across all sectors</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 text-xs font-bold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-[#1E65FF] animate-pulse"></span>
              Live Data
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-0 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E65FF" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#1E65FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} tickFormatter={(val) => `€${val/1000}k`} />
                <Tooltip 
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', backgroundColor: '#ffffff', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '12px 16px' }} 
                  itemStyle={{ color: '#1A1A18', fontWeight: 'bold', fontSize: '14px' }}
                  labelStyle={{ color: '#64748b', fontSize: '12px', marginBottom: '4px', fontWeight: '600' }}
                  formatter={(value: any) => [`€${Number(value).toLocaleString()}`, 'Average Price']}
                />
                <Area type="monotone" dataKey="price" stroke="#1E65FF" strokeWidth={4} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Agents Leaderboard */}
        <div className="bg-white rounded-[32px] p-8 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col min-h-[420px]">
          <div className="flex items-center justify-between mb-8 shrink-0">
            <h2 className="text-2xl font-bold font-serif text-[#1A1A18] tracking-tight">Top Agents</h2>
            <Star className="w-5 h-5 text-amber-400" />
          </div>
          
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-5">
              {[...topAgents].sort((a, b) => b.listings - a.listings).map((agent, index) => (
                <div key={agent.id} className="flex items-center gap-4 group cursor-pointer">
                  <div className="relative font-serif font-bold text-slate-300 text-2xl w-6 text-center group-hover:text-[#1E65FF] transition-colors">
                    {index + 1}
                  </div>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-[3px] border-slate-50 group-hover:border-blue-100 transition-colors shrink-0">
                    <Image src={agent.image} alt={agent.name} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-[#1A1A18] truncate group-hover:text-[#1E65FF] transition-colors">{agent.name}</h3>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{agent.listings} Listings</p>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-sm text-[#1A1A18]">
                    {agent.rating}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 shrink-0 py-3.5 bg-slate-50 hover:bg-slate-100 text-[#1A1A18] rounded-2xl text-xs font-bold tracking-wide uppercase transition-colors">
              View Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM BENTO ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Your Portfolio */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[#1A1A18] tracking-tight">Your Portfolio</h2>
              <p className="text-sm font-medium text-slate-500">Highest performing assets</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors group">
              <ArrowRight className="w-5 h-5 text-[#1E65FF] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          {userProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
              {userProperties.slice(0, 2).map(prop => (
                <div key={prop.id} className="group relative w-full h-[220px] rounded-[24px] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
                  <Image src={prop.image} alt={prop.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                  
                  {/* Premium Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/20 shadow-sm">
                    {prop.status}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-5">
                    <h3 className="font-bold text-lg text-white mb-1 truncate drop-shadow-sm">{prop.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xl text-white drop-shadow-md">{formatCurrency(prop.price)}</span>
                      <div className="flex items-center gap-1.5 text-white/80 text-xs font-bold bg-black/20 backdrop-blur-md px-2 py-1 rounded-md">
                        <Eye className="w-3.5 h-3.5" /> {prop.views}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 bg-slate-50 rounded-[24px] flex flex-col items-center justify-center border border-slate-100 text-center p-8">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
                  <Home className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="font-bold text-lg mb-1 text-[#1A1A18]">No properties yet</h3>
                <p className="text-slate-500 text-sm">List your first property to start tracking performance.</p>
            </div>
          )}
        </div>

        {/* Popular Sectors Pills */}
        <div className="bg-white rounded-[32px] p-8 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
           <h2 className="text-2xl font-bold font-serif text-[#1A1A18] tracking-tight mb-8">Popular Sectors</h2>
           <div className="flex flex-col gap-4 flex-1">
             {sectors.slice(0, 4).map((sector, idx) => (
               <div key={sector.name} className="flex items-center justify-between p-4 rounded-[20px] bg-slate-50 hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:border-[#E8E5DF] border border-transparent transition-all cursor-pointer group">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <MapPin className="w-4 h-4" />
                   </div>
                   <div>
                     <h3 className="font-bold text-[#1A1A18]">{sector.name}</h3>
                     <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{sector.count} Properties</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <span className="block font-bold text-[#1A1A18]">{formatCurrency(sector.avgPrice)}</span>
                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avg Price</span>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}
