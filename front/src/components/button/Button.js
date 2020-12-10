import React from "react";
import "./Button.css";

const STYLES = ["btn--primary-button", "btn--outline-button"];

const SIZES = [
  "btn--medium-button",
  "btn--large-button",
  "btn--mobile-button",
  "btn--wide-button",
];

const COLOR = ["primary-button", "blue-button", "white-button", "green-button"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonColor,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const checkButtonColor = COLOR.includes(buttonColor) ? buttonColor : null;

  return (
    <button
      className={`btn-button ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
