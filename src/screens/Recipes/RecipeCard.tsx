import { Recipe } from "@models";
import { useNavigation } from "@react-navigation/native";
import theme from "@theme";
import { Body, Card, CardItem, Icon, Left, Right, Text } from "native-base";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { HomeRoutes } from "../../navigation/AppRoutes";
import DifficultyIcons from "./Difficulty";
import Tags from "./Tags";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const navigator = useNavigation();

  const showRecipeDetails = () => {
    navigator.navigate(HomeRoutes.RECIPE_DETAILS, { recipe });
  };

  return (
    <TouchableOpacity onPress={showRecipeDetails} activeOpacity={1}>
      <Card style={{ borderRadius: 4 }} pointerEvents="none">
        <CardItem header>
          <Body>
            <Text>{recipe.title}</Text>
            {recipe.subtitle ? <Text note>{recipe.subtitle}</Text> : <></>}
          </Body>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{ uri: recipe.imageUrl }}
            style={{ height: 200, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Left>
            <Icon name="timer-outline"></Icon>
            <Text>{recipe.timeInMinutes} min</Text>
          </Left>
          <Body></Body>
          <Right>
            {recipe.isFavourite ? (
              <Icon name="heart" style={{ color: theme.brandDanger }} />
            ) : (
              <Icon name="heart-outline" />
            )}
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <DifficultyIcons difficulty={recipe.difficulty} id={recipe.id} />
          </Left>
          <Right>
            {/* TODO: render 3 Tags and adjust alignment */}
            <CardItem>
              <Tags items={recipe.tags} />
            </CardItem>
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}
