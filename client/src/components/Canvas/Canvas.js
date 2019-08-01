import React from 'react';

export default function ({ onKeyDown, onKeyUp }) {
    return <canvas id="game-canvas" tabIndex="1" onKeyDown={onKeyDown} onKeyUp={onKeyUp}></canvas>;
}

export const CanvasManager = function (playerName, levelManager) {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const units = {};
    const bullets = {};
    const unitSize = 50;
    const bulletSize = 10;
    const bulletSpeed = 9.5;
    const bulletHitGap = 5;

    let currentLevel = 0;

    let animationId = null;

    function animate() {
        animationId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let name in units) {
            units[name].update();
        }

        for (let name in bullets) {
            bullets[name].forEach(bullet => bullet.update());
        }
    }

    function displayUnit({name, speed, imageSource, x, y, hurt, enemy, damage}) {
        if (!imageSource) return;

        const {pos_x, pos_y} = getPosition({x, y});
        const randomDirection = Math.random() > 0.5 ? 'right' : 'left';

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
            units[name].update = () => {
                moveUnit(name, randomDirection);
            };
        } else {
            units[playerName].direction = 'stop';
            units[playerName].update = () => {
                moveUnit(playerName, units[playerName].direction);
            }
        }

        if (!animationId) {
            animate();
        }
    }

    function getPosition({x, y}) {
        let pos_x = x ? x : (Math.random() * (canvas.width - unitSize - 5) + 5);
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
        delete units[name];
        delete bullets[name];

        if (Object.keys(units).length === 1 && units[playerName] && currentLevel < levelManager.finalLevel) {
            console.log(units);
            console.log('Level finished');
            levelManager.nextLevel(++currentLevel);
        }
    }

    function destroyUnit(name) {
        ctx.clearRect(units[name].x, units[name].y, unitSize, unitSize);
    }

    function handlePlayerMovement(direction) {
        units[playerName].direction = direction;
    }

    function handleMovement(name, direction) {
        moveUnit(name, direction);
    }

    function moveUnit(name, direction) {
        if (!(direction === 'stop' || (units[name].x + unitSize >= canvas.width && direction === 'right') || (units[name].x <= 0 && direction === 'left'))) {
            let v = direction === 'right' ? units[name].speed : units[name].speed * -1;
            const new_x = units[name].x + v;
            if ((new_x <= 10 || new_x + unitSize >= canvas.width - 10) && units[name].isEnemy) {
                units[name].speed = units[name].speed * -1;
            }
            units[name].x = new_x;
            if (units[name].isEnemy && units[playerName] && Math.abs(units[name].x - units[playerName].x) < unitSize && (!bullets[name] || !bullets[name][bullets[name].length - 1].isActive)) {
                shoot(name, units[name].damage);
            }
        }
        drawUnit(name);
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
        const new_y = bullet.y + (bullet.fromEnemy ? bulletSpeed : -bulletSpeed);
        bullet.y = new_y;
        if (new_y <= 0 || new_y >= canvas.height || checkBulletCollision(bullet)) {
            bullet.isActive = false;
            destroyBullet(bullet);
        } else if (bullet.isActive) {
            drawBullet(bullet);
            return;
        }
    }

    function shoot(name, damage) {
        if (!bullets[name]) {
            bullets[name] = [];
        }

        const bulletIndex = bullets[name].length;

        bullets[name].push(
            {
                x: units[name].x + unitSize / 2,
                y: units[name].y + (units[name].isEnemy ? unitSize + (bulletSize / 2) + bulletHitGap : -((bulletSize / 2) + bulletHitGap)),
                damage,
                isActive: true,
                update: () => {
                    moveBullet(bullets[name][bulletIndex]);
                }
            }
        );

        if (units[name].isEnemy) {
            bullets[name][bullets[name].length - 1].fromEnemy = true;
        }

        drawBullet(bullets[name][bullets[name].length - 1]);
    }

    function checkBulletCollision(bullet) {
        for (let name in units) {
            if (bullet.x >= units[name].x && bullet.x <= units[name].x + unitSize && (Math.abs(bullet.y - units[playerName].y) <= bulletHitGap && name === playerName && units[playerName] || (Math.abs(bullet.y - (units[name].y + unitSize)) <= bulletHitGap && !bullet.fromEnemy))) {
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
        handlePlayerMovement,
        shoot,
        removeUnit
    }
}