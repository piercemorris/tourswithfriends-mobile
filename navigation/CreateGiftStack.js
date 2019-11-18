import { createStackNavigator } from "react-navigation";

import RepresentationScreen from "../screens/CreateGiftStack/RepresentationScreen";
import SelectLocationScreen from "../screens/CreateGiftStack/SelectLocationScreen";
import FriendDetailsScreen from "../screens/CreateGiftStack/FriendDetailsScreen";
import TourDetailsScreen from "../screens/CreateGiftStack/TourDetailsScreen";
import LocationScreen from "../screens/CreateGiftStack/LocationScreen";
import GiftSetScreen from "../screens/CreateGiftStack/GiftSetScreen";
import CameraScreen from "../screens/Representation/CameraScreen";
import ImageScreen from "../screens/Representation/ImageScreen";

const CreateGiftStack = createStackNavigator(
  {
    GiftSet: GiftSetScreen,
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
