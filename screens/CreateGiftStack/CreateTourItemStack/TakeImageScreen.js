import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

import Header from "../../../components/UI/Header";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";
import SmallTitle from "../../../components/UI/SmallTitle";
import CreateImage from "../../../components/CreatingGiftMedia/CreateImage";

const TakeImageScreen = props => {
  const [selectedClue, setSelectedClue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {}, []);

  const _returnImage = image => {
    setSelectedImage(image);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View>
        <Header style={{ marginBottom: 10 }} title="Image & clue" />
        <CreateImage
          imageRef={selectedImage}
          returnImageRef={_returnImage}
          navigation={props.navigation}
        />
      </View>
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

export default TakeImageScreen;
