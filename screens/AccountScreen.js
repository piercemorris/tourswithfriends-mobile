import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import Header from "../components/UI/Header";

const AccountScreen = () => {
  return (
    <SafeAreaView>
      <Header main title="Account" subtitle="Details" />
    </SafeAreaView>
  );
};

export default AccountScreen;
