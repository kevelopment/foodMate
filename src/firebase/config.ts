import "@firebase/auth";
import "@firebase/firestore";
import firebase from "firebase";
import { FIREBASE_API_KEY, FIREBASE_DOMAIN } from "react-native-dotenv";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_DOMAIN,
  databaseURL: FIREBASE_DOMAIN,
  projectId: "foodmate-ea3fc",
  storageBucket: "foodmate-ea3fc.appspot.com",
  appId: "com.kevelopment.foodmate",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
