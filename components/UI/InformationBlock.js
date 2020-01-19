import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import StyledText from "../StyledText";

const InformationBlock = props => {
  if (!props.empty) {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("ReceivedStack")}
      >
        <LinearGradient
          style={styles.container}
          colors={[Colors.primary, Colors.secondary]}
        >
          <StyledText bold style={styles.text}>
            {props.name}
          </StyledText>
          <StyledText style={styles.smallText}>in</StyledText>
          <StyledText bold style={styles.text}>
            {props.city}
          </StyledText>
        </LinearGradient>
      </TouchableOpacity>
    );
  } else {
    return <View style={styles.containerEmpty}></View>;
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: Layout.window.height / 5,
    width: Layout.window.width / 2.5,
    borderRadius: Layout.radius,
    marginLeft: 15,
    marginTop: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  containerEmpty: {
    backgroundColor: "#FFFFFF",
    height: Layout.window.height / 5,
    width: Layout.window.width / 2.5,
    borderRadius: Layout.radius,
    borderStyle: "dashed",
    borderColor: Colors.inputShade,
    borderWidth: 3,
    marginLeft: 15,
    marginTop: 15,
    padding: 10
  },
  text: {
    padding: 0,
    fontSize: 18,
    color: Colors.white,
    textAlign: "center"
  },
  smallText: {
    padding: 0,
    fontSize: 18,
    color: Colors.white,
    textAlign: "center"
  }
});

export default InformationBlock;
