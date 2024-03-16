import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../tetrominos";

const Cell = ({ type }) => {
  return (
    <StyledCell type={type} color={TETROMINOS[type].color} />
    // <StyledCell type={"L"} color={TETROMINOS["L"].color} />
  );
};

export default Cell;
