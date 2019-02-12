import React, { useState, useEffect } from 'react';

import Living from 'Components/HOC/Living/Living';
// import { CanvasManager } from 'Components/Canvas/Canvas';

// const cmgr = new CanvasManager();
// let canvasManager = null;

export default React.memo(function ({ name, description, health, damage, speed, image, canvas }) {
    const enemy = Living(name, { health, damage, speed });
    const [onGame, setOnGame] = useState(false);
    console.log(enemy.status);

    function takeDamage(damage) {
        enemy.hurt(damage);
    }

    if (enemy.status.health <= 0 && enemy.status.life <= 0) {
        canvas.destroyUnit(name);
    }

    if (canvas && !onGame) {
        canvas.displayUnit({
            name,
            speed,
            imageSource: `http://localhost:3000/enemies/${image.filename}`
        });
        setOnGame(true);
    }

    return (
        <button
        className="enemy"
        onClick={() => takeDamage(2)}>
            <span>{name}</span>
            <img src={`enemies/${image.filename}`} alt="enemy icon"/>
        </button>
    )
})