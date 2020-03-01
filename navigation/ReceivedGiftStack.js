import {
  createStackNavigator,
  TransitionPresets
} from "react-navigation-stack";

import ImageRevealScreen from "../screens/ReceivedGiftsStack/ImageRevealScreen";
import AudioRevealScreen from "../screens/ReceivedGiftsStack/AudioRevealScreen";
import BeginTourScreen from "../screens/ReceivedGiftsStack/BeginTourScreen";
import TourListScreen from "../screens/ReceivedGiftsStack/TourListScreen";
import TourItemScreen from "../screens/ReceivedGiftsStack/TourItemScreen";
import Colors from "../constants/Colors";

const ReceivedGiftStack = createStackNavigator(
  {
    BeginTour: BeginTourScreen,
    TourList: TourListScreen,
    TourItem: TourItemScreen,
    ImageReveal: ImageRevealScreen,
    AudioReveal: AudioRevealScreen
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
