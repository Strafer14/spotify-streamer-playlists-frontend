import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export default function Button({ icon, color, text }) {
  return (
    <div className="custom-button" style={{ backgroundColor: color }}>
      {icon}
      <span>{text}</span>
    </div>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.object,
  color: PropTypes.string,
};

Button.defaultProps = {
  color: "#f36b7f",
};
