import { Drawer } from "native-base";
import React from "react";
import SideBar from "../../components/SideBar";
import RecipeComponent from "../Recipes/RecipeComponent";

export default function SearchScreen({ user }) {
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
      <RecipeComponent openDrawerCallback={openDrawer}></RecipeComponent>
    </Drawer>
  );
}
