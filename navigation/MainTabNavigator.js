import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import TabBarIcon from "../components/TabBarIcon";

import HomeScreen from "../screens/HomeScreen";
import CreateScreen from "../screens/CreateScreen";
import ReceivedScreen from "../screens/ReceivedScreen";
import AccountScreen from "../screens/AccountScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LinksScreen from "../screens/LinksScreen";
import Colors from "../constants/Colors";

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white"
  },
  headerTitleStyle: {
    fontFamily: Platform.OS === "ios" ? "sf-bold" : "roboto-bold"
  },
  headerBackTitleStyle: {
    fontFamily: Platform.OS === "ios" ? "sf-regular" : "roboto-regular"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: {} }
  },
  defaultStackNavigationOptions
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

HomeStack.path = "";

const CreateStack = createStackNavigator(
  {
    Create: { screen: CreateScreen, navigationOptions: { header: null } }
  },
  defaultStackNavigationOptions
);

CreateStack.navigationOptions = {
  tabBarLabel: "Create",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-cube" : "md-cube"}
    />
  )
};

CreateStack.path = "";

const ReceivedStack = createStackNavigator(
  {
    Received: { screen: ReceivedScreen, navigationOptions: { header: null } }
  },
  defaultStackNavigationOptions
);

ReceivedStack.navigationOptions = {
  tabBarLabel: "Received",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-gift" : "md-gift"}
    />
  )
};

ReceivedStack.path = "";

const AccountStack = createStackNavigator(
  {
    Account: { screen: AccountScreen, navigationOptions: { header: null } }
  },
  defaultStackNavigationOptions
);

AccountStack.navigationOptions = {
  tabBarLabel: "Account",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  )
};

AccountStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: { screen: SettingsScreen, navigationOptions: { header: null } }
  },
  defaultStackNavigationOptions
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

SettingsStack.path = "";

const tabScreenConfig = {
  HomeStack: { screen: HomeStack, navigationOptions: { tabBarVisible: true } },
  CreateStack,
  ReceivedStack,
  AccountStack,
  SettingsStack
};

const tabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: Colors.primary,
        shifting: true
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "sf-regular"
          },
          activeTintColor: Colors.primary
        }
      });

tabNavigator.path = "";

export default tabNavigator;
