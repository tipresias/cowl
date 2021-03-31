import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hoc';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const defineHost = () => {
  if (process.env.NODE_ENV === 'production') return '206.189.38.8';

  return 'localhost:8000';
};

const host = defineHost();
const client = new ApolloClient({
  uri: `http://${host}/graphql`,
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
