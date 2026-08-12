import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Mail, Clock, User as UserIcon } from "lucide-react";

export const metadata = {
  title: 'Contact Messages | Admin Dashboard',
};

export default async function ContactMessagesPage() {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    redirect('/dashboard');
  }
  
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
          <Mail className="h-6 w-6 text-[var(--theme-accent)]" />
          Contact Form Submissions
        </h1>
        <p className="text-slate-500 text-sm">
          Messages sent from the public website contact form.
        </p>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Mail className="h-12 w-12 text-slate-200 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No messages yet</h3>
            <p className="text-slate-500 mt-1">When someone fills out the contact form, their message will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {messages.map(msg => (
              <div key={msg.id} className="p-5 sm:p-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <UserIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-slate-900 text-base">
                          {msg.firstName} {msg.lastName}
                        </h3>
                        <a href={`mailto:${msg.email}`} className="text-sm text-[var(--theme-accent)] hover:underline break-all">
                          {msg.email}
                        </a>
                      </div>
                      <div className="mt-3 bg-white border border-slate-100 rounded-xl p-4 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap shadow-sm">
                        {msg.message}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium shrink-0 sm:mt-1">
                    <Clock className="h-3.5 w-3.5" />
                    <time dateTime={msg.createdAt.toISOString()}>
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      }).format(new Date(msg.createdAt))}
                    </time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
