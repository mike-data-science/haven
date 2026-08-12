import { ThemeProvider } from "@/components/ThemeProvider";
import { getCurrentUser } from "@/lib/auth/session";
import { DashboardMobileMenu } from "./DashboardMobileMenu";

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
      <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-[#FAFAF8]">
        <DashboardMobileMenu sidebar={sidebar} />
        
        <aside className="hidden md:block w-[200px] shrink-0 border-r border-[#E8E5DF] bg-white z-20 overflow-y-auto shadow-[2px_0_15px_rgba(0,0,0,0.02)]">
          {sidebar}
        </aside>
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#FAFAF8] p-[14px] lg:p-[23px] min-w-0">{children}</main>
      </div>
    </ThemeProvider>
  );
}