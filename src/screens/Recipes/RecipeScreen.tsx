import SideBar from "@components/SideBar";
import { Drawer } from "native-base";
import React from "react";
import RecipeComponent from "./RecipeComponent";

export default function RecipeScreen({ user }) {
  let drawer: any;
  const closeDrawer = () => {
    drawer?._root.close();
  };

  const openDrawer = () => {
    drawer?._root.open();
  };

  return (
    <Drawer
      ref={(ref) => (drawer = ref)}
      content={<SideBar user={user} />}
      onClose={() => closeDrawer()}
    >
      {user ? (
        <RecipeComponent
          key={user.uid}
          openDrawerCallback={openDrawer}
        ></RecipeComponent>
      ) : (
        <></>
      )}
    </Drawer>
  );
}
