import React, { Fragment, useState } from 'react';

import Header from 'Components/Header/Header';
import Result from 'Components/Result/Result';

import wasmModule from 'Scripts/wasmModule';

export default function ({ title }) {
    const [result, setResult] = useState(0);
    const val1Ref = React.createRef();
    const val2Ref = React.createRef();
    const cppExports = {};

    wasmModule
        .then(instance => {
            cppExports.add = (a, b) => setResult(instance.add(a, b));
        });

    return (
        <Fragment>
            <Header title={title} />
            <input type="number" name="input1" id="input1" ref={val1Ref} />
            <input type="number" name="input2" id="input2" ref={val2Ref} />
            <button onClick={() => cppExports.add(parseInt(val1Ref.current.value), parseInt(val2Ref.current.value))}>Add</button>
            <Result result={result} />
        </Fragment>
    )
};