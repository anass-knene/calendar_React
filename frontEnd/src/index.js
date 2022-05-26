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
import Swal from "sweetalert2";

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
    graphQLErrors.map(({ message, locations, path }) =>
      Swal.fire({
        position: "top",
        icon: "error",
        title: `${message}`,
        showConfirmButton: false,
        timer: 2000,
        customClass: "swal-width",
      })
    );
  }
  if (networkError) {
    Swal.fire({
      position: "top",
      icon: "error",
      title: networkError,
      showConfirmButton: false,
      timer: 2000,
      customClass: "swal-width",
    });
  }
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    middlewareLink,
    new HttpLink({ uri: "http://localhost:5000/graphql" }),
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
