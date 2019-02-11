import React, { useState, useEffect } from 'react';
import Living from 'Components/HOC/Living/Living';

const initStatus = {
    health: 50,
    damage: 2,
    speed: 3,
    life: 3,
    hasShield: false,
    score: 0
}

export const PlayerStatusContext = React.createContext([initStatus, () => {}])

export default function ({ name, updateStatusDisplay }) {
    const player = Living(name, initStatus);

    useEffect(() => {
        updateStatusDisplay(player.status);
    });

    function takeDamage(damage) {
        player.hurt(damage);
    }

    return (
        <button
        id="player"
        onClick={() => takeDamage(1)}>
            Player
        </button>
    )
}