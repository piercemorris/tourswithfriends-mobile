import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";

import Colors from "../../constants/Colors";

const MaskedComponent = props => {
  return (
    <View style={{ ...props.style, ...styles.container }}>
      <ImageBackground
        imageStyle={styles.image}
        style={styles.imageBackground}
        source={props.source}
      >
        <Text style={styles.text}>{props.text}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    borderRadius: 15
  },
  imageBackground: {
    marginTop: 30,
    width: Dimensions.get("window").width - 40,
    height: 250,
    resizeMode: "cover",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.grey,
    shadowRadius: 8,
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 10,
    elevation: 15
  },
  text: {
    fontFamily: Platform.OS === "ios" ? "sf-bold" : "roboto-bold",
    fontSize: 34,
    color: Colors.white
  }
});

export default MaskedComponent;
