import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hoc';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const domain = process.env.NODE_ENV === 'production' ? 'backend' : 'localhost';
const client = new ApolloClient({
  uri: `http://${domain}:8000/graphql`,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById('root'),
);
registerServiceWorker();
