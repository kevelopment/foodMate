import {
  Body,
  Button,
  CardItem,
  Icon,
  Left,
  SwipeRow,
  Text,
} from "native-base";
import React from "react";
import { Image } from "react-native";
import { firebase } from "../../firebase/config";
import Ingredient from "../../models/Ingredient";

export default function IngredientItem({ ingredient }) {
  const deleteIngredient = (ingredient: Ingredient) => {
    firebase.firestore().collection("ingredients").doc(ingredient.id).delete();
  };
  console.log("imageUrl: ", ingredient.imageUrl);
  const imageStyle = { width: 50, height: 50, borderRadius: 50 };
  return (
    <SwipeRow
      leftOpenValue={75}
      rightOpenValue={-75}
      left={
        <Button success onPress={() => alert(JSON.stringify(ingredient))}>
          <Icon active name="information-circle-outline" />
        </Button>
      }
      body={
        <CardItem>
          <Left>
            <Image style={imageStyle} source={{ uri: ingredient.imageUrl }} />
            <Body>
              <Text>{ingredient.name}</Text>
            </Body>
          </Left>
        </CardItem>
      }
      right={
        <Button danger onPress={() => deleteIngredient(ingredient)}>
          <Icon active name="trash" />
        </Button>
      }
    ></SwipeRow>
  );
}
