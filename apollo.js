import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: "https://a191-116-47-117-210.jp.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;
