import { API_KEY, DOMAIN } from "@env";
import "@firebase/auth";
import "@firebase/firestore";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: DOMAIN,
  databaseURL: DOMAIN,
  projectId: "foodmate-ea3fc",
  storageBucket: "foodmate-ea3fc.appspot.com",
  appId: "com.kevelopment.foodmate",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
