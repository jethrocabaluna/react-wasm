import React from 'react';

export default function ({ onKeyDown, onKeyUp }) {
    return <canvas id="game-canvas" tabIndex="1" onKeyDown={onKeyDown} onKeyUp={onKeyUp}></canvas>;
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
    const bulletSpeed = 10;
    const bulletHitGap = 5;

    function displayUnit({name, speed, imageSource, x, y, hurt, enemy, damage}) {
        if (!imageSource) return;

        const {pos_x, pos_y} = getPosition({x, y});

        const image = new Image();
        image.onload = function () {
            ctx.drawImage(image, pos_x, pos_y, unitSize, unitSize);
        }
        image.src = imageSource;

        units[name] = {
            image,
            x: pos_x,
            y: pos_y,
            speed,
            hurt,
            damage
        }

        if (enemy) {
            units[name].isEnemy = enemy;
        }
    }

    function getPosition({x, y}) {
        let pos_x = x ? x : (Math.random() * (canvas.width - unitSize));
        let pos_y = y ? y : (Math.random() * (canvas.height / 2 - unitSize));

        for (let name in units) {
            if (Math.sqrt(Math.pow((pos_x - units[name].x), 2) + Math.pow((pos_y - units[name].y), 2)) <= Math.sqrt(Math.pow(unitSize, 2) * 2)) {
                return getPosition({x, y});
            }
        }

        return { pos_x, pos_y };
    }

    function drawUnit(name) {
        ctx.drawImage(units[name].image, units[name].x, units[name].y, unitSize, unitSize);
    }

    function removeUnit(name) {
        destroyUnit(name);
        cancelAnimationFrame(units[name].unitMovementId);
        units[name].unitMovementId = null;
    }

    function destroyUnit(name) {
        ctx.clearRect(units[name].x, units[name].y, unitSize, unitSize);
    }

    function handleMovement(name, direction) {
        units[name].unitMovementId = requestAnimationFrame(() => moveUnit(name, direction));
    }

    function moveUnit(name, direction) {
        if ((direction === 'stop' && units[name].unitMovementId) || (units[name].x + unitSize >= canvas.width && direction === 'right') || (units[name].x <= 0 && direction === 'left')) {
            cancelAnimationFrame(units[name].unitMovementId);
            units[name].unitMovementId = null;
        } else {
            destroyUnit(name);
            let v = direction === 'right' ? units[name].speed : units[name].speed * -1;
            const new_x = units[name].x + v;
            if ((new_x <= 10 || new_x + unitSize >= canvas.width - 10) && units[name].isEnemy) {
                units[name].speed = units[name].speed * -1;
            }
            units[name].x = new_x;
            drawUnit(name);
            if (units[name].isEnemy && Math.abs(units[name].x - units['Jethro'].x) < unitSize && (!bullets[name] || !bullets[name][bullets[name].length - 1].bulletAnimationId)) {
                shoot(name, units[name].damage);
            }
            units[name].unitMovementId = requestAnimationFrame(() => moveUnit(name, direction));
        }
    }

    function drawBullet(bullet) {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bulletSize / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = bullet.fromEnemy ? 'red' : 'blue';
        ctx.fill();
    }

    function destroyBullet(bullet) {
        const xStart = bullet.x - (bulletSize / 2);
        const yStart = bullet.y - (bulletSize / 2);
        ctx.clearRect(xStart, yStart, bulletSize, bulletSize);

    }

    function moveBullet(bullet) {
        destroyBullet(bullet);
        const new_y = bullet.y + (bullet.fromEnemy ? bulletSpeed : -bulletSpeed);
        bullet.y = new_y;
        drawBullet(bullet);
        if (new_y <= 0 || new_y >= canvas.height || checkBulletCollision(bullet)) {
            cancelAnimationFrame(bullet.bulletAnimationId);
            bullet.bulletAnimationId = null;
            destroyBullet(bullet);
        } else {
            requestAnimationFrame(() => moveBullet(bullet));
        }
    }

    function shoot(name, damage) {
        if (!bullets[name]) {
            bullets[name] = [];
        }

        bullets[name].push(
            {
                x: units[name].x + unitSize / 2,
                y: units[name].y + (units[name].isEnemy ? unitSize + (bulletSize / 2) + bulletHitGap : -((bulletSize / 2) + bulletHitGap)),
                damage
            }
        );

        if (units[name].isEnemy) {
            bullets[name][bullets[name].length - 1].fromEnemy = true;
        }

        drawBullet(bullets[name][bullets[name].length - 1]);

        bullets[name][bullets[name].length - 1].bulletAnimationId = requestAnimationFrame(() => moveBullet(bullets[name][bullets[name].length - 1]));
    }

    function checkBulletCollision(bullet) {
        for (let name in units) {
            if (bullet.x >= units[name].x && bullet.x <= units[name].x + unitSize && Math.abs(bullet.y - (units[name].y + (bullet.fromEnemy ? 0 : unitSize))) <= bulletHitGap) {
                console.log(`${name} got hit!`);
                units[name].hurt(bullet.damage);
                return true;
            }
        }
        return false;
    }

    return {
        displayUnit,
        handleMovement,
        shoot,
        removeUnit
    }
}