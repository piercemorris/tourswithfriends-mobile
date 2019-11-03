import React from "react";
import Firebase from "firebase";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import Button from "../components/UI/Button";
import Header from "../components/UI/Header";

const SettingsScreen = props => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <Header main title="Settings" />
      <Button
        style={{ marginBottom: 25 }}
        onPress={() =>
          Firebase.auth()
            .signOut()
            .then(() => props.navigation.navigate("Initial"))
        }
      >
        Logout
      </Button>
    </SafeAreaView>
  );
};

export default SettingsScreen;
