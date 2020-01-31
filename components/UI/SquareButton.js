import React from "react";
import PropTypes from "prop-types";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Platform,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import StyledText from "../StyledText";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

const SquareButton = props => {
  const color = props.completed ? Colors.complete : Colors.secondary;

  let Wrapper;
  if (Platform.OS === "ios") {
    Wrapper = TouchableOpacity;
  } else {
    Wrapper = TouchableNativeFeedback;
  }

  return (
    <Wrapper
      onPress={props.onPress}
      style={
        props.completed
          ? { ...styles.complete, ...props.style }
          : { ...styles.container, ...props.style }
      }
    >
      <View
        style={
          props.completed
            ? { ...styles.contentContainer, backgroundColor: Colors.complete }
            : { ...styles.contentContainer, backgroundColor: Colors.secondary }
        }
      >
        <Ionicons
          name={
            Platform.OS === "ios" ? `ios-${props.icon}` : `md-${props.icon}`
          }
          size={56}
          color={Colors.white}
        />
        <StyledText bold style={styles.text}>
          {props.name}
        </StyledText>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.squareButtonContainer,
    ...Layout.shadow,
    backgroundColor: Colors.secondary
  },
  complete: {
    ...Layout.squareButtonContainer,
    ...Layout.shadow,
    backgroundColor: Colors.complete
  },
  contentContainer: {
    ...Layout.squareButtonContainer,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    padding: 0,
    color: Colors.white
  }
});

SquareButton.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default SquareButton;
