import React from 'react';

export default function({id, name, ref}) {
    return (
        <input ref={ref} type="number" id={id} name={name} />
    );
};