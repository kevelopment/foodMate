import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
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
  Spinner,
  Text,
  Title,
  View,
} from "native-base";
import React, { useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { firebase } from "../../firebase/config";
import { HomeRoutes } from "../../navigation/AppRoutes";
import { uriToBlob } from "../../Utils";
import styles from "./styles";

export default function AddIngredientScreen() {
  const navigator = useNavigation();
  const [ingredientName, setIngredientName] = useState("");
  const [imageData, setImageData] = useState<Blob | null>(null);
  const [imageUri, setImageUri] = useState("");
  const [uploading, setUploading] = useState(false);
  // const [progress, setProgress] = useState(0);

  const handleCameraResponse = (response: any) => {
    if (response.cancelled === false) {
      uriToBlob(response.uri).then((blob: any) => {
        setImageData(blob);
      });
      setImageUri(response.uri);
    }
  };

  const imageOptions = {
    quality: 0.1,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  };
  const launchCamera = () => {
    ImagePicker.launchCameraAsync(imageOptions)
      .then(handleCameraResponse)
      .catch((error) => alert(error));
  };
  const chooseImage = () => {
    ImagePicker.launchImageLibraryAsync(imageOptions).then(
      handleCameraResponse
    );
  };

  const createIngredient = () => {
    setUploading(true);
    const task = firebase
      .storage()
      .ref(`ingredient-images/${ingredientName.toLowerCase()}.jpg`)
      .put(imageData as any, {
        contentType: "image/jpeg",
      });

    // task.on("state_changed", (snapshot: any) => {
    //   setProgress(
    //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
    //   );
    // });

    task
      .then(() => {
        firebase
          .firestore()
          .collection("ingredients")
          .add({
            name: ingredientName,
            imageUrl: `${ingredientName.toLowerCase()}.jpg`,
          })
          .then(() => {
            navigator.navigate(HomeRoutes.INGREDIENTS);
          })
          .catch((error: Error) => alert(error));
      })
      .catch((error: Error) => alert(error))
      .finally(() => setUploading(false));
  };

  return (
    <Container>
      {uploading ? (
        <View style={styles.overlayContainer}>
          <View style={styles.uploadInfoContainer}>
            <Text>Creating Ingredient...</Text>
            <Spinner></Spinner>
          </View>
        </View>
      ) : (
        <></>
      )}
      <Header>
        <Left>
          <Button transparent onPress={() => navigator.goBack()}>
            <Icon name="chevron-back-outline" />
          </Button>
        </Left>
        <Body>
          <Title>Create Ingredient</Title>
        </Body>
      </Header>
      <Content>
        <Card>
          <CardItem style={styles.firstInput}>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                value={ingredientName}
                onChangeText={(text) => setIngredientName(text)}
              />
            </Item>
          </CardItem>
          <CardItem cardBody style={styles.imageContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image}></Image>
            ) : (
              <TouchableOpacity onPress={launchCamera}>
                <Image
                  source={require("../../../assets/image-placeholder.png")}
                  style={styles.image}
                ></Image>
              </TouchableOpacity>
            )}
          </CardItem>
          <CardItem>
            <Button
              full
              bordered
              style={styles.leftCameraButton}
              onPress={launchCamera}
            >
              <Icon name="camera" />
            </Button>
            <Button
              bordered
              full
              style={styles.rightCameraButton}
              onPress={chooseImage}
            >
              <Text>Choose</Text>
            </Button>
          </CardItem>
          <CardItem style={{ justifyContent: "center" }}>
            <Button
              iconLeft
              style={{ borderRadius: 50 }}
              onPress={createIngredient}
              disabled={!ingredientName || !imageUri || uploading}
            >
              <Icon name="add" />
              <Text>Create</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
