import {
  createStackNavigator,
  TransitionPresets
} from "react-navigation-stack";
import { Platform } from "react-native";

import FriendDetailsScreen from "../screens/CreateGiftStack/FriendDetailsScreen";
import TourDetailsScreen from "../screens/CreateGiftStack/TourDetailsScreen";
import GiftSetScreen from "../screens/CreateGiftStack/GiftSetScreen";

import LocationStack from "./LocationStack";
import Colors from "../constants/Colors";

const CreateGiftStack = createStackNavigator(
  {
    GiftSet: GiftSetScreen,
    FriendDetails: { screen: FriendDetailsScreen },
    TourDetails: TourDetailsScreen,
    LocationStack: LocationStack
  },
  {
    mode: "modal",
    headerMode: "none",
    navigationOptions: {
      tabBarVisible: false
    },
    defaultNavigationOptions:
      Platform.OS === "ios"
        ? {
            cardStyle: {
              backgroundColor: Colors.white
            },
            tabBarVisible: null,
            gestureEnabled: true,
            cardOverlayEnabled: true,
            ...TransitionPresets.ModalPresentationIOS
          }
        : {
            cardStyle: {
              backgroundColor: Colors.white
            },
            tabBarVisible: null,
            gestureEnabled: true,
            cardOverlayEnabled: true
          }
  }
);

export default CreateGiftStack;
