import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Platform,
  View,
  Text
} from "react-native";

import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import StyledText from "../StyledText";

const Wrapper =
  Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

const ButtonInverse = props => {
  return (
    <Wrapper
      style={{ ...styles.container, ...props.style }}
      onPress={props.onPress}
    >
      <View style={{ ...styles.viewContainer, ...props.viewStyle }}>
        <StyledText bold style={{ padding: 0, color: Colors.secondary }}>
          {props.text}
        </StyledText>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.shadow,
    justifyContent: "center",
    borderWidth: 5,
    borderColor: Colors.secondary,
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 10
  }
});

export default ButtonInverse;
