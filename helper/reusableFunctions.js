import { useRef, useEffect } from "react";
import { Platform } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

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
