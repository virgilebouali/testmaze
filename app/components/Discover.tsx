"use client"
import React, { useState } from 'react'

export default function Discover() {
    const [data, setData] = useState<any[]>([]);

    const sendDiscover = async () => {
        const response = await fetch("https://hire-game-maze.pertimm.dev/virgile/discover/", {
            method: 'GET',
        });
        const res = await response.json();
        const arr = Array.isArray(res) ? res : res.data || [];
       
        setData(arr.filter((item: any) => item.move === true && (item.value != "trap" && item.value != "wall")));
        console.log(res)
    };

    return (
        <div>
            <button onClick={sendDiscover} className='bg-blue-500 text-white p-2 rounded-md'>Discover</button>
            <p className='flex'>
                {data && JSON.stringify(data, null, 2)}
            </p>
        </div>
    );
}