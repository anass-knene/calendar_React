import React from "react";
import App from "./App.js";
import reactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { onError } from "apollo-link-error";

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      token: localStorage.getItem("token") || null,
    },
  });
  return forward(operation);
});
onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(message));
  }
  if (networkError) {
    console.log(networkError);
  }
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    middlewareLink,
    new HttpLink({ uri: "https://real-puce-spider-veil.cyclic.app/graphql" }),
  ]),
});

reactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
