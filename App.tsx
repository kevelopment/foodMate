import FullScreenSpinner from "@components/FullScreenSpinner";
import AppStack from "@navigation/AppStack";
import { NavigationContainer } from "@react-navigation/native";
import theme from "@theme";
import * as Font from "expo-font";
import { StyleProvider } from "native-base";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import getTheme from "./native-base-theme/components";
import { firebase } from "./src/firebase/config";

// TODO: check if this is really a necessity
// import { decode, encode } from "base-64";
// if (!global.btoa) {
//   global.btoa = encode;
// }
// if (!global.atob) {
//   global.atob = decode;
// }

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function initialize() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
      });
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then((document: any) => {
              const userData = document.data();
              setUser(userData);
            })
            .catch((error: Error) => {
              alert(error);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setUser(null);
          setLoading(false);
        }
      });
    }

    initialize();
  }, []);

  return (
    <StyleProvider style={getTheme(theme)}>
      {loading ? (
        <FullScreenSpinner />
      ) : (
        <NavigationContainer>
          <AppStack user={user} />
        </NavigationContainer>
      )}
    </StyleProvider>
  );
}
