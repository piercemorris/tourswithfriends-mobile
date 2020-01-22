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
      tabBarVisible: null,
      gestureEnabled: true
    }
  },
  {
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: Colors.white
      }
    }
  }
);

export default ReceivedGiftStack;
