import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Alert, StatusBar } from "react-native";

import Header from "../../../components/UI/Header";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";
import SmallTitle from "../../../components/UI/SmallTitle";
import MapView from "../../../components/UI/MapView";

import * as locationActions from "../../../store/actions/location";

const TakeLocationScreen = props => {
  const _updateSavedData = locationId => {
    switch (locationId) {
      case 1:
        return useSelector(store => store.gift.locationOne);
      case 2:
        return useSelector(store => store.gift.locationTwo);
      case 3:
        return useSelector(store => store.gift.locationThree);
    }
  };

  const [id] = useState(props.navigation.getParam("id"));
  const [savedData] = useState(_updateSavedData(id));
  const [selectedName, setSelectedName] = useState(
    savedData ? savedData.name : null
  );
  const [selectedLocation, setSelectedLocation] = useState(
    savedData ? savedData.location : null
  );
  const [selectedAddress, setSelectedAddress] = useState(
    savedData ? savedData.address : null
  );
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", "Not all fields have been completed", {
        text: "Ok"
      });
      setError(false);
    }
  }, [error]);

  const _handleUpdateLocation = (location, address) => {
    setSelectedLocation(location);
    setSelectedAddress(address);
  };

  const _handleNext = () => {
    if (selectedName && selectedLocation && selectedAddress) {
      dispatch(
        locationActions.updateLocation(
          id,
          selectedName,
          selectedLocation,
          selectedAddress
        )
      );
      props.navigation.navigate("TakeImage", {
        id: id
      });
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <Header style={{ marginBottom: 10 }} title={`Location ${id}`} />
        <Input
          id="name"
          title="Name"
          defaultValue={selectedName}
          onInputChange={(id, value, valid) => setSelectedName(value)}
        />
        <SmallTitle title="Select Location" />
        <MapView
          markerLocation={selectedLocation ? selectedLocation : null}
          markerAddress={selectedAddress ? selectedAddress : null}
          onUpdateLocation={_handleUpdateLocation}
        />
      </View>
      <Button fill style={styles.navigationButton} onPress={_handleNext}>
        Next Step
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    justifyContent: "space-between"
  }
});

export default TakeLocationScreen;
