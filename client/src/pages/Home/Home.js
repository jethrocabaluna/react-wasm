import React, { useState, useEffect } from 'react';

import Header from 'Components/Header/Header';
import PlayerInfo from 'Components/PlayerInfo/PlayerInfo';
import Player from 'Components/Player/Player';

const OBJECTS_QUERY = '{enemies {name,image,description,health,damage,speed} powerUps {name,description,color,effect}}';

export default function () {
    const [start, setStart] = useState(false);
    const [enemies, setEnemies] = useState([]);
    const [powerUps, setPowerUps] = useState([]);
    const [statusDisplay, setStatusDisplay] = useState({});

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
        // console.log(status);
        setStatusDisplay(status);
    }

    return (
        <div className="home">
            <Header title="The Game" />
            <PlayerInfo {...statusDisplay} />
            <Player name="Jethro" updateStatusDisplay={updateStatusDisplay} />
            <canvas id="gameCanvas">
            </canvas>
            <button className="start-button" onClick={() => setStart(true)}>Start</button>
        </div>
    )
}