import theme from "@theme";
import { Icon } from "native-base";
import React from "react";

const MAX_DIFFICULTY = 3;
export default function DifficultyIcons({
  id,
  difficulty,
}: {
  id: string;
  difficulty: number;
}) {
  const icons = [];
  for (let i = 0; i < MAX_DIFFICULTY; i++) {
    icons.push(
      <Icon
        key={`${id} + ${i}`}
        name={
          i < difficulty
            ? "radio-button-on-outline"
            : "radio-button-off-outline"
        }
        style={{ color: theme.brandSuccess }}
      ></Icon>
    );
  }
  return <>{icons}</>;
}
