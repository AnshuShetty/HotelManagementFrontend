import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // This will link the index.css file
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { BookingProvider } from "./context/BookingContext";
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
      {/* <UserProvider> */}
      <AuthProvider>
        <FavoritesProvider>
          <BookingProvider>
            <App />
          </BookingProvider>
        </FavoritesProvider>
      </AuthProvider>
      {/* </UserProvider> */}
    </ApolloProvider>
  </React.StrictMode>,
);

reportWebVitals();
