import { createStackNavigator } from "react-navigation";

import FriendDetailsScreen from "../screens/CreateGiftStack/FriendDetailsScreen";
import TourDetailsScreen from "../screens/CreateGiftStack/TourDetailsScreen";
import GiftSetScreen from "../screens/CreateGiftStack/GiftSetScreen";

import LocationStack from "./LocationStack";

const CreateGiftStack = createStackNavigator(
  {
    GiftSet: GiftSetScreen,
    FriendDetails: FriendDetailsScreen,
    TourDetails: TourDetailsScreen,
    LocationStack: LocationStack
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
