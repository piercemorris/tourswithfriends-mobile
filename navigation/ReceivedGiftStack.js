import {
  createStackNavigator,
  TransitionPresets
} from "react-navigation-stack";

import BeginTourScreen from "../screens/ReceivedGiftsStack/BeginTourScreen";
import Colors from "../constants/Colors";

const ReceivedGiftStack = createStackNavigator(
  {
    BeginTour: BeginTourScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarVisible: false
    },
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: Colors.white
      },
      tabBarVisible: null,
      gestureEnabled: true
    }
  }
);

export default ReceivedGiftStack;
