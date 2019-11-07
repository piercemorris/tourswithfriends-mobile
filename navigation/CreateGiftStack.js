import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import SelectLocationScreen from "../screens/CreateGiftStack/SelectLocationScreen";
import FriendDetailsScreen from "../screens/CreateGiftStack/FriendDetailsScreen";
import TourDetailsScreen from "../screens/CreateGiftStack/TourDetailsScreen";
import HelpfulTipsScreen from "../screens/CreateGiftStack/HelpfulTipsScreen";
import LocationScreen from "../screens/CreateGiftStack/LocationScreen";

const CreateGiftStack = createStackNavigator(
  {
    HelpfulTips: HelpfulTipsScreen,
    FriendDetails: FriendDetailsScreen,
    TourDetails: TourDetailsScreen,
    Location: LocationScreen,
    SelectLocation: SelectLocationScreen
  },
  {
    navigationOptions: {
      tabBarVisible: false
    },
    defaultNavigationOptions: {
      header: null,
      tabBarVisible: null
    }
  }
);

export default CreateGiftStack;
