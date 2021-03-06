import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import "./styles/App.css";
import MealContainer from "../components/Meal/MealContainer";
import FoodContainer from "../components/Food/FoodContainer";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="app">
      <FoodContainer />
      <MealContainer />
    </div>
  </ApolloProvider>
);

export default App;
