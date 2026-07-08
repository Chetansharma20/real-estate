export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B132B]">
      {/* Logo */}
      <div className="flex flex-col items-center leading-none mb-10 animate-pulse">
        <span
          className="font-serif text-3xl font-bold tracking-[0.25em] text-white"
          style={{ fontFamily: "Georgia, serif" }}
        >
          BRICKSAGE
        </span>
        <span className="text-[9px] tracking-[0.35em] text-[#D4AF37]/70 uppercase font-light mt-1">
          Properties Advisory Pvt. Ltd.
        </span>
      </div>

      {/* Animated gold bar */}
      <div className="w-40 h-px bg-white/10 relative overflow-hidden rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-[#D4AF37]"
          style={{
            animation: "loading-bar 1.4s ease-in-out infinite",
            width: "40%",
          }}
        />
      </div>

      <style>{`
        @keyframes loading-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}
