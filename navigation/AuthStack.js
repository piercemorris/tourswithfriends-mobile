import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import AuthScreen from "../screens/AuthScreen";

const AuthStack = createStackNavigator({
  Auth: { screen: AuthScreen, navigationOptions: { headerShown: false } }
});

export default AuthStack;
