import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";

const StartButton = ({ callback }) => {
  return <StyledStartButton onClick={callback}>Start Button</StyledStartButton>;
};

export default StartButton;
