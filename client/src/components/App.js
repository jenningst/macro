import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import "./styles/App.css";
import CreateFood from "./CreateFood";
import FoodList from "./FoodList";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <div className="app">
        <CreateFood />
        <FoodList />
      </div>
    </ApolloHooksProvider>
  </ApolloProvider>
);

export default App;
