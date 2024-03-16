import React, { useState } from "react";
import Stage from "./Stage";
import Display from "./Display.jsx";
import StartButton from "./StartButton";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris.jsx";
import { usePlayer } from "../hooks/usePlayer.js";
import { useStage } from "../hooks/useStage.js";
import { checkCollision, createStage } from "../gameHelpers.js";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, resetPlayer, updatePlayerPos, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({
        x: dir,
        y: 0,
      });
    }
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({
        x: 0,
        y: 1,
        collided: false,
      });
    } else {
      if (player.pos.y <= 1) {
        console.log("Game Over");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({
        x: 0,
        y: 0,
        collided: true,
      });
    }
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
      if (keyCode === 38) {
        playerRotate(stage, 1);
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
