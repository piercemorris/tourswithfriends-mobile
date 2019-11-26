import {
  createStackNavigator,
  TransitionPresets
} from "react-navigation-stack";

import FriendDetailsScreen from "../screens/CreateGiftStack/FriendDetailsScreen";
import TourDetailsScreen from "../screens/CreateGiftStack/TourDetailsScreen";
import GiftSetScreen from "../screens/CreateGiftStack/GiftSetScreen";

import LocationStack from "./LocationStack";

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
    defaultNavigationOptions: {
      tabBarVisible: null,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS
    }
  }
);

export default CreateGiftStack;
