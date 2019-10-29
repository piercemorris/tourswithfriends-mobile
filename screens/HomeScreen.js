import React from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";

import MaskedComponent from "../components/UI/MaskedComponent";
import Header from "../components/UI/Header";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header title="Welcome" subtitle="Start by selecting an action" />
        <View style={{ alignSelf: "center" }}>
          <MaskedComponent
            source={require("../assets/images/maskedGroup.png")}
            text="CREATE A GIFT"
          />
          <MaskedComponent
            source={require("../assets/images/maskedGroup2.png")}
            text="RECEIVED GIFTS"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
