export default function Layout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <aside className="w-[180px] border-r border-slate-800 bg-slate-950">{sidebar}</aside>
      <main className="flex-1 overflow-auto bg-slate-950 p-[14px]">{children}</main>
    </div>
  );
}