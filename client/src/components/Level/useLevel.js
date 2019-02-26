import React, { useState } from 'react';

export default function () {
    const [currentLevel, setCurrentLevel] = useState(0);

    function nextLevel(level = null) {
        console.log(currentLevel);
        if (!level) {
            setCurrentLevel(currentLevel + 1);
        } else {
            setCurrentLevel(level);
        }
    }

    return [currentLevel, nextLevel];
}