import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";

import MaskedComponent from "../components/UI/MaskedComponent";
import Header from "../components/UI/Header";

import { registerForPushNotificationsAsync } from "../helper/pushNotifications";

const HomeScreen = props => {
  const displayName = useSelector(store => store.auth.displayName);

  _registerForPushNotifications = async () => {
    await registerForPushNotificationsAsync();
  };

  useEffect(() => {
    _registerForPushNotifications();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          main
          title={`Welcome ${displayName ? displayName : ""}`}
          subtitle="Start by selecting an action"
        />
        <View style={{ alignSelf: "center" }}>
          <MaskedComponent
            navigation={props.navigation}
            screen="Create"
            source={require("../assets/images/maskedGroup.png")}
            text="CREATE A GIFT"
          />
          <MaskedComponent
            navigation={props.navigation}
            style={{ marginBottom: 30 }}
            screen="Received"
            source={require("../assets/images/maskedGroup2.png")}
            text="RECEIVED GIFTS"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

HomeScreen.navigationOptions = {
  headerShown: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
