import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ImageUncover = ({ name, mediaFileRef }) => {
  return (
    <View>
      <Text>{name}</Text>
      <Image style={{ width: 50, height: 50 }} source={{ uri: mediaFileRef }} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageUncover;
