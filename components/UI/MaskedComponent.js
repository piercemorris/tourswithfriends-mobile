import React from "react";
import PropTypes from "prop-types";
import {
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";

import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

const MaskedComponent = props => {
  return (
    <TouchableOpacity
      style={{ ...props.style, ...styles.container }}
      onPress={() => {
        props.navigation.navigate(props.screen);
      }}
    >
      <ImageBackground
        imageStyle={styles.image}
        style={styles.imageBackground}
        source={props.source}
      >
        <Text style={styles.text}>{props.text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

MaskedComponent.propTypes = {
  navigation: PropTypes.object,
  screen: PropTypes.string,
  source: PropTypes.number,
  text: PropTypes.string
};

const styles = StyleSheet.create({
  container: {},
  image: {
    borderRadius: 15
  },
  imageBackground: {
    ...Layout.shadow,
    ...{
      marginTop: 30,
      width: Layout.window.width - 40,
      height: 250,
      resizeMode: "cover",
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center"
    }
  },
  text: {
    fontFamily: Platform.OS === "ios" ? "sf-bold" : "roboto-bold",
    fontSize: 34,
    color: Colors.white
  }
});

export default MaskedComponent;
