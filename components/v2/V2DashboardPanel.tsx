"use client";

import React from "react";
import { Settings2, TrendingUp, DollarSign, Activity, Clock, Percent, Home, BarChart } from "lucide-react";
export interface V2Stats {
  soldPercent?: number;
  pendingPercent?: number;
  totalApproved?: number;
  totalPending?: number;
  avgPrice?: number;
  avgPricePerSqm?: number;
  weeklyTrend?: { name: string; value: number }[];
}


interface V2DashboardPanelProps {
  stats: V2Stats | null;
}

export default function V2DashboardPanel({ stats }: V2DashboardPanelProps) {
  const soldPercent = stats?.soldPercent ?? 0;
  const pendingPercent = stats?.pendingPercent ?? 0;
  const totalApproved = stats?.totalApproved ?? 0;
  const avgPrice = stats?.avgPrice ?? 0;
  const avgPricePerSqm = stats?.avgPricePerSqm ?? 0;
  const weeklyTrend = stats?.weeklyTrend ?? [];
  const maxTrend = Math.max(...weeklyTrend.map((t) => t.value), 1);

  const formatPrice = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-5 shadow-2xl border border-white/50">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight mb-1">Market Analytics</h2>
            <p className="text-gray-500 text-xs">Real-time data from your property database.</p>
          </div>
          <button className="flex items-center gap-2 bg-[#E1F036] text-black px-4 py-2 rounded-full font-medium text-sm hover:bg-[#d4e329] transition-colors shadow-sm">
            <Settings2 size={16} />
            <span>Market Settings</span>
          </button>
        </div>

        {/* Top Cards Row */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* Card 1: Approval Rates */}
          <div className="bg-white rounded-[20px] p-3.5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#E1F036]/20 text-black flex items-center justify-center">
                  <Activity size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-xs">Approval Rates</h3>
                  <p className="text-[9px] text-gray-500">Live data</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-700 text-xs">...</button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="relative w-14 h-14">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="text-blue-500"
                    strokeDasharray={`${soldPercent}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </div>
              <div className="space-y-1.5 flex-1 ml-3">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600">Approved</span>
                  </div>
                  <span className="font-bold">{soldPercent}%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    <span className="text-gray-600">Pending</span>
                  </div>
                  <span className="font-bold">{pendingPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Weekly Listings */}
          <div className="bg-white rounded-[20px] p-3.5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#E1F036]/20 text-black flex items-center justify-center">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-xs">Weekly Listings</h3>
                  <p className="text-[9px] text-gray-500">Last 7 days</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-700 text-xs">...</button>
            </div>
            
            <div className="flex items-end justify-between h-14 mt-1 px-1">
              {weeklyTrend.map((day, i) => {
                const barHeight = maxTrend > 0 ? (day.value / maxTrend) * 36 : 0;
                return (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <span className="text-[8px] text-gray-400 font-medium">{day.value}</span>
                    <div className="w-2 bg-blue-100 rounded-full overflow-hidden" style={{ height: "36px" }}>
                      <div 
                        className={`w-full rounded-full ${day.value === Math.max(...weeklyTrend.map(t => t.value)) && day.value > 0 ? 'bg-[#E1F036]' : 'bg-blue-400'}`} 
                        style={{ height: `${barHeight}px`, marginTop: `${36 - barHeight}px` }}
                      ></div>
                    </div>
                    <span className="text-[7px] text-gray-400 font-medium mt-0.5">
                      {day.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 3: Active Listings */}
          <div className="bg-white rounded-[20px] p-3.5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#E1F036]/20 text-black flex items-center justify-center">
                  <Home size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-xs">Active Listings</h3>
                  <p className="text-[9px] text-gray-500">Total approved</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-700 text-xs">...</button>
            </div>
            
            <div className="flex flex-col items-center mt-1">
              <div className="text-xl font-bold text-gray-900">{totalApproved.toLocaleString()}</div>
              <div className="flex gap-0.5 mt-1.5">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`w-2 h-5 rounded-full ${i < Math.min(Math.ceil((totalApproved / Math.max(totalApproved, 100)) * 12), 12) ? 'bg-blue-400' : 'bg-gray-100'}`}></div>
                ))}
              </div>
              <span className="text-[9px] text-gray-500 font-medium mt-1.5">
                {totalApproved > 50 ? "Healthy Inventory" : totalApproved > 20 ? "Moderate" : "Low Inventory"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Small Cards Row */}
        <div className="grid grid-cols-5 gap-3">
          <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-gray-100 flex flex-col items-start justify-between h-20">
            <BarChart size={14} className="text-blue-500 mb-1.5" />
            <div>
              <p className="text-[9px] text-gray-500 mb-0.5">Market Demand</p>
              <p className="text-xs font-semibold text-gray-900">{totalApproved > 30 ? "Very High" : totalApproved > 15 ? "High" : "Moderate"}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-gray-100 flex flex-col items-start justify-between h-20">
            <DollarSign size={14} className="text-blue-500 mb-1.5" />
            <div>
              <p className="text-[9px] text-gray-500 mb-0.5">Average Price</p>
              <p className="text-xs font-semibold text-gray-900">{formatPrice(avgPrice)}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-gray-100 flex flex-col items-start justify-between h-20">
            <Activity size={14} className="text-blue-500 mb-1.5" />
            <div>
              <p className="text-[9px] text-gray-500 mb-0.5">Price / m²</p>
              <p className="text-xs font-semibold text-gray-900">{formatPrice(avgPricePerSqm)}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-gray-100 flex flex-col items-start justify-between h-20">
            <Clock size={14} className="text-blue-500 mb-1.5" />
            <div>
              <p className="text-[9px] text-gray-500 mb-0.5">Pending Review</p>
              <p className="text-xs font-semibold text-gray-900">{stats?.totalPending ?? 0} Props</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-gray-100 flex flex-col items-start justify-between h-20">
            <Percent size={14} className="text-blue-500 mb-1.5" />
            <div>
              <p className="text-[9px] text-gray-500 mb-0.5">Approval Rate</p>
              <p className="text-xs font-semibold text-gray-900">{soldPercent}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
