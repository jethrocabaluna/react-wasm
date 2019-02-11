import React, { useState, useEffect } from 'react';
import Living from 'Components/HOC/Living/Living';

export default React.memo(function ({ name, description, health, damage, speed, image }) {
    const enemy = Living(name, { health, damage, speed });
    console.log(enemy.status);

    function takeDamage(damage) {
        enemy.hurt(damage);
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