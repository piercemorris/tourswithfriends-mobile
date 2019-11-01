import React, { useState, useReducer, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";

import * as authActions from "../store/actions/auth";
import StyledText from "../components/StyledText";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Colors from "../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  [isSignUp, setIsSignUp] = useState(false);
  [error, setError] = useState(false);
  [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
      confirmpassword: ""
    },
    inputValidities: {
      email: false,
      password: false,
      confirmpassword: false
    },
    formIsValid: false
  });

  const authHandler = async () => {
    let action;
    if (isSignUp && formState.formIsValid) {
      if (
        formState.inputValues.password.trim() ===
        formState.inputValues.confirmpassword.trim()
      ) {
        action = authActions.signUp(
          formState.inputValues.email,
          formState.inputValues.password
        );
      }
    } else if (
      !isSignUp &&
      formState.inputValidities.email &&
      formState.inputValidities.password
    ) {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    let errorMessage;
    if (action === undefined) {
      if (!formState.inputValidities.email) {
        errorMessage = "Please fill in a valid email.";
      } else if (!formState.inputValidities.password) {
        errorMessage = "Please fill in the correct password.";
      } else if (
        isSignUp &&
        formState.inputValues.password.trim() !==
          formState.inputValues.confirmpassword.trim()
      ) {
        errorMessage = "Password and your confirmed password doesn't match.";
      }
    }

    try {
      setIsLoading(true);
      if (action === undefined) {
        throw errorMessage;
      }
      await dispatch(action);
      setIsLoading(false);
      props.navigation.navigate("Main");
    } catch (err) {
      setIsLoading(false);
      Alert.alert("An error occurred!", err, [{ text: "Ok" }]);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert(
        "An error occurred!",
        "Please correctly fill in all the of fields",
        [{ text: "Ok" }]
      );
    }
  }, [error]);

  const inputChangedHandler = useCallback(
    (inputIdentifer, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifer
      });
    },
    [dispatchFormState]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StyledText
        bold
        style={{ fontSize: 34, alignSelf: "center", paddingTop: 50 }}
      >
        {isSignUp ? "Sign up" : "Log in"}
      </StyledText>
      <Image
        style={styles.image}
        source={require("../assets/images/iconInv.png")}
      />
      {!isLoading ? (
        <View>
          <Input
            email
            id="email"
            required
            title="Email Address"
            onInputChange={inputChangedHandler}
          />
          <Input
            required
            id="password"
            password
            title="Password"
            onInputChange={inputChangedHandler}
          />
          {isSignUp ? (
            <Input
              required
              password
              id="confirmpassword"
              title="Confirm password"
              onInputChange={inputChangedHandler}
            />
          ) : null}
          <Button style={{ marginVertical: 30 }} onPress={authHandler}>
            {isSignUp ? "Sign up" : "Log in"}
          </Button>
          <View style={styles.alternateContainer}>
            <StyledText bold style={styles.alternate}>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </StyledText>
            <TouchableOpacity
              onPress={() => setIsSignUp(prevValue => !prevValue)}
            >
              <StyledText bold style={styles.textButton}>
                {isSignUp ? "Login" : "Sign up"}
              </StyledText>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ActivityIndicator
          style={{ marginVertical: 15 }}
          size="large"
          color={Colors.primary}
        />
      )}
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
