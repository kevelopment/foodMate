import { Drawer } from "native-base";
import React from "react";
import SideBar from "./SideBar";

export default function HomeDrawer({ children, user }) {
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
      {...children}
    </Drawer>
  );
}
