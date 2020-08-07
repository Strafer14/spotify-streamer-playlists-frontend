import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export default function Button({ onClick, icon, color, text }) {
  return (
    <div
      onClick={onClick}
      className="custom-button"
      style={{ backgroundColor: color }}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  icon: PropTypes.object,
  color: PropTypes.string,
};

Button.defaultProps = {
  color: "#f36b7f",
  onClick: null,
};
