import React, { useState, useEffect } from 'react';
import Living from 'Components/HOC/Living/Living';

const initStatus = {
    health: 50,
    damage: 2,
    speed: 6,
    life: 3,
    hasShield: false,
    score: 0
}

export default function ({ name, updateStatusDisplay, canvas }) {
    const player = Living(name, initStatus);
    const [onGame, setOnGame] = useState(false);

    useEffect(() => {
        updateStatusDisplay(player.status);
    });

    function takeDamage(damage) {
        player.hurt(damage);
    }

    if (player.status.health <= 0 && player.status.life <= 0) {
        canvas.destroyUnit(name);
    }

    if (canvas && !onGame) {
        canvas.displayUnit({
            name,
            speed: player.status.speed,
            x: 375,
            y: 525
        });
        setOnGame(true);
    }

    return (
        <button
        id="player"
        onClick={() => takeDamage(1)}>
            Player
        </button>
    )
}