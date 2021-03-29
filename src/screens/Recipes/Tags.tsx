import { Badge, Text } from "native-base";
import React from "react";

export default function Tags({ items }) {
  return (
    <>
      {items.map((tag: string) => (
        <Badge key={tag} success style={{ marginRight: 8 }}>
          <Text>{tag}</Text>
        </Badge>
      ))}
    </>
  );
}
