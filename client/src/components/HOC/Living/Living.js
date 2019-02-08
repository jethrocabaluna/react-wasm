import { useReducer } from 'react';

function statusReducer(state, action) {
    switch (action.type) {
        case 'restart':
            return initStatus;
        case 'hurt':
            return { ...state, health: state.health - action.payload };
        case 'attackUp':
            return { ...state, damage: state.damage * 2 };
        case 'speedUp':
            return { ...state, speed: state.speed * 2 };
        case 'addLife':
            return { ...state, life: state.life + 1 };
        case 'heal':
            return { ...state, health: state.health + 25 };
        case 'toggleShield':
            return { ...state, hasShield: !state.hasShield };
        case 'score':
            return { ...state, score: state.score + action.payload };
        default:
            return state;
    }
}

export default function (name, initStatus) {
    const [status, statusDispatch] = useReducer(statusReducer, initStatus);

    function destroy(name) {
        console.log(`killed a ${name}!`);
    }

    function hurt(damage) {
        statusDispatch({type: 'hurt', payload: damage});
        console.log(statusDispatch);
    }

    if (status.health <= 0) {
        destroy(name);
    }

    return {
        status,
        statusDispatch,
        hurt
    };
}