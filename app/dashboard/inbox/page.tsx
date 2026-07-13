import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

export default async function InboxPage() {
  const user = await getCurrentUser();
  
  const conversations = await prisma.conversation.findMany({
    where: { userId: user.id },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1
      },
      property: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <h1 className="text-lg font-bold font-serif mb-[14px] shrink-0">Inbox</h1>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-[2px]/3 border-r border-slate-200 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-[14px] text-center text-slate-500 text-xs">No messages yet.</div>
          ) : (
            conversations.map(conv => (
              <div key={conv.id} className="p-[9px] border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                <h3 className="font-semibold text-xs truncate">{conv.property?.title || "General Inquiry"}</h3>
                <p className="text-xs text-slate-500 truncate mt-[2px]">
                  {conv.messages[0]?.content || "No messages"}
                </p>
              </div>
            ))
          )}
        </div>
        {/* Main Content Area */}
        <div className="w-[3px].5/3 flex items-center justify-center bg-slate-50">
          <p className="text-slate-400">Select a conversation to view messages</p>
        </div>
      </div>
    </div>
  );
}
