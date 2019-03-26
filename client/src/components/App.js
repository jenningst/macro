import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import "./styles/App.css";
import CreateFood from "./CreateFood";
import FoodList from "./FoodList";
import CreateMeal from "./CreateMeal";
import MealList from "./MealList";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="app">
      <CreateMeal />
      <MealList />
      <CreateFood />
      <FoodList />
    </div>
  </ApolloProvider>
);

export default App;
