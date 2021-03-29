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
  Input,
  Item,
  Label,
  Left,
  Right,
  Text,
  Title,
  View,
} from "native-base";
import React, { useState } from "react";
import { Image } from "react-native";
import { firebase } from "../../firebase/config";
import { AppRoutes, LoginRoutes } from "../../navigation/AppRoutes";
import styles from "./styles";

// TODO: cleanup!!!
export default function RegistrationScreen() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigation = useNavigation();
  const onFooterLinkPress = () => {
    navigation.navigate(LoginRoutes.LOGIN);
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response: any) => {
        const { user } = response;
        if (!!user.uid) {
          const data = { id: user.uid, email, fullName };
          const userStore = firebase.firestore().collection("users");
          userStore
            .doc(user.uid)
            .set(data)
            .then(() => {
              navigation.navigate(AppRoutes.HOME, { user: data });
            });
        }
      })
      .catch((error: any) => {
        alert(error);
      });
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" />
          </Button>
        </Left>
        <Body>
          <Title>Register</Title>
        </Body>
        <Right></Right>
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
              <Label>Full Name</Label>
              <Input
                value={fullName}
                onChangeText={(text) => setFullName(text)}
              />
            </Item>
          </CardItem>
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
            <Item floatingLabel>
              <Label>Confirm Password</Label>
              <Input
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </Item>
          </CardItem>
          <CardItem>
            <Button full style={styles.button} onPress={onRegisterPress}>
              <Text>Sign Up</Text>
            </Button>
          </CardItem>
          <CardItem>
            <View style={styles.footerText}>
              <Text>
                Already haven an account?{" "}
                <Text onPress={onFooterLinkPress} style={styles.navLink}>
                  Log in
                </Text>
              </Text>
            </View>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
