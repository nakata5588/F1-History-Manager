import { useState } from "react";
import MainScreen from "./screens/MainScreen";
import NewGameScreen, { GameConfig } from "./screens/NewGameScreen";

type Screen =
  | { name: "main" }
  | { name: "new" }
  | { name: "continue" }
  | { name: "load" }
  | { name: "settings" }
  | { name: "game"; config: GameConfig };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "main" });

  if (screen.name === "main") {
    return (
      <MainScreen
        onSelect={(opt) => {
          if (opt === "new") setScreen({ name: "new" });
          else setScreen({ name: opt as Screen["name"] });
        }}
      />
    );
  }

  if (screen.name === "new") {
    return (
      <NewGameScreen
        onBack={() => setScreen({ name: "main" })}
        onStart={(config) => {
          // Aqui podes inicializar o estado do jogo, carregar DB, etc.
          setScreen({ name: "game", config });
        }}
      />
    );
  }

  if (screen.name === "game") {
    // Placeholder do jogo após Start
    return (
      <div className="min-h-screen text-white bg-black p-6">
        <img src="/logo.png" className="w-24 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Career Started — {screen.config.era}</h1>
        <p>
          Team: <b>{screen.config.teamId === "custom" ? screen.config.teamName : screen.config.teamId}</b> ·
          Difficulty: <b>{screen.config.difficulty}</b>
        </p>
        <button className="mt-6 underline" onClick={() => setScreen({ name: "main" })}>Back to Main</button>
      </div>
    );
  }

  if (screen.name === "continue") return <div className="h-screen bg-black text-white p-8">▶ Continue Game (WIP)</div>;
  if (screen.name === "load") return <div className="h-screen bg-black text-white p-8">📂 Load Game (WIP)</div>;
  if (screen.name === "settings") return <div className="h-screen bg-black text-white p-8">⚙ Settings (WIP)</div>;

  return null;
}
