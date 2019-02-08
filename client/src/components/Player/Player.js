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
    const [status, setStatus] = useState(initStatus);
    const playerStatus = Living(name, status);
    // console.log(status);
    // console.log(playerStatus.status);

    // useEffect(() => {
    //     updateStatusDisplay(status);
    // }, []);

    useEffect(() => {
        updateStatusDisplay(playerStatus.status);
    }, [status]);

    function takeDamage(damage) {
        playerStatus.hurt(damage);
        setStatus(playerStatus.status);
    }

    return (
        <button
        id="player"
        onClick={() => takeDamage(1)}>
            Player
        </button>
    )
}