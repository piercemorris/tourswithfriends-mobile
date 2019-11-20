import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import Input from "../../components/UI/Input";
import Title from "../../components/UI/Title";
import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import BackButton from "../../components/UI/BackButton";
import IconButton from "../../components/UI/IconButton";
import StyledText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import MethodEnum from "../../helper/representationEnum";
import * as locationActions from "../../store/actions/location";

import {
  getLocation,
  getRegionFrom,
  getReverseGeocode,
  useCompare,
  getKeyByValue
} from "../../helper/reusableFunctions";

const LocationScreen = props => {
  [selectedPicture, setSelectedPicture] = useState(null);
  [currentLocation, setCurrentLocation] = useState(null);
  [selectedAddress, setSelectedAddress] = useState(null);
  [isLoading, setIsLoading] = useState(false);
  [selectedMethod, setSelectedMethod] = useState(0);

  const dispatch = useDispatch();
  const isFocused = useCompare(props.isFocused);

  useEffect(() => {
    if (isFocused === props.isFocused) {
      const address = props.navigation.getParam("address");
      if (address) setSelectedAddress(address);
    }
  });

  useEffect(() => {
    dispatch(locationActions.updateAddress(selectedAddress));
  }, [selectedAddress]);

  useEffect(() => {
    dispatch(locationActions.updateLocation(currentLocation));
  }, [currentLocation]);

  _returnAddressLocation = data => {
    setCurrentLocation(data.location);
    setSelectedAddress(data.address);
  };

  _returnMethod = data => {
    const method = getKeyByValue(MethodEnum, data.method);
    setSelectedMethod(method);
  };

  _getLocation = async () => {
    try {
      const location = await getLocation();
      const accurateLocation = getRegionFrom(
        location.coords.latitude,
        location.coords.longitude,
        1000
      );
      const address = await getReverseGeocode(accurateLocation);

      setCurrentLocation(accurateLocation);
      setSelectedAddress(address[0]);
    } catch (ex) {}
  };

  _navigateToSelectLocation = async () => {
    setIsLoading(true);
    await _getLocation();
    setIsLoading(false);
    props.navigation.navigate("SelectLocation", {
      location: currentLocation,
      returnData: _returnAddressLocation
    });
  };

  _navigateToRepresentation = () => {
    props.navigation.navigate("Representation", {
      returnData: _returnMethod
    });
  };

  _returnPicture = pic => {
    setSelectedPicture(pic);
  };

  _navigateToCamera = () => {
    props.navigation.navigate("Camera", {
      returnData: _returnPicture
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentStyle}
      >
        <BackButton {...props} />
        <Header title="Location 1" />
        <Input
          style={{ marginTop: 20 }}
          id="name"
          title="Name"
          onInputChange={() => {}}
        />
        <Title title="Location Coordinates" />
        {currentLocation && selectedAddress ? (
          <View style={styles.addressContainer}>
            <StyledText style={styles.address}>
              {selectedAddress.name}, {selectedAddress.city}
            </StyledText>
            <IconButton
              onPress={() => _navigateToSelectLocation()}
              name="ios-color-wand"
              color={Colors.primary}
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              viewStyle={styles.view}
              onPress={() => _getLocation()}
            >
              Current Location
            </Button>
            {isLoading ? (
              <ActivityIndicator color={Colors.primary} />
            ) : (
              <Button
                style={styles.button}
                viewStyle={styles.view}
                onPress={() => _navigateToSelectLocation()}
              >
                Select Location
              </Button>
            )}
          </View>
        )}
        <Title style={styles.title} title="Representation" />
        {selectedMethod ? (
          <View style={styles.addressContainer}>
            <StyledText style={styles.address}>{selectedMethod}</StyledText>
            <IconButton
              onPress={() => _navigateToRepresentation()}
              name="ios-color-wand"
              color={Colors.primary}
            />
          </View>
        ) : (
          <Button
            style={styles.fullButton}
            onPress={() => _navigateToRepresentation()}
          >
            Select method of representation
          </Button>
        )}
        {selectedMethod ? (
          <View>
            <Title style={styles.title} title={selectedMethod} />
            {selectedPicture ? (
              <TouchableOpacity onPress={() => _navigateToCamera()}>
                <Image
                  style={styles.imageContainer}
                  source={{ uri: selectedPicture }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => _navigateToCamera()}>
                  <Ionicons
                    name={
                      Platform.OS === "ios"
                        ? "ios-add-circle-outline"
                        : "md-add-circle-outline"
                    }
                    size={64}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : null}
        <Button
          style={styles.navigationButton}
          onPress={() => props.navigation.pop()}
        >
          Complete
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  scrollView: {
    paddingBottom: 25
  },
  contentStyle: {
    flexGrow: 1
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: Layout.window.width,
    paddingHorizontal: 20
  },
  title: {
    marginTop: 10
  },
  button: {
    width: "50%",
    paddingHorizontal: 5
  },
  fullButton: {
    marginTop: 15,
    paddingHorizontal: 5
  },
  view: {
    paddingHorizontal: 0
  },
  addressContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  address: {
    color: "#000",
    fontSize: 16
  },
  imageContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: Layout.window.width - 40,
    height: Layout.window.height / 2,
    borderRadius: 15,
    backgroundColor: Colors.inputShade
  },
  navigationButton: {
    marginVertical: 15
  }
});

export default withNavigationFocus(LocationScreen);
