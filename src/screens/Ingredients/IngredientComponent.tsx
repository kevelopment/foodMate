import FullScreenSpinner from "@components/FullScreenSpinner";
import HomeFooter from "@components/HomeFooter";
import HomeHeader from "@components/HomeHeader";
import { Ingredient } from "@models";
import { useNavigation } from "@react-navigation/native";
import theme from "@theme";
import { Container, Fab, Icon } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { firebase } from "../../firebase/config";
import { HomeRoutes } from "../../navigation/AppRoutes";
import IngredientItem from "./IngredientItem";

export default function IngredientComponent({ openDrawerCallback }) {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("ingredients")
      .orderBy("name", "asc")
      .onSnapshot(async (querySnapshot: any) => {
        const ingredients: Ingredient[] = [];
        querySnapshot.forEach((document: any) => {
          const ingredient = { id: document.id, ...document.data() };
          ingredients.push(new Ingredient(ingredient));
        });

        for (const ingredient of ingredients) {
          ingredient.imageUrl = await firebase
            .storage()
            .ref(`/ingredient-images/${ingredient.imageUrl}`)
            .getDownloadURL();
        }

        setIngredients(ingredients);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const navigation = useNavigation();
  return (
    <Container>
      <HomeHeader
        title="Ingredients"
        openDrawerCallback={openDrawerCallback}
        enableSearch
      />
      {loading ? (
        <FullScreenSpinner />
      ) : (
        <FlatList
          data={ingredients}
          renderItem={({ item }) => (
            <IngredientItem key={item.name} ingredient={item} />
          )}
        ></FlatList>
      )}
      <Fab
        active={true}
        position="bottomRight"
        style={{
          backgroundColor: theme.brandPrimary,
          bottom: theme.footerHeight + 32,
        }}
        onPress={() => navigation.navigate(HomeRoutes.ADD_INGREDIENT)}
      >
        <Icon name="add" />
      </Fab>
      <HomeFooter activeRoute={HomeRoutes.INGREDIENTS} />
    </Container>
  );
}
