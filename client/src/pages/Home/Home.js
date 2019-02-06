import React, { useState, useReducer, useEffect } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Header from 'Components/Header/Header';
import PlayerInfo from 'Components/PlayerInfo/PlayerInfo';

// const OBJECTS_QUERY = gql`
//     {
//         enemies {
//             name,
//             image,
//             description,
//             health,
//             damage,
//             speed
//         }
//         powerUps {
//             name,
//             description,
//             color,
//             effect
//         }
//     }
// `;

const OBJECTS_QUERY = '{enemies {name,image,description,health,damage,speed} powerUps {name,description,color,effect}}';

const initStatus = {
    health: 50,
    damage: 2,
    speed: 3,
    life: 3,
    hasShield: false,
    score: 0
}

function statusReducer(state, action) {
    switch (action.type) {
        case 'restart':
            return initStatus;
        case 'hurt':
            return {...state, health: state.health - action.payload};
        case 'attackUp':
            return {...state, damage: state.damage * 2};
        case 'speedUp':
            return {...state, speed: state.speed * 2};
        case 'addLife':
            return {...state, life: state.life + 1};
        case 'heal':
            return {...state, health: state.health + 25};
        case 'toggleShield':
            return {...state, hasShield: !state.hasShield};
        case 'score':
            return {...state, score: state.score + action.payload};
        default:
            return state;
    }
}

export default function () {
    const [start, setStart] = useState(false);
    const [status, statusDispatch] = useReducer(statusReducer, initStatus);

    useEffect(() => {
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: OBJECTS_QUERY })
        })
            .then(res => res.json())
            .then(data => console.log(data));
    },[])

    return (
        // <Query query={OBJECTS_QUERY}>
        // {
        //     ({ loading, error, data }) => {
        //         if (loading) return <h1>Loading...</h1>;
        //         if (error) console.log(error);

        //         console.log(data);
        //         return (
        //             <div className="home">
        //                 <Header title="The Game" />
        //                 <PlayerInfo {...status} />
        //                 <canvas id="gameCanvas">
        //                 </canvas>
        //                 <button className="start-button" onClick={() => setStart(true)}>Start</button>
        //             </div>
        //         )
        //     }
        // }
        // </Query>
        <div className="home">
            <Header title="The Game" />
            <PlayerInfo {...status} />
            <canvas id="gameCanvas">
            </canvas>
            <button className="start-button" onClick={() => setStart(true)}>Start</button>
        </div>
    )
}