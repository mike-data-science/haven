import { Navbar } from '@/components/front/Navbar';
import { Footer } from '@/components/front/Footer';
import prisma from '@/lib/db';

export const revalidate = 0;

export default async function AgentsRoute() {
  const rawAgents = await prisma.user.findMany({
    where: { role: 'AGENT' }
  });

  const agents = rawAgents.map(a => ({
    id: a.id,
    name: a.name,
    role: a.title || "Agent",
    deals: 0,
    image: a.avatarUrl || "https://placehold.co/100x100?text=Agent"
  }));

  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen">
      <Navbar />
      <section className="bg-[#EAF2FF]/50 py-24 min-h-[70vh]">
        <div className="max-w-[1400px] mx-auto px-6 mt-10">
          <div className="mb-10">
            <p className="font-sans text-[13px] font-bold uppercase tracking-[1px] text-[#2B7FFF] mb-3">Our Network</p>
            <h1 className="font-serif text-[clamp(32px,4vw,44px)] font-bold text-[#1A1A18] tracking-[-1px] leading-[1.1]">Meet our agents</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((a) => (
              <article key={a.id} className="bg-white rounded-[24px] p-6 text-center shadow-sm border border-[#E8E5DF] transition-transform duration-300 hover:-translate-y-1">
                {a.image ? (
                   <img src={a.image} alt={a.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-5 border-4 border-white shadow-sm" />
                ) : (
                   <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto mb-5 border-4 border-white shadow-sm flex items-center justify-center text-slate-500 font-bold">
                      {a.name?.charAt(0) || "A"}
                   </div>
                )}
                <h3 className="font-serif text-[20px] font-bold text-[#1A1A18] mb-1">{a.name}</h3>
                <p className="font-sans text-[14px] text-[#6B7280] mb-3">{a.role}</p>
                <p className="font-sans text-[13px] font-bold text-[#C49A3C] mb-6 bg-[#C49A3C]/10 inline-block px-3 py-1 rounded-full">{a.deals} deals closed</p>
                <button className="w-full bg-transparent text-[#1A1A18] font-sans text-[15px] font-bold py-2.5 rounded-[10px] border border-[#E8E5DF] cursor-pointer transition-colors hover:border-[#1A1A18] hover:bg-[#1A1A18]/5">
                  Contact
                </button>
              </article>
            ))}
            {agents.length === 0 && (
              <p className="text-slate-600 col-span-full">No agents found.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
