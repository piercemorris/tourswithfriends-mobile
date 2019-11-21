import { Dimensions } from "react-native";

import Colors from "./Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
  window: {
    width,
    height
  },
  isSmallDevice: width < 375,
  radius: 15,
  shadow: {
    shadowColor: Colors.grey,
    shadowRadius: 10,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.4,
    elevation: 10
  },
  buttonContainer: {
    justifyContent: "center",
    borderWidth: 5,
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 10
  }
};
