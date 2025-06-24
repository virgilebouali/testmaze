"use client"
import React, { useState } from 'react'

export default function Move() {
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [response, setResponse] = useState(null);

    const handleMove = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        const form = new FormData();
        form.append('position_x', x);
        form.append('position_y', y);

        const res = await fetch("https://hire-game-maze.pertimm.dev/virgile/move/", {
            method: 'POST',
            body: form,
        });
        const data = await res.json();
        setResponse(data);
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleMove} className='flex gap-4 mt-10'>
                <input
                    type="number"
                    placeholder="x"
                    value={x}
                    onChange={e => setX(e.target.value)}
                    name="position_x"
                />
                <input
                    type="number"
                    placeholder="y"
                    value={y}
                    onChange={e => setY(e.target.value)}
                    name="position_y"
                />
                <button type="submit" className='bg-blue-500 text-white p-2 rounded-md'>Move</button>
            </form>
            {response && <p className='w-[10%] mt-10'>{JSON.stringify(response, null, 2)}</p>}

        </div>
    )
}