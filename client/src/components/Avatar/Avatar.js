import React, { useContext } from 'react';

import { UserContext } from 'Pages/Home/Home';

export default function() {
    const [user] = useContext(UserContext);

    return (
        <div className="avatar">
            <img src={user.imageUrl} alt="user avatar" className="avatar__image"/>
            <h3 className="avatar__name">{user.username}</h3>
        </div>
    )
}