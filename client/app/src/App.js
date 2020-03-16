import React from 'react';
import ApolloClient, {gql} from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks';
import client from './graphql/graphql'

import {Home, Tv, Movie, Counter, Favorite} from './containers/index';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Home/>
        ______
        <Movie/>
        ______
        <Tv/>
        ______
        <Counter/>
        ______
        <Favorite/>
      </div>
    </ApolloProvider>
  );
}

export default App;
