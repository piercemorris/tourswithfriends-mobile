import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import StyledText from "../../components/StyledText";
import Colors from "../../constants/Colors";

const ImageRevealScreen = props => {
  const gift = useSelector(store => store.received.currentGift);
  const [id] = useState(props.navigation.getParam("id"));
  const [location, setLocation] = useState(null);
  const [isClueRevealed, setIsClueRevealed] = useState(false);

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

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Revealing" />
      {gift && (
        <StyledText
          style={{
            paddingHorizontal: 20,
            paddingVertical: 0,
            marginTop: 15
          }}
        >
          Find the tour location using this image!
        </StyledText>
      )}
      {location ? (
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.imageBackground}
            imageStyle={styles.image}
            source={{ uri: location.image }}
          >
            {isClueRevealed && (
              <View style={styles.clueContainer}>
                <StyledText>{location.clue}</StyledText>
              </View>
            )}
            <TouchableOpacity
              style={styles.overlayButtonContainer}
              onPress={() => setIsClueRevealed(prev => !prev)}
            >
              <StyledText bold>
                {isClueRevealed ? "Hide clue" : "Reveal clue"}
              </StyledText>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      ) : null}
      <Button onPress={() => props.navigation.navigate("AudioReveal", {
        id: id,
        audio: location.audio
      })}>
        I've found the spot!
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mediaInfo: {
    flex: 1
  },
  overlayButtonContainer: {
    backgroundColor: Colors.whiteTransparent,
    width: "100%"
  },
  imageContainer: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  image: {
    borderRadius: 15
  },
  clueContainer: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    margin: 15
  }
});

export default ImageRevealScreen;
