import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import Header from "../../components/UI/Header";
import StyledText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import MediaSwitcher from "../../components/UI/MediaSwitcher";

const UncoverTourItemScreen = props => {
  const [id] = useState(props.navigation.getParam("id"));
  const [location, setLocation] = useState(null);
  const gift = useSelector(store => store.received.currentGift);

  useEffect(() => {
    switch (id) {
      case 1:
        setLocation(gift.locationOne);
      case 2:
        setLocation(gift.locationTwo);
      case 3:
        setLocation(gift.locationThree);
      default:
        setLocation(gift.locationOne);
    }
  }, []);

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
