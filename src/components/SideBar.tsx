import { AppRoutes } from "@navigation/AppRoutes";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Container,
  Content,
  Footer,
  Header,
  List,
  ListItem,
  Text,
  Title,
} from "native-base";
import React from "react";
import { firebase } from "../firebase/config";

export default function SideBar({ user }) {
  const navigation = useNavigation();
  const logoutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate(AppRoutes.LOGIN);
      })
      .catch((error) => alert(error));
  };

  return (
    <Container>
      <Header>
        <Title>{user ? user.fullName : "SideBar"}</Title>
      </Header>
      <Content>
        <List>
          <ListItem>
            <Text>{user ? user.email : "List Item"}</Text>
          </ListItem>
        </List>
      </Content>
      <Footer>
        <Button transparent onPress={logoutUser}>
          <Text>Logout</Text>
        </Button>
      </Footer>
    </Container>
  );
}
