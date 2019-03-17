import React from 'react';
import FoodItem from './FoodItem';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './styles/FoodItem.css';

const FOOD_QUERY = gql`
  {
    foods {
      id,
      name,
      brand,
      variant,
      servingSize,
      servingUnit,
      revisions {
        id,
        revisionNumber,
        calories,
        carbohydrates,
        proteins,
        fats
      }
    }
  }
`;

const styles = {
  display: "flex",
  flexFlow: "column nowrap",
};

const FoodList = () => {
  return (
    <Query query={FOOD_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const foodsToRender = data.foods;

        return (
          <div className="food-list" style={styles}>
            {foodsToRender.map(food => <FoodItem 
              key={food.id}
              name={food.name}
              brand={food.brand}
              variant={food.variant}
              servingUnit={food.servingUnit}
              servingSize={food.servingSize}
              nutrition={food.revisions[food.revisions.length - 1]}
            />)}
          </div>
        );
      }}
    </Query>
  );
};

export default FoodList;
