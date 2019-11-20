import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Platform,
  View,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
        <Ionicons
          name={
            Platform.OS === "ios" ? "ios-arrow-forward" : "md-arrow-forward"
          }
          size={32}
          color={Colors.secondary}
        />
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
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default ButtonInverse;
