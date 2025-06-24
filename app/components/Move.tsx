"use client"
import React, { useState } from 'react'

export default function Move() {
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [response, setResponse] = useState<any>(null);
    const [visited, setVisited] = useState<{x: number, y: number}[]>([]);

    const handleMove = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData();
        form.append('position_x', x);
        form.append('position_y', y);

        const res = await fetch("https://hire-game-maze.pertimm.dev/virgile1/move/", {
            method: 'POST',
            body: form,
        });
        const data = await res.json();
        setResponse(data);

        if (data.win === false) {
            const alreadyVisited = visited.some(pos => pos.x === data.position_x && pos.y === data.position_y);
            if (!alreadyVisited) {
                setVisited([...visited, { x: data.position_x, y: data.position_y }]);
            }
        }
    };

    return (
        <div className=''>
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
            {response && <p className=' mt-10'>{JSON.stringify(response, null, 2)}</p>}
            <div className='mt-4 flex flex-col gap-2 '>
                <p className='text-2xl font-bold text-red-500'>Positions déjà visitées :</p>
                <div>
                    {visited.map((pos, idx) => (
                        <span key={idx} className='text-xl font-bold text-red-500'>
                            ({pos.x}, {pos.y}){idx < visited.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}