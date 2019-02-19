import React, { useState, useEffect } from 'react';

import Living from 'Components/HOC/Living/Living';
import { CanvasManager } from '../Canvas/Canvas';
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

    function startMoving() {
        let direction = Math.random() > 0.5 ? 'right' : 'left';
        canvas.handleMovement(name, direction);
    }

    if (enemy.status.health <= 0 && enemy.status.life <= 0) {
        canvas.removeUnit(name);
    }

    if (canvas && !onGame) {
        canvas.displayUnit({
            name,
            speed,
            imageSource: image ? `http://localhost:3000/enemies/${image.filename}` : 'http://cdn.onlinewebfonts.com/svg/img_571231.png',
            hurt: (damage) => takeDamage(damage),
            enemy: true,
            damage
        });
        startMoving();
        setOnGame(true);
    }

    return (
        <button
        className="enemy"
        onClick={() => takeDamage(2)}>
            <span>{name}</span>
            <img src={image ? `enemies/${image.filename}` : 'http://cdn.onlinewebfonts.com/svg/img_571231.png'} alt="enemy icon"/>
        </button>
    )
})