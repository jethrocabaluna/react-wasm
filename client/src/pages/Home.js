import React, { Fragment } from 'react';

import Header from 'Components/Header/Header';

export default function ({ title }) {
    return (
        <Fragment>
            <Header title={title} />
        </Fragment>
    )
};