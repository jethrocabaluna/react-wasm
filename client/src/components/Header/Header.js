import React from 'react';

// import Avatar from 'Components/Avatar/Avatar';

export default function({title}) {
    return (
        <div className="header">
            <h1 className="header__title">{title}</h1>
            {/* <Avatar /> */}
        </div>
    )
}