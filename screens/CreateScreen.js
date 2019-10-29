import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import Header from "../components/UI/Header";

const CreateScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Create a Gift" subtitle="How to make a great gift" />
    </SafeAreaView>
  );
};

export default CreateScreen;
