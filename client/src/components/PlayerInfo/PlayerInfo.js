import React from 'react';

export default function ({ health, damage, speed, life, score, level }) {
    return (
        <div className="player-info">
            <p className="player-info__status">Health: {health}</p>
            <p className="player-info__status">Damage: {damage}</p>
            <p className="player-info__status">Speed: {speed}</p>
            <p className="player-info__status">Life: {life}</p>
            <p className="player-info__status">Score: {score}</p>
            <span className="player-info__level">Level: {level}</span>
        </div>
    )
}