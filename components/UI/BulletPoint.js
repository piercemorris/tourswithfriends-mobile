import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet } from "react-native";

import StyledText from "../StyledText";

const BulletPoint = props => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.point}
        source={require("../../assets/images/ellipse.png")}
      />
      <StyledText style={{ padding: 0 }}>{props.text}</StyledText>
    </View>
  );
};

BulletPoint.propTypes = {
  text: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20
  },
  point: { width: 10, height: 10, marginHorizontal: 8 }
});

export default BulletPoint;
