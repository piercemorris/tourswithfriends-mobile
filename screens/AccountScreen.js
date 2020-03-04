import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import Header from "../components/UI/Header";
import Title from "../components/UI/Title";

const AccountScreen = props => {
  return (
    <SafeAreaView>
      <Header main title="Account" subtitle="Details" />
      <View style={styles.accountSection}>
        <View style={styles.accountInfo}>
          <Title title="Name" />
          <View style={styles.accountContainer}>
            <Text style={styles.text}>Pierce Morris</Text>
            <Text>Change</Text>
          </View>
        </View>
        <View style={styles.accountInfo}>
          <Title title="Email" />
          <View style={styles.accountContainer}>
            <Text style={styles.text}>pierce.morris1998@gmail.com</Text>
            <Text>Change</Text>
          </View>
        </View>
        <View style={styles.accountInfo}>
          <Title title="Password" />
          <View style={styles.accountContainer}>
            <Text style={styles.text}>••••••••••••••••••••</Text>
            <Text>Change</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  accountSection: {
    marginVertical: 15
  },
  accountInfo: {
    marginVertical: 5
  },
  accountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginVertical: 5
  },
  text: {
    fontFamily: "sf-regular",
    fontSize: 16
  }
});

export default AccountScreen;
