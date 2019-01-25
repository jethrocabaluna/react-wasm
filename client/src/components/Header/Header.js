import React from 'react';

import './header.scss';

export default function({title}) {
    return (
        <div className="header">
            <h1 className="header__title">{title}</h1>
        </div>
    )
}