import { Drawer } from "native-base";
import React from "react";
import SideBar from "../../components/SideBar";
import IngredientComponent from "./IngredientComponent";

export default function IngredientScreen({ user }) {
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
        <IngredientComponent
          key={user.uid}
          userId={user.uid}
          openDrawerCallback={openDrawer}
        ></IngredientComponent>
      ) : (
        <></>
      )}
    </Drawer>
  );
}
