"use client"
import React, { useState } from "react";

export default function GameStart() {
    const [playerName, setPlayerName] = useState("");
    const [responseData, setResponseData] = useState<any>(null);

    const sendStart = async (e?: React.FormEvent) => {
        e?.preventDefault();
        try {
            const form = new FormData();
            form.append('player', playerName);

            const response = await fetch("https://hire-game-maze.pertimm.dev/start-game/", {
                method: 'POST',
                body: form,
            });

            const data = await response.json();
            setResponseData(data);
        } catch (error) {
            console.error('Error : ', error);
        }
    };

    return (
        <div>
            <form onSubmit={sendStart}>
                <input 
                    type="text" 
                    name="player"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)} 

                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">go</button>
            </form>
            {responseData && (
                <p >Response: {JSON.stringify(responseData)}</p>
            )}
        </div>
    )
}