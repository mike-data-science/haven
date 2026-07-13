import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { Calendar, MessageSquare } from "lucide-react";

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  
  // Fetch appointments and inquiries related to the user's properties as notifications
  const properties = await prisma.property.findMany({
    where: { userId: user.id },
    select: { id: true }
  });
  const propertyIds = properties.map(p => p.id);

  const appointments = await prisma.appointment.findMany({
    where: { propertyId: { in: propertyIds } },
    include: { property: true, user: true },
    orderBy: { createdAt: "desc" },
    take: 10
  });

  const inquiries = await prisma.inquiry.findMany({
    where: { propertyId: { in: propertyIds } },
    include: { property: true },
    orderBy: { createdAt: "desc" },
    take: 10
  });

  const notifications = [
    ...appointments.map(a => ({
      id: `app-${a.id}`,
      type: "appointment",
      title: `New Appointment Request`,
      message: `${a.user.name} requested a visit for ${a.property.title} on ${new Date(a.visitDate).toLocaleDateString()}`,
      date: a.createdAt,
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-50"
    })),
    ...inquiries.map(i => ({
      id: `inq-${i.id}`,
      type: "inquiry",
      title: `New Inquiry from ${i.name}`,
      message: `${i.message.substring(0, 50)}... regarding ${i.property.title}`,
      date: i.createdAt,
      icon: MessageSquare,
      color: "text-amber-600",
      bg: "bg-amber-50"
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-lg font-bold font-serif mb-[14px]">Notifications</h1>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-[27px] text-center text-slate-500">
            You have no new notifications.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map(notification => {
              const Icon = notification.icon;
              return (
                <div key={notification.id} className="p-[9px] flex gap-[9px] hover:bg-slate-50 transition-colors">
                  <div className={`p-[7px] rounded-full shrink-0 h-[27px] w-[27px] flex items-center justify-center ${notification.bg} ${notification.color}`}>
                    <Icon className="h-[11px] w-[11px]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{notification.title}</h4>
                    <p className="text-xs text-slate-600 mt-[2px]">{notification.message}</p>
                    <p className="text-xs text-slate-400 mt-[3px].5">{new Date(notification.date).toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
