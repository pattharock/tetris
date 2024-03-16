import React from "react";
import Stage from "./Stage";
import Display from "./Display.jsx";
import StartButton from "./StartButton";
import { createStage } from "../gameHelpers.js";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris.jsx";

const Tetris = () => {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={createStage()} />
        <aside>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Level" />
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
