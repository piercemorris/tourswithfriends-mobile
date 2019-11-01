import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";

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
        {isSignUp ? "Sign Up" : "Login"}
      </StyledText>
      <Image
        style={styles.image}
        source={require("../assets/images/iconInv.png")}
      />
      {isSignUp ? <Input title="Username" /> : null}
      <Input title="Email Address" />
      <Input title="Password" />
      {isSignUp ? <Input title="Confirm password" /> : null}
      <Button style={{ marginVertical: 30 }}>
        {isSignUp ? "Sign up" : "Login"}
      </Button>
      <View style={styles.alternateContainer}>
        <StyledText bold style={styles.alternate}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </StyledText>
        <TouchableOpacity onPress={() => setIsSignUp(prevValue => !prevValue)}>
          <StyledText bold style={styles.textButton}>
            {isSignUp ? "Login" : "Sign up"}
          </StyledText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
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
