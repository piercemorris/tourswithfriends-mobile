import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, StyleSheet } from "react-native";

import SmallTitle from "./SmallTitle";
import Colors from "../../constants/Colors";
const INPUT_CHANGE = "INPUT_CHANGE";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE: {
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.defaultValue ? props.defaultValue : "",
    isValid: props.defaultValue ? true : false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    onInputChange(id, inputState.value, inputState.isValid);
  }, [onInputChange, inputState, id]);

  const textChangeHandler = text => {
    let isValid = true;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.min !== null && text.length < props.min) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  return (
    <View style={{ ...styles.container, ...props.style }}>
      <SmallTitle title={props.title} />
      <TextInput
        {...props}
        value={inputState.value}
        onChangeText={textChangeHandler}
        secureTextEntry={props.password ? true : false}
        style={props.multiline ? styles.multiline : styles.input}
      />
    </View>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  password: PropTypes.bool
};

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  input: {
    backgroundColor: Colors.inputShade,
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    fontFamily: "sf-regular",
    fontSize: 18,
    marginHorizontal: 20
  },
  multiline: {
    backgroundColor: Colors.inputShade,
    height: 120,
    borderRadius: 10,
    paddingLeft: 10,
    fontFamily: "sf-regular",
    fontSize: 18,
    marginHorizontal: 20
  }
});

export default Input;
