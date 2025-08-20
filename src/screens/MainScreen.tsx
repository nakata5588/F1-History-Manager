import { Button } from "@/components/ui/button";

export default function MainScreen({ onSelect }: { onSelect: (option: string) => void }) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white relative">
      
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40" 
        style={{ backgroundImage: "url('/background.png')" }}
      />

      {/* Logo */}
      <div className="relative z-10 mb-12">
        <img src="/logo.png" alt="F1 History Manager" className="w-96 drop-shadow-2xl" />
      </div>

      {/* Menu buttons */}
      <div className="relative z-10 flex flex-col gap-6">
        <Button className="px-12 py-6 text-xl" onClick={() => onSelect("new")}>New Game</Button>
        <Button className="px-12 py-6 text-xl" onClick={() => onSelect("continue")}>Continue Game</Button>
        <Button className="px-12 py-6 text-xl" onClick={() => onSelect("load")}>Load Game</Button>
        <Button className="px-12 py-6 text-xl" onClick={() => onSelect("settings")}>Settings</Button>
        <Button className="px-12 py-6 text-xl bg-red-600 hover:bg-red-700" onClick={() => onSelect("exit")}>Exit</Button>
      </div>
    </div>
  );
}
