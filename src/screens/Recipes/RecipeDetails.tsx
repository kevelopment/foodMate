import { Ingredient } from "@models";
import { useNavigation } from "@react-navigation/native";
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
  View,
} from "native-base";
import React from "react";
import { FlatList, Image } from "react-native";
import UsedIngredient from "src/models/UsedIngredient";
import DifficultyIcons from "./Difficulty";
import Tags from "./Tags";

const usedIngredients = [
  {
    ingredient: new Ingredient({
      id: "0",
      name: "Knoblauch",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/foodmate-ea3fc.appspot.com/o/ingredient-images%2Fknoblauch.jpg?alt=media&token=66af598a-c66c-4009-b1b7-7e254d1c48f5",
    }),
    quantity: 1,
    unit: "piece",
  } as UsedIngredient,
  {
    ingredient: new Ingredient({
      id: "1",
      name: "Zwiebel",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/foodmate-ea3fc.appspot.com/o/ingredient-images%2Fzwiebeln.jpg?alt=media&token=33ba70e6-e53d-43d0-9ae9-ec55dc1871e1",
    }),
    quantity: 1,
    unit: "piece",
  } as UsedIngredient,
  {
    ingredient: new Ingredient({
      id: "1",
      name: "Gorgonzola",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/foodmate-ea3fc.appspot.com/o/ingredient-images%2Fgorgonzola.jpg?alt=media&token=2cd131e0-2994-4863-831d-956271fa8cd6",
    }),
    quantity: 150,
    unit: "gram",
  } as UsedIngredient,
  {
    ingredient: new Ingredient({
      id: "0",
      name: "Knoblauch",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/foodmate-ea3fc.appspot.com/o/ingredient-images%2Fknoblauch.jpg?alt=media&token=66af598a-c66c-4009-b1b7-7e254d1c48f5",
    }),
    quantity: 1,
    unit: "piece",
  } as UsedIngredient,
  {
    ingredient: new Ingredient({
      id: "1",
      name: "Zwiebel",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/foodmate-ea3fc.appspot.com/o/ingredient-images%2Fzwiebeln.jpg?alt=media&token=33ba70e6-e53d-43d0-9ae9-ec55dc1871e1",
    }),
    quantity: 1,
    unit: "piece",
  } as UsedIngredient,
  {
    ingredient: new Ingredient({
      id: "1",
      name: "Gorgonzola",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/foodmate-ea3fc.appspot.com/o/ingredient-images%2Fgorgonzola.jpg?alt=media&token=2cd131e0-2994-4863-831d-956271fa8cd6",
    }),
    quantity: 150,
    unit: "gram",
  } as UsedIngredient,
];

export default function RecipeDetails({ route }) {
  const { recipe } = route.params;
  return (
    <Container>
      {RecipeHeader()}
      <Content>
        <Card style={{ margin: 0, padding: 0, flex: 0 }}>
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
            <Text>{recipe.description}</Text>
          </CardItem>
          <CardItem style={{ justifyContent: "center" }}>
            <Tags items={recipe.tags} />
          </CardItem>
          {RecipeTimeAndDifficulty(recipe)}
          <CardItem header>
            <Text>Ingredients:</Text>
          </CardItem>
          <FlatList
            data={usedIngredients}
            keyExtractor={(item, index) => item.ingredient.id + index}
            renderItem={renderIngredient} //method to render the data in the way you want using styling u need
            horizontal={false}
            numColumns={2}
          />
        </Card>
      </Content>
    </Container>
  );
}

function renderIngredient({ item }: { item: UsedIngredient }) {
  return (
    <CardItem
      style={{
        flex: 1,
      }}
    >
      <Left style={{ flex: 3 }}>
        <Image
          source={{ uri: item.ingredient.imageUrl }}
          style={{ width: 60, height: 60, borderRadius: 50 }}
        />
      </Left>
      <Right
        style={{
          flex: 4,
          alignItems: "flex-start",
          alignSelf: "flex-start",
        }}
      >
        <View>
          <Text>{item.ingredient.name}</Text>
        </View>
        <View>
          <Text>
            {item.quantity} {item.unit}
          </Text>
        </View>
      </Right>
    </CardItem>
  );
}

function RecipeHeader() {
  const navigator = useNavigation();
  return (
    <Header>
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => navigator.goBack()}>
          <Icon name="chevron-back-outline" />
        </Button>
      </Left>
      <Body
        style={{
          alignItems: "center",
        }}
      >
        <Title>Details</Title>
      </Body>
      <Right style={{ flex: 1 }}></Right>
    </Header>
  );
}

function RecipeTimeAndDifficulty(recipe) {
  return (
    <>
      <CardItem>
        <Left>
          <Text>Difficulty: </Text>
        </Left>
        <Right
          style={{
            flexGrow: 1,
            flexDirection: "row-reverse",
          }}
        >
          <DifficultyIcons difficulty={recipe.difficulty} id={recipe.id} />
        </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Text>Time: </Text>
        </Left>
        <Right>
          <Text>{recipe.timeInMinutes} min</Text>
        </Right>
      </CardItem>
    </>
  );
}
