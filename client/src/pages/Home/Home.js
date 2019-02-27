import React, { useState, useEffect } from 'react';

import Header from 'Components/Header/Header';
import PlayerInfo from 'Components/PlayerInfo/PlayerInfo';
import Canvas, { CanvasManager } from 'Components/Canvas/Canvas';
import Player from 'Components/Player/Player';
import Enemy from 'Components/Enemy/Enemy';

const OBJECTS_QUERY = '{enemies {name,image,description,health,damage,speed} powerUps {name,description,color,effect} levels {name,description,levelNumber,fascist,hitler,weakling}}';

const playerName = 'Jethro';

export default function () {
    const [start, setStart] = useState(false);
    const [enemies, setEnemies] = useState([]);
    const [powerUps, setPowerUps] = useState([]);
    const [levels, setLevels] = useState([]);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [statusDisplay, setStatusDisplay] = useState({});
    const [canvasManager, setCanvasManager] = useState(null);
    const [onMove, setOnMove] = useState(false);

    const levelManager = {
        finalLevel: levels.length - 1,
        nextLevel: (num) => setCurrentLevel(num)
    }

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
                setLevels(data.data.levels);
            });
    },[]);

    function updateStatusDisplay(status) {
        if (statusDisplay !== status) {
            setStatusDisplay(status);
        }
    }

    console.log('outside: ' + currentLevel);

    function displayEnemies() {
        if (levels.length && start && currentLevel < levels.length) {
            const enemyElements = [];
            enemies.map(enemy => {
                if (levels[currentLevel][enemy.name]) {
                    for (let i = 0; i < levels[currentLevel][enemy.name]; i++) {
                        enemyElements.push(<Enemy key={`${enemy.name}-${currentLevel}-${i}`} canvas={canvasManager} {...enemy} name={`${enemy.name}-${currentLevel}-${i}`} />);
                    }
                }
            })

            return enemyElements;
        }
    }

    function startCanvasManager() {
        setCanvasManager(new CanvasManager(playerName, levelManager));
        setStart(true);
    }

    function handleKeyDown(e) {
        if (e.keyCode === 37 && !onMove) {
            setOnMove(true);
            canvasManager.handleMovement(playerName, 'left');
        } else if (e.keyCode === 39 && !onMove) {
            setOnMove(true);
            canvasManager.handleMovement(playerName, 'right');
        } else if (e.keyCode === 32) {
            canvasManager.shoot(playerName, statusDisplay.damage);
        }
    }

    function handleKeyUp(e) {
        if (e.keyCode === 37 || e.keyCode === 39) {
            setOnMove(false);
            canvasManager.handleMovement(playerName, 'stop');
        }
    }

    return (
        <div className="home">
            <Header title="The Game" />
            <PlayerInfo {...statusDisplay} level={start ? currentLevel + 1 : '--'} />
            <div className="game-container">
                <Canvas onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
                {
                    canvasManager ? '' : <button className="start-button" onClick={startCanvasManager}>Start</button>
                }
                <div className="game-container__units">
                    <Player name={playerName} updateStatusDisplay={updateStatusDisplay} canvas={canvasManager} />
                    {
                        displayEnemies()
                    }
                </div>
            </div>
        </div>
    )
}