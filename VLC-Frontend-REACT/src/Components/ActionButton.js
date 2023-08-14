import React from "react";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green, purple } from "@material-ui/core/colors";
import PropTypes from "prop-types";

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    fontSize: "12px",
    padding: "4px 20px",
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: "#e3e0d8",
      color: "rgba(0,0,0,0.5)",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedButtons(props) {
  const classes = useStyles();

  return (
    <ColorButton
      variant="contained"
      color="primary"
      className={[
        classes.margin,
        {
          // width: "25%",
          // padding: "2px",
        },
      ]}
      onClick={() => props.onClick()}
    >
      {props.buttonText}
    </ColorButton>
  );
}

CustomizedButtons.propTypes = {
  /**
   *  A prop for text written on the button
   */
  buttonText: PropTypes.string.isRequired,
  /**
   * A prop for on click action on the button
   */
  onClick: PropTypes.func,
};
