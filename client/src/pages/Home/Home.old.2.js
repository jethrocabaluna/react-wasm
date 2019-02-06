import React, { useState, useReducer } from 'react';

import Header from 'Components/Header/Header';

// import wasmModule from 'Scripts/wasmModule';

// const cppExports = {};

// wasmModule
//     .then(instance => {
//         cppExports.getPrimes = instance.getPrimes;
//         cppExports.getPrimesWithThreads = instance.getPrimesWithThreads;

//         console.log(cppExports);
//     });

const sampleUser = {
    username: 'Guest',
    imageUrl: 'https://cvtsa.co.uk/sites/default/files/default_images/person-default.png'
};

export const UserContext = React.createContext([sampleUser, () => { }]);

function countReducer(state, action) {
    switch (action.type) {
        case 'reset':
            return {count: 0};
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return { count: state.count - 1 < 0 ? 0 : state.count - 1};
        default:
            return state;
    }
}

export default function () {
    const [theme, setTheme] = useState('light');
    const [user, setUser] = useState(sampleUser);

    const [state, dispatchCount] = useReducer(countReducer, 0, {type: 'reset'});

    const themeRef = React.createRef();

    function changeTheme(value) {
        setTheme(value);
    }

    function tryLogin(data) {
        setUser(data);
    }

    return (
        <UserContext.Provider value={[user, setUser]}>
            <div className={ `main home theme--${theme}` }>
                <select
                ref={themeRef}
                name="theme-select"
                id="theme-select"
                onChange={() => changeTheme(themeRef.current.value)}>
                    <option value="light">light</option>
                    <option value="dark">dark</option>
                    <option value="red">red</option>
                    <option value="blue">blue</option>
                </select>

                <button
                className="login"
                onClick={() => tryLogin(
                        {
                            username: 'jethrocabaluna',
                            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61qShHp6kaL._SX425_.jpg'
                        }
                    )
                }
                >
                    login
                </button>
                <Header title="Wasm React" />
                <button onClick={() => dispatchCount({type: 'increment'})}>+</button>
                <button onClick={() => dispatchCount({type: 'decrement'})}>-</button>
                <button onClick={() => dispatchCount({type: 'reset'})}>reset</button>
                <h1>{state.count}</h1>
            </div>
        </UserContext.Provider>
    )
}