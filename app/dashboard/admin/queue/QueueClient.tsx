"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, XCircle, Clock, Eye, X, ShieldAlert, CheckSquare, Check } from "lucide-react";

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
      <div className="flex items-center gap-4 border-b border-slate-200 pb-2">
        {['PENDING', 'REJECTED', 'APPROVED TODAY', 'ARCHIVED'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No properties found in this queue.
          </div>
        )}
        
        {properties.map((prop) => (
          <div key={prop.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="relative h-48 bg-slate-100">
              {prop.images?.[0] ? (
                <Image src={prop.images[0].url} alt="Cover" fill className="object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
              )}
              <div className={`absolute top-3 left-3 px-2 py-1 text-white text-xs font-bold rounded-md flex items-center gap-1 shadow-sm ${
                prop.status === 'APPROVED' ? 'bg-green-500' :
                prop.status === 'REJECTED' ? 'bg-red-500' :
                'bg-amber-500'
              }`}>
                {prop.status === 'PENDING' && <Clock className="w-3 h-3" />}
                {prop.status}
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{prop.title}</h3>
              <p className="text-slate-500 text-sm mt-1">{prop.city} • {prop.category?.name || 'Uncategorized'}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-100 flex-1">
                <div className="text-xs text-slate-500 flex justify-between">
                  <span>Owner: <span className="font-semibold text-slate-700">{prop.user?.name}</span></span>
                  <span>Photos: <span className="font-semibold text-slate-700">{prop.images?.length || 0}</span></span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Submitted: {new Date(prop.submittedAt || prop.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <button 
                  onClick={() => setPreviewProp(prop)}
                  className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg flex justify-center items-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>
                {prop.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleApprove(prop.id)}
                      disabled={loadingId === prop.id}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg flex justify-center items-center transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setRejectProp(prop)}
                      disabled={loadingId === prop.id}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg flex justify-center items-center transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reject Modal */}
      {rejectProp && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-red-50">
              <h2 className="text-lg font-bold text-red-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" /> Reject Property
              </h2>
              <button onClick={() => setRejectProp(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleReject} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Reason Code</label>
                <select 
                  value={rejectionReason} 
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
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
                <label className="block text-sm font-semibold text-slate-700 mb-1">Admin Notes (Sent to owner)</label>
                <textarea 
                  value={adminNotes} 
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="E.g., Please upload ownership proof and exterior photos."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm h-24 resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setRejectProp(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loadingId === rejectProp.id}
                  className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50"
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
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 lg:p-10">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-full overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            {/* Left: Preview Details */}
            <div className="flex-1 overflow-y-auto p-8 border-r border-slate-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{previewProp.title}</h2>
                  <p className="text-slate-500 mt-1">{previewProp.address}, {previewProp.city}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">${previewProp.price?.toLocaleString()}</div>
                  <div className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-md inline-block mt-1 uppercase">
                    {previewProp.status}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {previewProp.images?.map((img: any, i: number) => (
                  <div key={img.id} className={`relative h-48 bg-slate-100 rounded-xl overflow-hidden ${i === 0 ? 'col-span-2 h-64' : ''}`}>
                    <Image src={img.url} alt="Photo" fill className="object-cover" />
                  </div>
                ))}
              </div>

              <div className="prose prose-sm max-w-none mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Description</h3>
                <p className="text-slate-600 whitespace-pre-wrap">{previewProp.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
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
            <div className="w-full md:w-80 bg-slate-50 p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900">Moderation</h3>
                <button onClick={() => setPreviewProp(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 shadow-sm">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Owner Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Name</span>
                    <span className="font-semibold text-slate-900">{previewProp.user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[140px]" title={previewProp.user?.email}>{previewProp.user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone</span>
                    <span className="font-semibold text-slate-900">{previewProp.user?.phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between pt-2 mt-2 border-t border-slate-100">
                    <span className="text-slate-500">Account Age</span>
                    <span className="font-semibold text-slate-900">
                      {Math.max(1, Math.floor((new Date().getTime() - new Date(previewProp.user?.createdAt || Date.now()).getTime()) / (1000 * 3600 * 24)))} days
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" /> Approval Checklist
                </h4>
                <div className="space-y-3">
                  {[
                    { id: 'photos', label: 'Adequate Photos' },
                    { id: 'price', label: 'Reasonable Price' },
                    { id: 'address', label: 'Valid Address & Location' },
                    { id: 'description', label: 'Detailed Description' },
                    { id: 'owner', label: 'Owner Verified / Not Spam' },
                  ].map((item) => (
                    <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input 
                          type="checkbox" 
                          className="peer sr-only"
                          checked={checklist[item.id as keyof typeof checklist]}
                          onChange={(e) => setChecklist(prev => ({ ...prev, [item.id]: e.target.checked }))}
                        />
                        <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-green-500 peer-checked:border-green-500 transition-colors"></div>
                        <Check className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 space-y-3">
                <button
                  onClick={() => handleApprove(previewProp.id)}
                  disabled={loadingId === previewProp.id || !allChecked}
                  className="w-full px-4 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center transition-colors"
                >
                  {loadingId === previewProp.id ? 'Approving...' : (allChecked ? 'Approve Property' : 'Complete Checklist')}
                </button>
                <button
                  onClick={() => { setRejectProp(previewProp); setPreviewProp(null); }}
                  className="w-full px-4 py-3 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 flex justify-center items-center transition-colors"
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
