import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import Header from "../components/UI/Header";
import Subsection from "../components/UI/Subsection";

const data = [
  { name: "Pierce", tour: "Japanese Adventure" },
  { name: "Pierce", tour: "Japanese Adventure" },
  { name: "Pierce", tour: "Japanese Adventure" }
];

const ReceivedScreen = () => {
  return (
    <SafeAreaView>
      <Header main title="Received Gifts" />
      <Subsection text="Ready to embark" />
      <Subsection text="Recent friends" />
    </SafeAreaView>
  );
};

export default ReceivedScreen;
