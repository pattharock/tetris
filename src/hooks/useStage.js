import { createStage } from "../gameHelpers";
import { useState, useEffect } from "react";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
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

      return newStage;
    };

    setStage((previousState) => updateStage(previousState));
  }, [player]);
  return [stage, setStage];
};
