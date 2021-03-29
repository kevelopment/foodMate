import { useNavigation } from "@react-navigation/native";
import { Button, Footer, FooterTab, Icon, Text } from "native-base";
import React from "react";
import { HomeRoutes } from "../navigation/AppRoutes";

export default function HomeFooter({ activeRoute }) {
  const navigation = useNavigation();
  return (
    <Footer>
      <FooterTab>
        <Button
          active={activeRoute === HomeRoutes.RECIPES}
          vertical
          onPress={() => navigation.navigate(HomeRoutes.RECIPES)}
        >
          <Icon
            active={activeRoute === HomeRoutes.RECIPES}
            name="home-outline"
          />
          <Text>Home</Text>
        </Button>
        <Button
          active={activeRoute === HomeRoutes.LISTS}
          vertical
          onPress={() => navigation.navigate(HomeRoutes.LISTS)}
        >
          <Icon
            active={activeRoute === HomeRoutes.LISTS}
            name="search-outline"
          />
          <Text>Search</Text>
        </Button>
        <Button
          active={activeRoute === HomeRoutes.INGREDIENTS}
          vertical
          onPress={() => navigation.navigate(HomeRoutes.INGREDIENTS)}
        >
          <Icon
            active={activeRoute === HomeRoutes.INGREDIENTS}
            name="list-outline"
          />
          <Text>Ingredients</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}
