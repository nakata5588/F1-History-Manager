import { ReactNode } from "react";

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen relative text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/background.png')" }}
      />
      {/* Overlay suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

      {/* Conteúdo */}
      <div className="relative z-10 h-full w-full overflow-auto px-6 py-6">
        {children}
      </div>
    </div>
  );
}
