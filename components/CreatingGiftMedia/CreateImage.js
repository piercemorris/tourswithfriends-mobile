import React from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../UI/Title";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

const CreateImage = ({ mediaRef, returnMediaRef, navigation }) => {
  _navigateToCamera = () => {
    navigation.navigate("Camera", {
      returnData: returnMediaRef
    });
  };

  return (
    <View>
      <Title style={styles.title} title={selectedMethod} />
      {mediaRef ? (
        <TouchableOpacity onPress={() => _navigateToCamera()}>
          <Image
            style={styles.imageContainer}
            source={{ uri: mediaRef }}
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
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: Layout.window.width - 40,
    height: Layout.window.height / 2,
    borderRadius: 15,
    backgroundColor: Colors.inputShade
  }
});

export default CreateImage;
