import Firebase from "firebase";
import { useRef, useEffect } from "react";
import { Platform } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Region from "../models/Region";

export const addNewFriend = () => {
  // get uid of user
  // check if uid exists in uid (opt) not blocked by user
  // get data associated with uid
  // add uid to recent => /users/{uid}/recent/{friend uid}
  // add data under new friend uid => /users/{uid}/recent/{friend uid}/{{displayName, ...}}
};

export const numberToFormattedKm = number => {
  const integer = Math.floor(number);
  let remainder = number - integer;
  remainder = Math.floor(remainder * 10) / 10;
  return integer + remainder;
};

export const msToFormattedSecs = ms => Math.floor((ms / 1000) * 10) / 10;

export const numberToFormattedMin = number => {
  return Math.ceil(number);
};

export const getLocation = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    console.log("ERROR NO PERMISSIONS");
  }

  let location = await Location.getCurrentPositionAsync({});
  return location;
};

export const getReverseGeocode = async location => {
  if (Platform.OS === "android") {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("ERROR NO PERMISSIONS");
    }
  }

  try {
    const address = await Location.reverseGeocodeAsync(location);
    return address;
  } catch (ex) {
    console.log(ex);
  }
};

export const getRegionFrom = (lat, lon, accuracy) => {
  accuracy = accuracy / 2;
  const circumference = 40075;
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const angularaccuracy = accuracy / circumference;
  const latitudeDelta = accuracy / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = Math.abs(
    Math.atan2(
      Math.sin(angularaccuracy) * Math.cos(lat),
      Math.cos(angularaccuracy) - Math.sin(lat) * Math.sin(lat)
    )
  );

  return new Region(lat, lon, longitudeDelta, longitudeDelta);

  return (result = {
    latitude: lat,
    longitude: lon,
    latitudeDelta,
    longitudeDelta
  });
};

export const useCompare = value => {
  const prevVal = usePrevious(value);
  return prevVal !== value;
};

export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};

export const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
export const FORM_INITIALISE = "FORM_INITIALISE";

export const initialReducerState = {
  inputValues: {
    displayName: "",
    email: "",
    password: "",
    confirmpassword: ""
  },
  inputValidities: {
    displayName: false,
    email: false,
    password: false,
    confirmpassword: false
  },
  formIsValid: false
};

export const formReducer = (state, action) => {
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
  } else if (action.type === FORM_INITIALISE) {
  }
  return state;
};
