"use client";

import React, { useState, useEffect } from "react";
import { Search, Sun, Moon, BellRing, ChevronDown, Map, List, BarChart3, Users, Settings, Grid2x2, LogOut, User, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";

const navLinks = [
  { name: "Home", href: "/v2", icon: BarChart3 },
  { name: "Map View", href: "/v2/map", icon: Map },
  { name: "Listings", href: "/v2/listings", icon: List },
  { name: "Owners", href: "/v2/owners", icon: Users },
  { name: "Management", href: "#", icon: Settings },
];

export default function V2Navbar({ isDarkMode, setIsDarkMode }: { isDarkMode?: boolean, setIsDarkMode?: (val: boolean) => void }) {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();
  
  // Fallback to local state if props aren't provided (e.g. used on other pages)
  const [localIsDarkMode, setLocalIsDarkMode] = useState(false);
  const currentIsDarkMode = isDarkMode !== undefined ? isDarkMode : localIsDarkMode;
  const toggleDarkMode = () => {
    if (setIsDarkMode) setIsDarkMode(!currentIsDarkMode);
    else setLocalIsDarkMode(!currentIsDarkMode);
  };

  // States for icon functionalities
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showGridMenu, setShowGridMenu] = useState(false);
  
  // Real notifications state
  const [notifications, setNotifications] = useState<any[]>([]);
  const unreadCount = notifications.length;

  useEffect(() => {
    fetch("/api/v2/notifications")
      .then(res => res.json())
      .then(data => {
        if (data.notifications) {
          setNotifications(data.notifications);
        }
      })
      .catch(err => console.error("Failed to load notifications:", err));
  }, []);

  // Determine page title based on pathname
  let pageTitle = "Map View";
  if (pathname?.startsWith("/v2/listings")) pageTitle = "Listings";
  else if (pathname?.startsWith("/v2/owners")) pageTitle = "Owners";

  return (
    <>
      {/* =========================================
          DESKTOP NAVBAR (Hidden on mobile)
          ========================================= */}
      <div className="hidden lg:flex absolute top-6 left-0 right-0 z-[1000] justify-center px-6 pointer-events-none">
        <div className="flex items-center justify-between w-full max-w-[1400px]">
          {/* Logo */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-xl text-black shadow-sm">
              H
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-800">Haven</span>
          </div>

          {/* Center Nav */}
          <nav className="bg-[#111] p-1.5 rounded-[32px] flex items-center gap-1 pointer-events-auto shadow-xl border border-white/10">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.href === "/v2" ? pathname === "/v2" : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-[24px] text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? "bg-[#E1F036] text-black shadow-lg" 
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-black" : "text-gray-400"} />
                  <span className="hidden lg:inline">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Nav */}
          <div className="flex items-center gap-3 pointer-events-auto relative">
            <button className="w-11 h-11 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow-sm transition-colors border border-gray-200/50">
              <Search size={20} />
            </button>
            <button 
              onClick={toggleDarkMode}
              className="w-11 h-11 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow-sm transition-colors border border-gray-200/50"
            >
              {currentIsDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="w-11 h-11 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow-sm transition-colors border border-gray-200/50 relative"
              >
                <BellRing size={20} />
                {unreadCount > 0 && <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>}
              </button>
              
              {/* Desktop Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 font-semibold text-gray-800">Notifications</div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div className="p-4 text-sm text-gray-500 flex flex-col gap-3">
                        {notifications.map((notif) => (
                          <div key={notif.id} className="flex items-start gap-3">
                            <div className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <p><span className="font-semibold text-gray-800">{notif.title}</span><br/><span className="text-xs text-gray-400">{notif.description}</span></p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-sm text-center text-gray-400">No new notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-md pl-1.5 pr-4 py-1.5 rounded-full hover:bg-white shadow-sm transition-colors border border-gray-200/50"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                  <img src={user?.imageUrl || "https://i.pravatar.cc/150"} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-semibold text-gray-900 leading-tight">{user?.firstName || "Admin"}</span>
                  <span className="text-[10px] text-gray-500 max-w-[80px] truncate">{user?.primaryEmailAddress?.emailAddress || "Manager"}</span>
                </div>
                <ChevronDown size={14} className="text-gray-500 ml-1" />
              </button>

              {/* Desktop Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 py-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <User size={16} /> My Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <Settings size={16} /> Settings
                  </button>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button 
                    onClick={() => signOut(() => { window.location.href = "/"; })}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={16} /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          MOBILE TOP HEADER (Hidden on desktop)
          ========================================= */}
      <div className="lg:hidden absolute top-6 left-0 right-0 z-[1000] px-6 pointer-events-none flex flex-col gap-6">
        {/* Top Row: Sun/Settings, Avatar/Bell */}
        <div className="flex justify-between items-center w-full pointer-events-auto">
          <button 
            onClick={toggleDarkMode}
            className={`w-14 h-14 rounded-full shadow-sm flex items-center justify-center border transition-colors ${currentIsDarkMode ? 'bg-[#111] border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-700'}`}
          >
            {currentIsDarkMode ? <Moon size={26} /> : <Sun size={26} />}
          </button>
          <div className="flex items-center gap-3 relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
                setShowGridMenu(false);
              }}
              className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center relative border border-gray-100"
            >
              <BellRing size={26} className="text-gray-700"/>
              {unreadCount > 0 && <span className="absolute top-3 right-3 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></span>}
            </button>
            <button 
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
                setShowGridMenu(false);
              }}
              className="w-14 h-14 rounded-full overflow-hidden shadow-sm border border-gray-100 bg-white"
            >
              <img src={user?.imageUrl || "https://i.pravatar.cc/150"} alt="Profile" className="w-full h-full object-cover p-0.5 rounded-full" />
            </button>

            {/* Mobile Dropdowns for Right Side */}
            {(showNotifications || showProfileMenu) && (
              <div className="absolute top-16 right-0 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden z-[1001] animate-in fade-in slide-in-from-top-4">
                {showNotifications && (
                  <div className="flex flex-col">
                    <h3 className="font-bold text-gray-900 border-b border-gray-100 p-4 pb-2">Notifications</h3>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="p-4 pt-2 flex flex-col gap-3">
                          {notifications.map((notif) => (
                            <div key={notif.id} className="flex items-start gap-2 text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                              <div className="w-2 h-2 mt-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                              <p className="text-gray-900 font-medium leading-tight">
                                {notif.title}
                                <span className="block text-xs text-gray-500 mt-0.5 font-normal">{notif.description}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-6 text-sm text-center text-gray-400">No new notifications</div>
                      )}
                    </div>
                  </div>
                )}
                {showProfileMenu && (
                  <div className="p-2 flex flex-col">
                    <div className="p-3 border-b border-gray-100 mb-1">
                      <p className="font-bold text-gray-900">{user?.fullName || "Admin"}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.primaryEmailAddress?.emailAddress || "Manager"}</p>
                    </div>
                    <button className="flex items-center gap-3 p-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl">
                      <User size={18} /> My Profile
                    </button>
                    <button 
                      onClick={() => signOut(() => { window.location.href = "/"; })}
                      className="flex items-center gap-3 p-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom Row: Subtitle, Title, Grid Button */}
        <div className="flex justify-between items-end w-full pointer-events-auto relative">
          <div className="flex flex-col">
            <span className="text-gray-500 text-[15px] font-medium tracking-wide mb-1 transition-colors">Haven Workspace</span>
            <h1 className="text-[32px] font-bold text-gray-900 tracking-tight leading-none drop-shadow-sm">{pageTitle}</h1>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => {
                setShowGridMenu(!showGridMenu);
                setShowNotifications(false);
                setShowProfileMenu(false);
              }}
              className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${showGridMenu ? 'bg-[#E1F036] text-black' : 'bg-[#111] text-white'}`}
            >
              <Grid2x2 size={26} />
            </button>

            {/* Mobile Grid Menu Dropdown */}
            {showGridMenu && (
              <div className="absolute bottom-16 right-0 w-48 bg-[#111]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-[1001] animate-in fade-in slide-in-from-bottom-4">
                <div className="p-2 flex flex-col gap-1">
                  <Link 
                    href="/dashboard/properties/add" 
                    className="flex items-center gap-3 p-3 text-sm font-medium text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Plus size={18} /> Add Property
                  </Link>
                  <button className="flex items-center gap-3 p-3 text-sm font-medium text-white hover:bg-white/10 rounded-xl transition-colors">
                    <Search size={18} /> Search Area
                  </button>
                  <button className="flex items-center gap-3 p-3 text-sm font-medium text-white hover:bg-white/10 rounded-xl transition-colors">
                    <Settings size={18} /> Map Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================
          MOBILE BOTTOM NAV (Hidden on desktop)
          ========================================= */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto">
        <nav className="bg-black/40 backdrop-blur-xl p-1 rounded-full flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.25)] border border-white/20">

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.href === "/v2" ? pathname === "/v2" : pathname?.startsWith(link.href);
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`w-15 h-15 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#E1F036] text-black shadow-md' 
                    : 'bg-gray-100/50 text-white backdrop-blur-xl hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={24} className={isActive ? "fill-black/5" : ""} />
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  );
}
