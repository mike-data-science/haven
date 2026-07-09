import { ThemeProvider } from "@/components/ThemeProvider";
import { getCurrentUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  let initialColor = "#2563eb"; // default blue
  try {
    const user = await getCurrentUser();
    if (user.themeColor && user.themeColor !== "blue") {
      initialColor = user.themeColor;
    }
  } catch (error) {
    console.error("Failed to fetch user for theme color:", error);
  }

  return (
    <ThemeProvider initialColor={initialColor}>
      <div className="flex h-[133.33vh] overflow-hidden bg-slate-50">
        <aside className="w-[280px] shrink-0 border-r border-slate-800 bg-[#18181b] z-20">
          {sidebar}
        </aside>
        <main className="flex-1 overflow-auto bg-slate-50 p-6 lg:p-10">{children}</main>
      </div>
    </ThemeProvider>
  );
}