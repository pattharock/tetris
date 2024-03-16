import React from "react";
import Stage from "./Stage";
import Display from "./Display.jsx";
import StartButton from "./StartButton";
import { createStage } from "../gameHelpers.js";

const Tetris = () => {
  return (
    <div>
      <Stage stage={createStage()} />
      <aside>
        <Display text="Score" />
        <Display text="Rows" />
        <Display text="Level" />
        <StartButton />
      </aside>
    </div>
  );
};

export default Tetris;
