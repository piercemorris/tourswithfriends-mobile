import React from "react";
import { createStackNavigator } from "react-navigation";

import AuthScreen from "../screens/AuthScreen";

const AuthStack = createStackNavigator({
  Auth: { screen: AuthScreen, navigationOptions: { header: null } }
});

export default AuthStack;
