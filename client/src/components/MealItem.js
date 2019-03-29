import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { DELETE_MEAL, GET_MEALS } from "../queries/meal";
// material ui components
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import "./styles/MealItem.css";

const styles = {};

const MealItem = ({ id, name, isEditable }) => {
  return (
    <Mutation mutation={DELETE_MEAL}>
      {(deleteMeal, { data }) => (
        <div className="meal-item">
          <ListItem>
            <ListItemText primary={name} />
            <ListItemIcon>
              <IconButton
                aria-label="Delete"
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  deleteMeal({
                    variables: { input: { id } },
                    refetchQueries: [{ query: GET_MEALS }]
                  });
                }}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </div>
      )}
    </Mutation>
  );
};

MealItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default MealItem;
