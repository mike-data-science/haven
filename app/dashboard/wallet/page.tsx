import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { Wallet, TrendingUp, Home } from "lucide-react";

function formatPrice(n: number) {
  return `$${n.toLocaleString()}`;
}

export default async function WalletPage() {
  const user = await getCurrentUser();
  
  const userProperties = await prisma.property.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: { price: true, title: true, createdAt: true, id: true }
  });

  const totalValue = userProperties.reduce((sum, p) => sum + p.price, 0);
  const avgValue = userProperties.length > 0 ? totalValue / userProperties.length : 0;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold font-serif mb-6">My Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-[var(--theme-accent)] rounded-xl">
            <Wallet className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Portfolio Value</p>
            <h2 className="text-2xl font-bold mt-1">{formatPrice(totalValue)}</h2>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Average Property Value</p>
            <h2 className="text-2xl font-bold mt-1">{formatPrice(avgValue)}</h2>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Home className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Owned Properties</p>
            <h2 className="text-2xl font-bold mt-1">{userProperties.length}</h2>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-lg">Portfolio Assets</h3>
        </div>
        <div className="p-6">
          {userProperties.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No assets in your portfolio yet.
            </div>
          ) : (
            <div className="space-y-4">
              {userProperties.map(p => (
                <div key={p.id} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                  <div>
                    <h4 className="font-medium text-slate-900">{p.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">Added {new Date(p.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="font-semibold">{formatPrice(p.price)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
