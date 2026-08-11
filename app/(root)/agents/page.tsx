import { Navbar } from '@/components/front/Navbar';
import { Footer } from '@/components/front/Footer';
import AgentCard from '@/components/front/AgentCard';
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

  const agents = rawAgents.map((a: any) => ({
    id: a.id,
    name: a.name,
    role: a.title || "Agent",
    phone: a.phone || "+373 68 000 000",
    deals: 0,
    image: a.avatarUrl || "https://placehold.co/100x100?text=Agent",
    telegram: a.telegram || "haven_agent"
  }));

  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen">
      <Navbar />
      <section className="bg-[#EAF2FF]/50 py-[54px] min-h-[70vh]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 mt-[23px]">
          <div className="mb-12 text-center">
            <p className="font-sans text-sm font-bold uppercase tracking-[1px] text-[#2B7FFF] mb-3">Our Network</p>
            <h1 className="font-serif text-[clamp(32px,4vw,44px)] font-bold text-[#1A1A18] tracking-[-1px] leading-[1.1]">Meet our agents</h1>
          </div>

          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {agents.map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
            {agents.length === 0 && (
              <p className="text-slate-600 w-full text-center py-10">No agents found.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
