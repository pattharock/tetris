import React, { useState } from "react";
import Stage from "./Stage";
import Display from "./Display.jsx";
import StartButton from "./StartButton";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris.jsx";
import { usePlayer } from "../hooks/usePlayer.js";
import { useStage } from "../hooks/useStage.js";
import { createStage } from "../gameHelpers.js";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, resetPlayer, updatePlayerPos] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log("re render");
  console.log(stage);
  console.log();

  const movePlayer = (dir) => {
    updatePlayerPos({
      x: dir,
      y: 0,
    });
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({
      x: 0,
      y: 1,
      collided: false,
    });
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      }
      if (keyCode === 39) {
        movePlayer(1);
      }
      if (keyCode === 40) {
        dropPlayer();
      }
    }
  };

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
