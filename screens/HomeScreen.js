import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions
} from "react-native";

import Colors from "../constants/Colors";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Start by selecting an action</Text>
      <View>
        <ImageBackground
          imageStyle={{ borderRadius: 15 }}
          style={{
            marginTop: 30,
            width: Dimensions.get("window").width - 40,
            height: 250,
            resizeMode: "cover",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center"
          }}
          source={require("../assets/images/maskedGroup.png")}
        >
          <Text style={styles.text}>CREATE A GIFT</Text>
        </ImageBackground>
        <ImageBackground
          imageStyle={{ borderRadius: 15 }}
          style={{
            marginTop: 30,
            width: Dimensions.get("window").width - 40,
            height: 250,
            resizeMode: "cover",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center"
          }}
          source={require("../assets/images/maskedGroup2.png")}
        >
          <Text style={styles.text}>RECEIVED GIFTS</Text>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 20
  },
  title: {
    fontFamily: "sf-bold",
    fontSize: 36,
    paddingTop: 25
  },
  subtitle: {
    fontFamily: "sf-bold",
    fontSize: 20,
    color: Colors.grey
  },
  text: {
    fontFamily: "sf-bold",
    fontSize: 34,
    color: Colors.white
  }
});
