import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  uploadInfoContainer: {
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
  },
  firstInput: {
    marginTop: 8,
  },
  imageContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { height: 120, width: 120, borderRadius: 60 },
  leftCameraButton: {
    flex: 1,
    marginRight: 4,
    borderRadius: 50,
  },
  rightCameraButton: { flex: 1, marginLeft: 4, borderRadius: 50 },
  centered: { justifyContent: "center" },
});
