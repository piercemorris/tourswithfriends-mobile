import React from "react";
import { View, Text, StyleSheet } from "react-native";

import StyledText from "../../components/StyledText";
import Colors from "../../constants/Colors";

const Subsection = props => {
  return (
    <View style={styles.container}>
      <StyledText bold style={styles.text}>
        {props.text}
      </StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 25
  },
  text: {
    padding: 0,
    fontSize: 28,
    lineHeight: 32
  }
});

export default Subsection;
