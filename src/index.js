import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // This will link the index.css file
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { UserProvider } from "./context/UserContext";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_BACKEND_GRAPHQL_URL_PROD
      : process.env.REACT_APP_BACKEND_GRAPHQL_URL_DEV,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const client = ...

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <App />
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
