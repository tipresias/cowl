import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Layout from "../components/Layout";

const host = process.env.API_HOST || "localhost:8000";
const client = new ApolloClient({
  uri: `http://${host}/graphql`,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default App;
