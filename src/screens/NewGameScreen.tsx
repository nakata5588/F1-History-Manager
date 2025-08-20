import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type Difficulty = "Easy" | "Normal" | "Hard";

export type GameConfig = {
  era: number;          // 1980 por agora
  teamId: string;       // id da equipa escolhida (ou "custom")
  teamName?: string;    // só se for Custom
  difficulty: Difficulty;
};

// ⚠️ Muda esta lista quando tiveres a tua DB carregada
const TEAMS_1980 = [
  { id: "williams", name: "Williams" },
  { id: "brabham", name: "Brabham" },
  { id: "lotus", name: "Lotus" },
  { id: "mclaren", name: "McLaren" },
  { id: "ferrari", name: "Ferrari" },
  { id: "ligier", name: "Ligier" },
  { id: "renault", name: "Renault" },
  { id: "tyrrell", name: "Tyrrell" },
  { id: "alfaromeo", name: "Alfa Romeo" },
].sort((a,b)=>a.name.localeCompare(b.name));

export default function NewGameScreen({
  onStart,
  onBack,
}: {
  onStart: (config: GameConfig) => void;
  onBack: () => void;
}) {
  const [era] = useState<number>(1980);                 // por agora só 1980
  const [teamId, setTeamId] = useState<string>("");
  const [customTeamName, setCustomTeamName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<Difficulty>("Normal");

  const isCustom = teamId === "custom";

  const isValid = useMemo(() => {
    if (!teamId) return false;
    if (isCustom && customTeamName.trim().length < 3) return false;
    return true;
  }, [teamId, isCustom, customTeamName]);

  const handleStart = () => {
    const config: GameConfig = {
      era,
      teamId: isCustom ? "custom" : teamId,
      teamName: isCustom ? customTeamName.trim() : undefined,
      difficulty,
    };
    onStart(config);
  };

  return (
    <div className="h-screen w-screen relative text-white">
      {/* bg */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/background.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

      {/* content */}
      <div className="relative z-10 max-w-3xl mx-auto pt-16 pb-10 px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="F1 History Manager" className="w-24 h-24 object-contain" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">New Game</h1>
              <p className="text-sm text-gray-300">Set up your new career</p>
            </div>
          </div>
          <Button variant="secondary" onClick={onBack}>← Back</Button>
        </div>

        {/* Card */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10">
          {/* ERA */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Choose Era</h2>
            <div className="flex items-center gap-3">
              <select
                value={era}
                disabled
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white disabled:opacity-70"
                onChange={() => {}}
              >
                <option value={1980}>1980s (starting at 1980)</option>
              </select>
              <span className="text-xs text-gray-300">Mais eras virão depois 😉</span>
            </div>
          </section>

          {/* TEAM */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Choose Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
              >
                <option value="" disabled>— Select a team —</option>
                {TEAMS_1980.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
                <option value="custom">➕ Create new team…</option>
              </select>

              {isCustom && (
                <input
                  autoFocus
                  placeholder="New team name"
                  value={customTeamName}
                  onChange={(e) => setCustomTeamName(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-gray-400"
                />
              )}
            </div>
            {isCustom && (
              <p className="mt-2 text-xs text-gray-300">
                Podes definir mais detalhes da equipa (cores, budget, sponsors) depois.
              </p>
            )}
          </section>

          {/* DIFFICULTY */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Choose Difficulty</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(["Easy","Normal","Hard"] as Difficulty[]).map(level => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`rounded-xl border px-4 py-3 text-left transition
                    ${difficulty === level ? "border-red-500 bg-red-600/20" : "border-white/20 bg-white/5 hover:bg-white/10"}`}
                >
                  <div className="font-semibold">{level}</div>
                  <div className="text-xs text-gray-300">
                    {level === "Easy" && "Mais orçamento, IA mais permissiva"}
                    {level === "Normal" && "Equilíbrio recomendado"}
                    {level === "Hard" && "Orçamentos apertados e IA mais agressiva"}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between">
            <Button variant="secondary" onClick={onBack}>← Back</Button>
            <Button
              className="px-10 py-6 text-lg"
              disabled={!isValid}
              onClick={handleStart}
              title={!isValid ? "Escolhe uma equipa (ou dá nome à tua)" : "Start Game"}
            >
              Start Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
