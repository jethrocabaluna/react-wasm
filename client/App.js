import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Home from 'Pages/Home/Home';

import 'Styles/index.scss'

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
});

export default function App() {
    return (
        <ApolloProvider client={client}>
            <Home />
        </ApolloProvider>
    );
};
