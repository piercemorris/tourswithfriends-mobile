import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthStack from "./AuthStack";
import MainTabNavigator from "./MainTabNavigator";

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    Main: MainTabNavigator
  })
);
