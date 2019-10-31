import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";

import StyledText from "../components/StyledText";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Colors from "../constants/Colors";

const AuthScreen = props => {
  [isSignUp, setIsSignUp] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StyledText
        bold
        style={{ fontSize: 34, alignSelf: "center", paddingTop: 50 }}
      >
        Sign Up
      </StyledText>
      <Image
        style={styles.image}
        source={require("../assets/images/iconInv.png")}
      />
      <Input title="Username" />
      <Input title="Email Address" />
      <Input title="Password" />
      <Input title="Confirm password" />
      <Button style={{ marginVertical: 30 }}>Sign up</Button>
      <View style={styles.alternateContainer}>
        <StyledText bold style={styles.alternate}>
          Already have an account?
        </StyledText>
        <StyledText bold style={styles.textButton}>
          Login
        </StyledText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 15,
    alignSelf: "center"
  },
  alternateContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  alternate: {
    fontSize: 18,
    color: Colors.lightGrey,
    padding: 0
  },
  textButton: {
    color: Colors.secondary,
    fontSize: 18,
    padding: 0
  }
});

export default AuthScreen;
