export default function Layout({
  content,
  sidebar,
}: {
  content: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <aside className="w-[320px] border-r border-slate-800 bg-slate-950">{sidebar}</aside>
      <main className="flex-1 overflow-auto bg-slate-950 p-6">{content}</main>
    </div>
  );
}