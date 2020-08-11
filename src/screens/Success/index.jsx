import React from "react";
import { useHistory } from "react-router-dom";
import pabloSuccess from "../../static/pablo-success.svg";
import "./style.css";
import Button from "../../components/Button";

export default function Success() {
  const history = useHistory();
  return (
    <div className="success-wrapper">
      <img alt="pablo-success" src={pabloSuccess} />
      <span role="img" className="title">OK, so there’s someone we’d like you to meet 😇</span>
      <Button onClick={() => {
        history.push("/streamer");
      }} text="Who is it?"/>
    </div>
  );
}
