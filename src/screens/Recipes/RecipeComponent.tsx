import FullScreenSpinner from "@components/FullScreenSpinner";
import HomeFooter from "@components/HomeFooter";
import HomeHeader from "@components/HomeHeader";
import { HomeRoutes } from "@navigation/AppRoutes";
import { Container, Content } from "native-base";
import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import { Recipe } from "../../models";
import RecipeCard from "./RecipeCard";

export default function RecipeComponent({ openDrawerCallback }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("recipes")
      .onSnapshot(async (querySnapshot: any) => {
        const recipes: any[] = [];
        querySnapshot.forEach((document: any) => {
          recipes.push({ id: document.id, ...document.data() });
        });

        for (const recipe of recipes) {
          const tags = [];
          for (const tag of recipe.tags) {
            const document = await tag.get();
            tags.push(document.data().name);
          }
          recipe.tags = tags;

          recipe.imageUrl = await firebase
            .storage()
            .ref(`/recipe-images/${recipe.imageUrl}`)
            .getDownloadURL();
        }

        setRecipes(recipes.map((recipe) => new Recipe({ ...recipe })));
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  return (
    <Container>
      <HomeHeader
        openDrawerCallback={openDrawerCallback}
        title="Recipes"
        enableSearch
      />
      {loading ? (
        <FullScreenSpinner />
      ) : (
        <Content contentContainerStyle={{ padding: 4, marginBottom: 4 }}>
          {recipes
            // .filter((recipe) => {
            //   if (searchString === "") {
            //     return true;
            //   }

            //   return (
            //     recipe.title.includes(searchString) ||
            //     recipe.subtitle.includes(searchString)
            //   );
            // })
            .map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </Content>
      )}
      <HomeFooter activeRoute={HomeRoutes.RECIPES} />
    </Container>
  );
}
