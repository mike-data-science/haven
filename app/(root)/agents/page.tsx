import { Navbar } from '@/components/front/Navbar';
import { Footer } from '@/components/front/Footer';
import { ContactAgentButton } from '@/components/front/ContactAgentModal';
import prisma from '@/lib/db';
import { cache } from 'react';

export const revalidate = 300; // 5 minutes

const getAgents = cache(async () => {
  return prisma.user.findMany({
    where: { role: 'AGENT' }
  });
});

export default async function AgentsRoute() {
  const rawAgents = await getAgents();

  const agents = rawAgents.map(a => ({
    id: a.id,
    name: a.name,
    role: a.title || "Agent",
    phone: a.phone || "+373 68 000 000",
    deals: 0,
    image: a.avatarUrl || "https://placehold.co/100x100?text=Agent"
  }));

  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen">
      <Navbar />
      <section className="bg-[#EAF2FF]/50 py-[54px] min-h-[70vh]">
        <div className="max-w-[788px] mx-auto px-[14px] mt-[23px]">
          <div className="mb-[23px]">
            <p className="font-sans text-[8px] font-bold uppercase tracking-[1px] text-[#2B7FFF] mb-[7px]">Our Network</p>
            <h1 className="font-serif text-[clamp(32px,4vw,44px)] font-bold text-[#1A1A18] tracking-[-1px] leading-[1.1]">Meet our agents</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px]">
            {agents.map((a) => (
              <article key={a.id} className="bg-white rounded-[14px] p-[14px] text-center shadow-sm border border-[#E8E5DF] transition-transform duration-300 hover:-translate-y-1">
                {a.image ? (
                   <img src={a.image} alt={a.name} className="w-[54px] h-[54px] rounded-full object-cover mx-auto mb-[11px] border-4 border-white shadow-sm" />
                ) : (
                   <div className="w-[54px] h-[54px] rounded-full bg-slate-200 mx-auto mb-[11px] border-4 border-white shadow-sm flex items-center justify-center text-slate-500 font-bold">
                      {a.name?.charAt(0) || "A"}
                   </div>
                )}
                <h3 className="font-serif text-[11px] font-bold text-[#1A1A18] mb-[2px]">{a.name}</h3>
                <p className="font-sans text-[8px] text-[#6B7280] mb-[7px]">{a.role}</p>
                <p className="font-sans text-[8px] font-bold text-[#C49A3C] mb-[14px] bg-[#C49A3C]/10 inline-block px-[7px] py-[2px] rounded-full">{a.deals} deals closed</p>
                <div className="mt-[10px]">
                  <ContactAgentButton agent={a} />
                </div>
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
