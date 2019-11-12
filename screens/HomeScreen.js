import React from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";

import MaskedComponent from "../components/UI/MaskedComponent";
import Header from "../components/UI/Header";

const HomeScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header main title="Welcome" subtitle="Start by selecting an action" />
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
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
