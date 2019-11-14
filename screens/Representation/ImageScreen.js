import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StyleSheet,
  Image
} from "react-native";

import Input from "../../components/UI/Input";
import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import BackButton from "../../components/UI/BackButton";
import StyledText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Ionicons } from "@expo/vector-icons";

const ImageScreen = props => {
  [selectedPicture, setSelectedPicture] = useState(null);

  _returnPicture = pic => {
    setSelectedPicture(pic);
  };

  _navigateToCamera = () => {
    props.navigation.navigate("Camera", {
      returnData: _returnPicture
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton {...props} />
        <Header title="Location 1" subtitle="Image" />
        {selectedPicture ? (
          <Image
            style={styles.imageContainer}
            source={{ uri: selectedPicture }}
          />
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

      <Button onPress={() => {}}>Next</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  imageContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: Layout.window.width - 40,
    height: "75%",
    borderRadius: 15,
    backgroundColor: Colors.inputShade
  }
});

export default ImageScreen;
