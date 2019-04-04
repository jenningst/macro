import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "./ServingCard.css";

const ServingCard = props => {
  const {
    name,
    brand,
    calories,
    servingSize,
    servingUnit,
    select
  } = props.data;

  return (
    <Card className="serving-card">
      <div className="card-details">
        <CardHeader title={name} />
        <CardContent className="card-content">
          <Typography component="p">
            {brand}, {servingSize} {servingUnit}
          </Typography>
          <Typography component="p">{`${calories} kCal`}</Typography>
        </CardContent>
      </div>
      <div className="card-actions">
        <CardActions>
          <IconButton aria-label="Add" onClick={select}>
            <AddIcon size="small" color="primary" />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
};

// ServingCard.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default ServingCard;
