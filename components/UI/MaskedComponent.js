import React from "react";
import PropTypes from "prop-types";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

const Wrapper =
  Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

const MaskedComponent = props => {
  return (
    <View style={{ ...props.style, ...styles.container }}>
      <Wrapper
        useForeground={true}
        onPress={() => {
          props.navigation.navigate(props.screen);
        }}
      >
        <View style={styles.container}>
          <ImageBackground
            imageStyle={styles.image}
            style={styles.imageBackground}
            source={props.source}
          >
            <Text style={styles.text}>{props.text}</Text>
          </ImageBackground>
        </View>
      </Wrapper>
    </View>
  );
};

MaskedComponent.propTypes = {
  navigation: PropTypes.object,
  screen: PropTypes.string,
  source: PropTypes.number,
  text: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: Layout.window.width - 40,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginTop: 15
  },
  image: {
    borderRadius: 15
  },
  imageBackground: {
    ...Layout.shadow,
    ...{
      width: Layout.window.width - 40,
      height: 250,
      resizeMode: "cover",
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
