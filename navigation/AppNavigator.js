import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import InitialScreen from "../screens/InitialScreen";
import AuthStack from "./AuthStack";
import MainTabNavigator from "./MainTabNavigator";

export default createAppContainer(
  createSwitchNavigator({
    Initial: InitialScreen,
    Auth: AuthStack,
    Main: MainTabNavigator
  })
);
