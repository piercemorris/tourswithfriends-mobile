import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import AuthScreen from "../screens/AuthScreen";
import Colors from "../constants/Colors";

const AuthStack = createStackNavigator(
  {
    Auth: { screen: AuthScreen, navigationOptions: { headerShown: false } }
  },
  {
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: Colors.white
      }
    }
  }
);

export default AuthStack;
