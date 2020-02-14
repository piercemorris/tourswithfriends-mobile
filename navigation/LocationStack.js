import { createStackNavigator } from "react-navigation-stack";

import RepresentationScreen from "../screens/CreateGiftStack/RepresentationScreen";
import SelectLocationScreen from "../screens/CreateGiftStack/SelectLocationScreen";
import LocationScreen from "../screens/CreateGiftStack/LocationScreen";
import CameraScreen from "../screens/Representation/CameraScreen";
import ImageScreen from "../screens/Representation/ImageScreen";

import TakeLocationScreen from "../screens/CreateGiftStack/CreateTourItemStack/TakeLocationScreen";
import TakeImageScreen from "../screens/CreateGiftStack/CreateTourItemStack/TakeImageScreen";
import TakeAudioScreen from "../screens/CreateGiftStack/CreateTourItemStack/TakeAudioScreen";

const CreateGiftStack = createStackNavigator(
  {
    TakeAudio: TakeAudioScreen, //change to last TAKE screen
    TakeLocation: TakeLocationScreen,
    TakeImage: TakeImageScreen,
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
