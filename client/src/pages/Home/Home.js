import React, { useState, useEffect } from 'react';

import Header from 'Components/Header/Header';
import PlayerInfo from 'Components/PlayerInfo/PlayerInfo';
import Canvas, { CanvasManager } from 'Components/Canvas/Canvas';
import Player from 'Components/Player/Player';
import Enemy from 'Components/Enemy/Enemy';

const OBJECTS_QUERY = '{enemies {name,image,description,health,damage,speed} powerUps {name,description,color,effect}}';

const playerName = 'Jethro';

export default function () {
    const [start, setStart] = useState(false);
    const [enemies, setEnemies] = useState([]);
    const [powerUps, setPowerUps] = useState([]);
    const [statusDisplay, setStatusDisplay] = useState({});
    const [canvasManager, setCanvasManager] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: OBJECTS_QUERY })
        })
            .then(res => res.json())
            .then(data => {
                setEnemies(data.data.enemies);
                setPowerUps(data.data.powerUps);
                console.log(data.data);
            });
    },[]);

    function updateStatusDisplay(status) {
        if (statusDisplay !== status) {
            setStatusDisplay(status);
        }
    }

    function startCanvasManager() {
        setCanvasManager(new CanvasManager());
    }

    function handleKeyDown(e) {
        if (e.keyCode === 37) {
            canvasManager.moveUnit(playerName, 'left');
        } else if (e.keyCode === 39) {
            canvasManager.moveUnit(playerName, 'right');
        } else if (e.keyCode === 32) {
            canvasManager.shoot(playerName);
        }
    }

    return (
        <div className="home">
            <Header title="The Game" />
            <PlayerInfo {...statusDisplay} />
            <Canvas onKeyDown={handleKeyDown} />
            <Player name={playerName} updateStatusDisplay={updateStatusDisplay} canvas={canvasManager} />
            {
                enemies.map((enemy, i) => {
                    return <Enemy key={`${enemy.name}-${i}`} canvas={canvasManager} {...enemy} name={`${enemy.name}-${i}`} />;
        })
    }
            {
                canvasManager ? '' : <button className="start-button" onClick={startCanvasManager}>Start</button>
            }
        </div>
    )
}