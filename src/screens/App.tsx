import { useState } from "react";
import MainScreen from "./screens/MainScreen";

function App() {
  const [screen, setScreen] = useState("main");

  if (screen === "main") {
    return <MainScreen onSelect={(option) => setScreen(option)} />;
  }

  // depois defines os outros ecrãs
  if (screen === "new") return <div>🚀 New Game</div>;
  if (screen === "continue") return <div>▶ Continue Game</div>;
  if (screen === "load") return <div>📂 Load Game</div>;
  if (screen === "settings") return <div>⚙ Settings</div>;
  if (screen === "exit") return <div>👋 Exit</div>;

  return null;
}

export default App;
