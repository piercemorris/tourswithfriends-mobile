import {
  createStackNavigator,
  TransitionPresets
} from "react-navigation-stack";

import UncoverTourItemScreen from "../screens/ReceivedGiftsStack/UncoverTourItemScreen";
import BeginTourScreen from "../screens/ReceivedGiftsStack/BeginTourScreen";
import TourListScreen from "../screens/ReceivedGiftsStack/TourListScreen";
import TourItemScreen from "../screens/ReceivedGiftsStack/TourItemScreen";
import Colors from "../constants/Colors";

const ReceivedGiftStack = createStackNavigator(
  {
    BeginTour: BeginTourScreen,
    TourList: TourListScreen,
    TourItem: TourItemScreen,
    UncoverTourItem: UncoverTourItemScreen
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
