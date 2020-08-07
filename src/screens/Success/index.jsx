import React from "react";
import pabloSuccess from "../../static/pablo-success.svg";
import "./style.css";
import Button from "../../components/Button";

export default function Success() {
  return (
    <div className="success-wrapper">
      <img alt="pablo-success" src={pabloSuccess} />
      <span role="img" className="title">OK, so there’s someone we’d like you to meet 😇</span>
      <Button text="Who is it?"/>
    </div>
  );
}
