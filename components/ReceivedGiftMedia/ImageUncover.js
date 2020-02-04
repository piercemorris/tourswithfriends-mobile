import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground
} from "react-native";

import StyledText from "../StyledText";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

const ImageUncover = ({ name, mediaFileRef }) => {
  const [isCovered, setIsCovered] = useState(true);
  const [blurValue, setBlurValue] = useState(100);

  const beginAnimation = () => {
    setBlurValue(0);
    setIsCovered(false);
  };

  return (
    <View style={styles.cover}>
      <TouchableWithoutFeedback onPress={() => beginAnimation()}>
        <View>
          <ImageBackground
            blurRadius={blurValue}
            style={styles.image}
            source={{ uri: mediaFileRef }}
            imageStyle={{ borderRadius: 15 }}
          >
            {isCovered ? (
              <StyledText bold style={{ padding: 0, color: Colors.white }}>
                Tap to uncover
              </StyledText>
            ) : null}
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

// <TouchableWithoutFeedback onPress={() => beginAnimation()}>

const styles = StyleSheet.create({
  cover: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: Layout.window.width - 40,
    height: Layout.window.height / 1.5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ImageUncover;
