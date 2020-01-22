import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createStackNavigator } from "react-navigation-stack";

import CreateGiftStack from "./CreateGiftStack";
import ReceivedGiftStack from "./ReceivedGiftStack";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import CreateScreen from "../screens/CreateScreen";
import ReceivedScreen from "../screens/ReceivedScreen";
import AccountScreen from "../screens/AccountScreen";
import SettingsScreen from "../screens/SettingsScreen";
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
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,

  defaultNavigationOptions: {
    headerShown: false,
    cardStyle: {
      backgroundColor: Colors.white
    }
  }
};

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
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
    Create: { screen: CreateScreen },
    CreateStack: {
      screen: CreateGiftStack
    }
  },
  defaultStackNavigationOptions
);

CreateStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName === "CreateStack") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: "Create",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === "ios" ? "ios-cube" : "md-cube"}
      />
    )
  };
};

const ReceivedStack = createStackNavigator(
  {
    Received: {
      screen: ReceivedScreen
    },
    ReceivedStack: {
      screen: ReceivedGiftStack
    }
  },
  defaultStackNavigationOptions
);

ReceivedStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName === "ReceivedStack") {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: "Received",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === "ios" ? "ios-gift" : "md-gift"}
      />
    )
  };
};

ReceivedStack.path = "";

const AccountStack = createStackNavigator(
  {
    screen: AccountScreen
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

const SettingsStack = createStackNavigator(
  {
    screen: SettingsScreen
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
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primary
        }
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
