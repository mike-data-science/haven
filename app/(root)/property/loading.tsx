export default function Loading() {
  return (
    <div className="flex h-[133.33vh] w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#E8E5DF] border-t-[#0B3D91]" />
        <p className="font-sans text-[#6B7280]">Loading property details...</p>
      </div>
    </div>
  );
}
