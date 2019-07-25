import React, { useState, useEffect } from 'react';

import Living from 'Components/HOC/Living/Living';

export default React.memo(function ({ name, description, health, damage, speed, image, canvas }) {
    const enemy = Living(name, { health, damage, speed });
    const [onGame, setOnGame] = useState(false);
    console.log(enemy.status);

    function takeDamage(damage) {
        enemy.hurt(damage);
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
        setOnGame(true);
    }

    return (
        <div
        className={enemy.status.health <= 0 && enemy.status.life <= 0 ? "enemy unit" : "enemy unit alive"}>
            <img src={image ? `enemies/${image.filename}` : 'http://cdn.onlinewebfonts.com/svg/img_571231.png'} alt="enemy icon"/>
        </div>
    )
})