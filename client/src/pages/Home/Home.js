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

    let onMove = false;

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
        if (e.keyCode === 37 && !onMove) {
            onMove = true;
            canvasManager.handleMovement(playerName, 'left');
        } else if (e.keyCode === 39 && !onMove) {
            onMove = true;
            canvasManager.handleMovement(playerName, 'right');
        } else if (e.keyCode === 32) {
            canvasManager.shoot(playerName, statusDisplay.damage);
        }
    }

    function handleKeyUp(e) {
        if (e.keyCode === 37 || e.keyCode === 39) {
            onMove = false;
            canvasManager.handleMovement(playerName, 'stop');
        }
    }

    return (
        <div className="home">
            <Header title="The Game" />
            <PlayerInfo {...statusDisplay} />
            <div className="game-container">
                <Canvas onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
                {
                    canvasManager ? '' : <button className="start-button" onClick={startCanvasManager}>Start</button>
                }
                <div className="game-container__units">
                    <Player name={playerName} updateStatusDisplay={updateStatusDisplay} canvas={canvasManager} />
                    {
                        enemies.map((enemy, i) => {
                            return <Enemy key={`${enemy.name}-${i}`} canvas={canvasManager} {...enemy} name={`${enemy.name}-${i}`} />;
                        })
                    }
                    <Enemy key='enemy-1' canvas={canvasManager} health={5} damage={1} speed={1} name='enemy-1' />
                    <Enemy key='enemy-2' canvas={canvasManager} health={5} damage={1} speed={1} name='enemy-2' />
                    <Enemy key='enemy-3' canvas={canvasManager} health={5} damage={1} speed={1} name='enemy-3' />
                    <Enemy key='enemy-4' canvas={canvasManager} health={5} damage={1} speed={1} name='enemy-4' />
                    <Enemy key='enemy-5' canvas={canvasManager} health={5} damage={1} speed={1} name='enemy-5' />
                </div>
            </div>
        </div>
    )
}