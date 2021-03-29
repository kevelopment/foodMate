import { Content, Spinner } from "native-base";
import React from "react";

export default function FullScreenSpinner() {
  return (
    <Content
      contentContainerStyle={{
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Spinner />
    </Content>
  );
}
