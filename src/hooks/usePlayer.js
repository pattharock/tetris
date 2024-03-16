import { useCallback, useState } from "react";
import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: {
      x: 0,
      y: 0,
    },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((previousState) => ({
      ...previousState,
      pos: {
        x: (previousState.pos.x += x),
        y: (previousState.pos.y += y),
      },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: {
        x: STAGE_WIDTH / 2 - 2,
        y: 0,
      },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, resetPlayer, updatePlayerPos];
};
