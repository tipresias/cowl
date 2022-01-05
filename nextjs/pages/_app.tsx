import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const defineHost = () => {
  if (process.env.NODE_ENV === "production") return "206.189.38.8";

  return "localhost:8000";
};

const host = defineHost();
const client = new ApolloClient({
  uri: `http://${host}/graphql`,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
