import { createStage } from "../gameHelpers";
import { useState, useEffect } from "react";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) => {
      return newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((previous) => previous + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);
    };

    const updateStage = (previousStage) => {
      const newStage = previousStage.map((row) =>
        row.map((cell) => (cell[1] == "clear" ? [0, "clear"] : cell)),
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value != 0) {
            newStage[player.pos.y + y][player.pos.x + x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }
      return newStage;
    };
    setStage((previousState) => updateStage(previousState));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
