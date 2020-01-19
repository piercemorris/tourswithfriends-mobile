import {
  createStackNavigator,
  TransitionPresets
} from "react-navigation-stack";

import BeginTourScreen from "../screens/ReceivedGiftsStack/BeginTourScreen";

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
  }
);

export default ReceivedGiftStack;
