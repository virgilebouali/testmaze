"use client"

import GameStart from "./components/GameStart";
import Discover from "./components/Discover";
import Move from "./components/Move";
export default function Home() {
  return (
    <div className="flex gap-4">
      <GameStart />
      <div>
        <Discover />
        <Move />
      </div>
    </div>
  );
}
