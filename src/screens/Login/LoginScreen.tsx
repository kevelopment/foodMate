import { useNavigation } from "@react-navigation/native";
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Input,
  Item,
  Label,
  Text,
  Title,
  View,
} from "native-base";
import React, { useState } from "react";
import { Image } from "react-native";
import { firebase } from "../../firebase/config";
import { AppRoutes, LoginRoutes } from "../../navigation/AppRoutes";
import styles from "./styles";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();
  const onFooterLinkPress = () => {
    navigation.navigate(LoginRoutes.REGISTER);
  };

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const userStore = firebase.firestore().collection("users");
        if (user) {
          userStore
            .doc(user.uid)
            .get()
            .then((document: any) => {
              const userData = document.data();
              navigation.navigate(AppRoutes.HOME, { userData });
            })
            .catch((error: any) => alert(error));
        }
      })
      .catch((error: any) => alert(error));
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>Login</Title>
        </Body>
      </Header>
      <Content contentContainerStyle={styles.content}>
        <View style={styles.iconBox}>
          <Image
            source={require("../../../assets/firebase-icon.png")}
            style={styles.icon}
          />
        </View>
        <Card style={styles.card}>
          <CardItem>
            <Item floatingLabel>
              <Label>E-Mail</Label>
              <Input
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Item>
          </CardItem>
          <CardItem>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </Item>
          </CardItem>
          <CardItem>
            <Button
              full
              style={styles.button}
              onPress={() => onLoginPress()}
              disabled={password.length === 0 || email.length < 5}
            >
              <Text>Log In</Text>
            </Button>
          </CardItem>
          <CardItem>
            <View style={styles.footerText}>
              <Text>
                Don't have an account?{" "}
                <Text onPress={onFooterLinkPress} style={styles.navLink}>
                  Sign up
                </Text>
              </Text>
            </View>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
