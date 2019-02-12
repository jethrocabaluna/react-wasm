import React from 'react';

export default function ({ onKeyDown }) {
    return <canvas id="game-canvas" tabIndex="1" onKeyDown={onKeyDown}></canvas>;
}

export const CanvasManager = function () {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const units = {};
    const bullets = {};
    const unitSize = 50;
    const bulletSize = 10;
    const bulletSpeed = 1;

    function displayUnit({name, speed, imageSource, x, y}) {
        const pos_x = x ? x : (Math.random() * (canvas.width - unitSize));
        const pos_y = y ? y : (Math.random() * (canvas.height / 2 - unitSize));

        if (imageSource) {
            const image = new Image();
            image.onload = function () {
                ctx.drawImage(image, pos_x, pos_y, unitSize, unitSize);
            }
            image.src = imageSource;
        } else {
            drawDefaultUnit(pos_x, pos_y);
        }

        units[name] = {
            x: pos_x,
            y: pos_y,
            speed
        }
    }

    function drawDefaultUnit(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, unitSize / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    function destroyUnit(name) {
        ctx.clearRect(units[name].x - unitSize / 2, units[name].y - unitSize / 2, size, size);

    }

    function moveUnit(name, direction) {
        destroyUnit(name);
        requestAnimationFrame(() => {
            let v = direction === 'right' ? units[name].speed : units[name].speed * -1;
            const new_x = units[name].x + v;
            drawDefaultUnit(new_x, units[name].y);
            units[name].x = new_x;
        });
    }

    function drawBullet(name, y) {
        ctx.beginPath();
        ctx.arc(bullets[name].x, y, bulletSize / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = 'yellow';
        ctx.fill();
    }

    function destroyBullet(name) {
        console.log(bullets[name]);
        const xStart = bullets[name].x - (bulletSize / 2);
        const yStart = bullets[name].y - (bulletSize / 2);
        ctx.clearRect(xStart, yStart, bulletSize, bulletSize);

    }

    function moveBullet(name) {
        destroyBullet(name);
        const new_y = bullets[name].y - bulletSpeed;
        bullets[name].y = new_y;
        requestAnimationFrame(() => {
            drawBullet(name, new_y);
        });
    }

    function shoot(name) {
        bullets[name] = {
            x: units[name].x,
            y: units[name].y - ((unitSize / 2) + (bulletSize / 2))
        };

        drawBullet(name);

        for (let i = 0; i < 100; i++) {
            moveBullet(name);
        }
    }

    return {
        displayUnit,
        destroyUnit,
        moveUnit,
        shoot
    }
}