import { createStackNavigator } from "react-navigation-stack";

import RepresentationScreen from "../screens/CreateGiftStack/RepresentationScreen";
import SelectLocationScreen from "../screens/CreateGiftStack/SelectLocationScreen";
import LocationScreen from "../screens/CreateGiftStack/LocationScreen";
import CameraScreen from "../screens/Representation/CameraScreen";
import ImageScreen from "../screens/Representation/ImageScreen";

const CreateGiftStack = createStackNavigator(
  {
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
      headerShown: false,
      tabBarVisible: null
    }
  }
);

export default CreateGiftStack;
