import React, { useState, useReducer, useEffect, useCallback } from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Input from "../../components/UI/Input";
import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import StyledText from "../../components/StyledText";
import BackButton from "../../components/UI/BackButton";
import Colors from "../../constants/Colors";

import { formReducer, FORM_INPUT_UPDATE } from "../../helper/reusableFunctions";
import * as locationActions from "../../store/actions/location";

const FriendDetailsScreen = props => {
  [error, setError] = useState(false);
  [errorMessage, setErrorMessage] = useState("");
  const friendDetails = useSelector(store => store.gift.friendDetails);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      email: "",
      description: ""
    },
    inputValidities: {
      name: false,
      email: false,
      description: false
    },
    formIsValid: false
  });

  const goBackHandler = () => {
    let action;
    if (formState.formIsValid) {
      action = locationActions.updateFriendDetails(
        formState.inputValues.name,
        formState.inputValues.email,
        formState.inputValues.description
      );
      dispatch(action);
      props.navigation.pop();
    } else {
      if (formState.formIsValid === false) {
        if (formState.inputValidities.name === false) {
          setErrorMessage("Please fill in a valid name.");
          setError(true);
        }

        if (formState.inputValidities.email === false) {
          setErrorMessage(prevError => {
            if (prevError !== "") {
              return prevError + " Please fill in a valid email address.";
            } else {
              return "Please fill in a valid email address.";
            }
          });
          setError(true);
        }

        if (formState.inputValidities.description === false) {
          setErrorMessage(prevError => {
            if (prevError !== "") {
              return (
                prevError +
                " Please fill in a valid description of your friend."
              );
            } else {
              return "Please fill in a valid description of your friend.";
            }
          });
          setError(true);
        }
      } else {
        props.navigation.pop();
      }
    }
  };

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

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", errorMessage, [{ text: "Ok" }]);
      setError(false);
      setErrorMessage("");
    }
  }, [error, errorMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        <BackButton {...props} />
        <Header title="Your friend" subtitle="Just some details" />
        <StyledText>
          To send your gift successfully we need details about your friend.
        </StyledText>
        <Input
          required
          id="name"
          title="Name"
          defaultValue={friendDetails ? friendDetails.name : ""}
          onInputChange={inputChangedHandler}
        />
        <Input
          email
          required
          id="email"
          title="Email"
          defaultValue={friendDetails ? friendDetails.email : ""}
          onInputChange={inputChangedHandler}
        />
        <Input
          id="description"
          required
          title="A description about your friend"
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          defaultValue={friendDetails ? friendDetails.description : ""}
          onInputChange={inputChangedHandler}
        />
        <StyledText style={{ color: Colors.lightGrey }}>
          This information is to send an email to your friend to either be
          invited to download the app or a link to open the app on their device.
        </StyledText>
        <Button onPress={() => goBackHandler()}>Complete</Button>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default FriendDetailsScreen;
