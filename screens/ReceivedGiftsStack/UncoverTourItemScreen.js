import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import StyledText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import MediaSwitcher from "../../components/UI/MediaSwitcher";

import * as receivedActions from "../../store/actions/received";

const UncoverTourItemScreen = props => {
  const dispatch = useDispatch();
  const [id] = useState(props.navigation.getParam("id"));
  const [location, setLocation] = useState(null);
  const gift = useSelector(store => store.received.currentGift);

  useEffect(() => {
    switch (id) {
      case 1:
        setLocation(gift.locationOne);
        break;
      case 2:
        setLocation(gift.locationTwo);
        break;
      case 3:
        setLocation(gift.locationThree);
        break;
      default:
        setLocation(gift.locationOne);
        break;
    }
  }, []);

  const _navigateToTourList = () => {
    console.log(typeof id);
    switch (id) {
      case 1:
        dispatch(receivedActions.completedLocation(1));
        break;
      case 2:
        dispatch(receivedActions.completedLocation(2));
        break;
      case 3:
        dispatch(receivedActions.completedLocation(3));
        break;
      default:
        break;
    }
    props.navigation.pop(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Revealing" />
      {gift && (
        <StyledText
          style={{
            paddingHorizontal: 15,
            paddingVertical: 0,
            marginTop: 15
          }}
        >
          Your friend has chosen an{" "}
          <StyledText bold style={{ padding: 0, color: Colors.primary }}>
            {gift.locationOne.mediaType}
          </StyledText>{" "}
          to represent this tour location
        </StyledText>
      )}
      {location ? (
        <View style={styles.mediaInfo}>
          <MediaSwitcher
            name={location.name}
            mediaType={location.mediaType}
            mediaFileRef={location.mediaFileRef}
          />
        </View>
      ) : null}
      <Button onPress={() => _navigateToTourList()}>Completed</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mediaInfo: {
    flex: 1
  }
});

export default UncoverTourItemScreen;
