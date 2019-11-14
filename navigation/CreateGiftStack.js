import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import SelectLocationScreen from "../screens/CreateGiftStack/SelectLocationScreen";
import FriendDetailsScreen from "../screens/CreateGiftStack/FriendDetailsScreen";
import TourDetailsScreen from "../screens/CreateGiftStack/TourDetailsScreen";
import RepresentationScreen from "../screens/CreateGiftStack/RepresentationScreen";
import HelpfulTipsScreen from "../screens/CreateGiftStack/HelpfulTipsScreen";
import LocationScreen from "../screens/CreateGiftStack/LocationScreen";
import ImageScreen from "../screens/Representation/ImageScreen";
import CameraScreen from "../screens/Representation/CameraScreen";

const CreateGiftStack = createStackNavigator(
  {
    HelpfulTips: HelpfulTipsScreen,
    FriendDetails: FriendDetailsScreen,
    TourDetails: TourDetailsScreen,
    Location: LocationScreen,
    SelectLocation: SelectLocationScreen,
    Representation: RepresentationScreen,
    Image: ImageScreen,
    Camera: CameraScreen
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
