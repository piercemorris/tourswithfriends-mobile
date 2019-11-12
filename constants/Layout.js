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
  }
};
