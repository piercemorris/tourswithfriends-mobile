import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import HelpfulTipsScreen from "../screens/CreateGiftStack/HelpfulTipsScreen";
import FriendDetailsScreen from "../screens/CreateGiftStack/FriendDetailsScreen";
import TourDetailsScreen from "../screens/CreateGiftStack/TourDetailsScreen";

const CreateGiftStack = createStackNavigator(
  {
    HelpfulTips: HelpfulTipsScreen,
    FriendDetails: FriendDetailsScreen,
    TourDetails: TourDetailsScreen
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
