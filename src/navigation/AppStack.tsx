import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  AddIngredientScreen,
  IngredientScreen,
  ListsScreen,
  LoginScreen,
  RecipeScreen,
  RegistrationScreen,
} from "../screens";
import RecipeDetails from "../screens/Recipes/RecipeDetails";
import { AppRoutes, HomeRoutes, LoginRoutes } from "./AppRoutes";

const Stack = createStackNavigator();

/**
 * Main Stack of the Application
 */
export default function AppStack({ user }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={user ? AppRoutes.HOME : AppRoutes.LOGIN}
    >
      <Stack.Screen name={AppRoutes.HOME}>
        {(props) => <HomeStack {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen name={AppRoutes.LOGIN} component={LoginStack} />
    </Stack.Navigator>
  );
}

/**
 * The Stack responsible for handling login operations (login and registering users).
 */
function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName={LoginRoutes.LOGIN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={LoginRoutes.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={LoginRoutes.REGISTER}
        component={RegistrationScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * Stack responsible for handling routes within the Home section
 */
function HomeStack({ user }) {
  return (
    <Stack.Navigator
      initialRouteName={HomeRoutes.RECIPES}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={HomeRoutes.RECIPES}>
        {(props) => <RecipeStack {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen name={HomeRoutes.LISTS} component={ListsScreen} />
      <Stack.Screen
        name={HomeRoutes.INGREDIENTS}
        options={{ animationEnabled: false }}
      >
        {(props) => <IngredientStack {...props} user={user} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function RecipeStack({ user }) {
  return (
    <Stack.Navigator
      initialRouteName={HomeRoutes.RECIPES}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={HomeRoutes.RECIPES}>
        {(props) => <RecipeScreen {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen
        name={HomeRoutes.RECIPE_DETAILS}
        component={RecipeDetails}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

/**
 *  Stack responsible for handling routes within Ingredients section
 */
function IngredientStack({ user }) {
  return (
    <Stack.Navigator
      initialRouteName={HomeRoutes.INGREDIENTS}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={HomeRoutes.INGREDIENTS}>
        {(props) => <IngredientScreen {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen
        name={HomeRoutes.ADD_INGREDIENT}
        component={AddIngredientScreen}
      />
    </Stack.Navigator>
  );
}
