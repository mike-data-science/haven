"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, XCircle, Clock, Eye, X, ShieldAlert, CheckSquare, Check, MapPin, BedDouble, Bath as BathIcon, Maximize2 } from "lucide-react";
import ImageCarousel from "@/components/front/ImageCarousel";
export default function QueueClient({ initialProperties, adminId }: { initialProperties: any[], adminId: number }) {
  const [properties, setProperties] = useState(initialProperties);
  const [activeTab, setActiveTab] = useState('PENDING');
  const [previewProp, setPreviewProp] = useState<any | null>(null);
  const [rejectProp, setRejectProp] = useState<any | null>(null);
  const [rejectionReason, setRejectionReason] = useState("Missing Photos");
  const [adminNotes, setAdminNotes] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [fetching, setFetching] = useState(false);

  // Minimal Approval Checklist state for the preview modal
  const [checklist, setChecklist] = useState({
    photos: false,
    price: false,
    address: false,
    description: false,
    owner: false,
  });

  const allChecked = Object.values(checklist).every(Boolean);

  // Fetch properties when tab changes
  useEffect(() => {
    if (activeTab === 'PENDING') {
      setProperties(initialProperties);
      return;
    }
    
    setFetching(true);
    const queryStatus = activeTab === 'APPROVED TODAY' ? 'APPROVED' : activeTab;
    fetch(`/api/admin/properties/queue?status=${queryStatus}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setProperties(data);
        }
      })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, [activeTab, initialProperties]);

  const handleApprove = async (id: number) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/properties/${id}/approve`, { method: "POST" });
      if (res.ok) {
        setProperties(prev => prev.filter(p => p.id !== id));
        setPreviewProp(null);
      }
    } catch (e) {
      console.error(e);
    }
    setLoadingId(null);
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectProp) return;
    setLoadingId(rejectProp.id);
    
    try {
      const res = await fetch(`/api/admin/properties/${rejectProp.id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rejectionReason, adminNotes })
      });
      if (res.ok) {
        setProperties(prev => prev.filter(p => p.id !== rejectProp.id));
        setRejectProp(null);
        setRejectionReason("Missing Photos");
        setAdminNotes("");
      }
    } catch (e) {
      console.error(e);
    }
    setLoadingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-[9px] border-b border-slate-200 pb-[3px].5">
        {['PENDING', 'REJECTED', 'APPROVED TODAY', 'ARCHIVED'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-[9px] py-[3px].5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === tab 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
        {properties.length === 0 && (
          <div className="col-span-full py-[27px] text-center text-slate-500">
            No properties found in this queue.
          </div>
        )}
        
        {properties.map((prop) => {
          const streetAddress = prop.address ? prop.address.split(',')[0].trim() : "No street address provided";
          
          return (
          <div key={prop.id} className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-[#E8E5DF] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300">
            <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
              <ImageCarousel 
                images={prop.images?.length > 0 ? prop.images.map((i: any) => i.url) : []} 
                alt={prop.title} 
              />
              <div className={`absolute top-3 right-3 px-2 py-1 text-white text-[11px] font-bold rounded-md flex items-center gap-1 shadow-sm z-30 ${
                prop.status === 'APPROVED' ? 'bg-green-500' :
                prop.status === 'REJECTED' ? 'bg-red-500' :
                'bg-amber-500'
              }`}>
                {prop.status === 'PENDING' && <Clock className="w-3 h-3" />}
                {prop.status === 'APPROVED' && <CheckCircle2 className="w-3 h-3" />}
                {prop.status === 'REJECTED' && <XCircle className="w-3 h-3" />}
                {prop.status}
              </div>
              
              {/* Location Badge (Sector) */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#1A1A18] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 z-30">
                <MapPin className="w-3 h-3 text-[#0B3D91]" />
                <span className="truncate max-w-[150px]">{prop.city ? prop.city.split(',')[0].trim() : "Centru"}</span>
              </div>
            </div>
            
            <div className="p-4 flex flex-col gap-2.5 bg-white min-w-0 flex-grow justify-between">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-xl font-bold text-[#1A1A18]">
                    ${(prop.price / 1000).toFixed(0)}k
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase truncate ml-2">
                    {prop.category?.name || "Residential"}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#1A1A18] leading-snug overflow-hidden whitespace-nowrap max-w-[80%] m-0">
                  {prop.title}
                </h3>
                <p className="font-sans text-xs text-slate-500 m-0 overflow-hidden whitespace-nowrap">
                  {streetAddress}
                </p>
              </div>

              {/* Specs Row */}
              <div className="flex items-center gap-4 pt-2 border-t border-[#E8E5DF] text-xs font-semibold text-slate-600 mt-2">
                <div className="flex items-center gap-1">
                  <BedDouble className="w-3.5 h-3.5 text-[#0B3D91]" />
                  <span>{prop.rooms} r.</span>
                </div>
                <div className="flex items-center gap-1">
                  <BathIcon className="w-3.5 h-3.5 text-[#0B3D91]" />
                  <span>{prop.bathrooms} ba.</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-[#0B3D91]" />
                  <span>{prop.area?.toLocaleString()} m²</span>
                </div>
              </div>
              
              <div className="mt-2 pt-2 border-t border-slate-100 flex-1">
                <div className="text-xs text-slate-500 flex justify-between">
                  <span>Owner: <span className="font-semibold text-slate-700">{prop.user?.name}</span></span>
                  <span>Photos: <span className="font-semibold text-slate-700">{prop.images?.length || 0}</span></span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Submitted: {new Date(prop.submittedAt || prop.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button 
                  onClick={() => setPreviewProp(prop)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex justify-center items-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>
                {prop.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleApprove(prop.id)}
                      disabled={loadingId === prop.id}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg flex justify-center items-center transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setRejectProp(prop)}
                      disabled={loadingId === prop.id}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex justify-center items-center transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )})}
      </div>

      {/* Reject Modal */}
      {rejectProp && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-[9px]">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-[14px] py-[9px] border-b border-slate-100 flex justify-between items-center bg-red-50">
              <h2 className="text-sm font-bold text-red-900 flex items-center gap-[3px].5">
                <ShieldAlert className="w-[11px] h-[11px] text-red-600" /> Reject Property
              </h2>
              <button onClick={() => setRejectProp(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-[11px] h-[11px]" />
              </button>
            </div>
            
            <form onSubmit={handleReject} className="p-[14px] space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-[2px]">Reason Code</label>
                <select 
                  value={rejectionReason} 
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-[7px] py-[3px].5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                >
                  <option>Missing Photos</option>
                  <option>Incorrect Information</option>
                  <option>Duplicate Listing</option>
                  <option>Invalid Location</option>
                  <option>Spam</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-[2px]">Admin Notes (Sent to owner)</label>
                <textarea 
                  value={adminNotes} 
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="E.g., Please upload ownership proof and exterior photos."
                  className="w-full px-[7px] py-[3px].5 border border-slate-300 rounded-lg text-xs h-[54px] resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  required
                />
              </div>

              <div className="flex gap-[7px] pt-[3px].5">
                <button 
                  type="button" 
                  onClick={() => setRejectProp(null)}
                  className="flex-1 px-[9px] py-[3px].5 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loadingId === rejectProp.id}
                  className="flex-1 px-[9px] py-[3px].5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {loadingId === rejectProp.id ? 'Rejecting...' : 'Confirm Rejection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal with Checklist */}
      {previewProp && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-[9px] lg:p-[23px]">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-full overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            {/* Left: Preview Details */}
            <div className="flex-1 overflow-y-auto p-[18px] border-r border-slate-200">
              <div className="flex justify-between items-start mb-[14px]">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{previewProp.title}</h2>
                  <p className="text-slate-500 mt-[2px]">{previewProp.address}, {previewProp.city}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900">${previewProp.price?.toLocaleString()}</div>
                  <div className="px-[3px].5 py-[2px] bg-amber-100 text-amber-700 text-xs font-bold rounded-md inline-block mt-[2px] uppercase">
                    {previewProp.status}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[9px] mb-[18px]">
                {previewProp.images?.map((img: any, i: number) => (
                  <div key={img.id} className={`relative h-[108px] bg-slate-100 rounded-xl overflow-hidden ${i === 0 ? 'col-span-2 h-36' : ''}`}>
                    <Image src={img.url} alt="Photo" fill className="object-cover" />
                  </div>
                ))}
              </div>

              <div className="prose prose-sm max-w-none mb-[18px]">
                <h3 className="text-sm font-bold text-slate-900 mb-[3px].5">Description</h3>
                <p className="text-slate-600 whitespace-pre-wrap">{previewProp.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-[9px] mb-[18px] bg-slate-50 p-[9px] rounded-xl border border-slate-100">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">Rooms</div>
                  <div className="font-bold text-slate-900">{previewProp.rooms}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">Baths</div>
                  <div className="font-bold text-slate-900">{previewProp.bathrooms}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">Area</div>
                  <div className="font-bold text-slate-900">{previewProp.area} sqft</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">Year</div>
                  <div className="font-bold text-slate-900">{previewProp.yearBuilt}</div>
                </div>
              </div>
            </div>

            {/* Right: Moderation Panel */}
            <div className="w-full md:w-[180px] bg-slate-50 p-[14px] flex flex-col">
              <div className="flex justify-between items-center mb-[14px]">
                <h3 className="font-bold text-slate-900">Moderation</h3>
                <button onClick={() => setPreviewProp(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-[14px] h-[14px]" />
                </button>
              </div>

              <div className="bg-white p-[9px] rounded-xl border border-slate-200 mb-[14px] shadow-sm">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-[7px]">Owner Details</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Name</span>
                    <span className="font-semibold text-slate-900">{previewProp.user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[79px]" title={previewProp.user?.email}>{previewProp.user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone</span>
                    <span className="font-semibold text-slate-900">{previewProp.user?.phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between pt-[3px].5 mt-[3px].5 border-t border-slate-100">
                    <span className="text-slate-500">Account Age</span>
                    <span className="font-semibold text-slate-900">
                      {Math.max(1, Math.floor((new Date().getTime() - new Date(previewProp.user?.createdAt || Date.now()).getTime()) / (1000 * 3600 * 24)))} days
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-[7px] flex items-center gap-[3px].5">
                  <CheckSquare className="w-[9px] h-[9px]" /> Approval Checklist
                </h4>
                <div className="space-y-3">
                  {[
                    { id: 'photos', label: 'Adequate Photos' },
                    { id: 'price', label: 'Reasonable Price' },
                    { id: 'address', label: 'Valid Address & Location' },
                    { id: 'description', label: 'Detailed Description' },
                    { id: 'owner', label: 'Owner Verified / Not Spam' },
                  ].map((item) => (
                    <label key={item.id} className="flex items-start gap-[7px] cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-[0px].5">
                        <input 
                          type="checkbox" 
                          className="peer sr-only"
                          checked={checklist[item.id as keyof typeof checklist]}
                          onChange={(e) => setChecklist(prev => ({ ...prev, [item.id]: e.target.checked }))}
                        />
                        <div className="w-[11px] h-[11px] border-2 border-slate-300 rounded peer-checked:bg-green-500 peer-checked:border-green-500 transition-colors"></div>
                        <Check className="w-[7px].5 h-[7px].5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                      </div>
                      <span className="text-xs text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-[14px] mt-[14px] border-t border-slate-200 space-y-3">
                <button
                  onClick={() => handleApprove(previewProp.id)}
                  disabled={loadingId === previewProp.id || !allChecked}
                  className="w-full px-[9px] py-[7px] bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center transition-colors"
                >
                  {loadingId === previewProp.id ? 'Approving...' : (allChecked ? 'Approve Property' : 'Complete Checklist')}
                </button>
                <button
                  onClick={() => { setRejectProp(previewProp); setPreviewProp(null); }}
                  className="w-full px-[9px] py-[7px] bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 flex justify-center items-center transition-colors"
                >
                  Reject...
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
