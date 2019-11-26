import React, { useState, useReducer, useEffect, useCallback } from "react";
import { StyleSheet, SafeAreaView, Alert, Keyboard } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Input from "../../components/UI/Input";
import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import BackButton from "../../components/UI/BackButton";
import StyledText from "../../components/StyledText";
import Colors from "../../constants/Colors";

import { formReducer, FORM_INPUT_UPDATE } from "../../helper/reusableFunctions";
import * as locationActions from "../../store/actions/location";
import Layout from "../../constants/Layout";

const TourDetailsScreen = props => {
  [error, setError] = useState(false);
  [errorMessage, setErrorMessage] = useState("");
  const tourDetails = useSelector(store => store.gift.tourDetails);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      city: "",
      description: "",
      start: ""
    },
    inputValidities: {
      title: false,
      city: false,
      description: false,
      start: false
    },
    formIsValid: false
  });

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

  const goBackHandler = () => {
    let action;
    if (formState.formIsValid) {
      action = locationActions.updateTourDetails(
        formState.inputValues.title,
        formState.inputValues.city,
        formState.inputValues.description,
        formState.inputValues.start
      );
      dispatch(action);
      props.navigation.pop();
    } else {
      if (formState.formIsValid === false) {
        if (formState.inputValidities.title === false) {
          setErrorMessage("Please fill in a valid title.");
          setError(true);
        }

        if (formState.inputValidities.city === false) {
          setErrorMessage(prevError => {
            if (prevError !== "") {
              return prevError + " Please fill in a valid city address.";
            } else {
              return "Please fill in a valid city address.";
            }
          });
          setError(true);
        }

        if (formState.inputValidities.description === false) {
          setErrorMessage(prevError => {
            if (prevError !== "") {
              return (
                prevError + " Please fill in a valid description of your tour."
              );
            } else {
              return "Please fill in a valid description of your tour.";
            }
          });
          setError(true);
        }

        if (formState.inputValidities.start === false) {
          setErrorMessage(prevError => {
            if (prevError !== "") {
              return (
                prevError + " Please fill in a valid starting description."
              );
            } else {
              return "Please fill in a valid starting description.";
            }
          });
          setError(true);
        }
      } else {
        props.navigation.pop();
      }
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", errorMessage, [{ text: "Ok" }]);
      setError(false);
      setErrorMessage("");
    }
  }, [error, errorMessage]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        <BackButton {...props} close />
        <Header title="Tour Details" subtitle="Describe your tour" />
        <StyledText>
          To package your tour, we need some details about what the tour is
          about, and where it will begin.
        </StyledText>
        <Input
          required
          id="title"
          title="Title"
          defaultValue={tourDetails ? tourDetails.title : ""}
          onInputChange={inputChangedHandler}
        />
        <Input
          required
          id="city"
          title="City/location"
          defaultValue={tourDetails ? tourDetails.city : ""}
          onInputChange={inputChangedHandler}
        />
        <Input
          required
          id="description"
          title="Tour description"
          returnKeyType="done"
          blurOnSubmit={true}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          defaultValue={tourDetails ? tourDetails.description : ""}
          onInputChange={inputChangedHandler}
        />
        <Input
          required
          id="start"
          title="Describe the starting location"
          returnKeyType="done"
          blurOnSubmit={true}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          defaultValue={tourDetails ? tourDetails.start : ""}
          onInputChange={inputChangedHandler}
        />
        <Button
          style={{ paddingTop: 10, paddingBotttom: 20 }}
          onPress={() => goBackHandler()}
        >
          Complete
        </Button>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default TourDetailsScreen;
