import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import Header from "../components/UI/Header";
import Title from "../components/UI/Title";
import InputContainer from "../components/UI/InputContainer";
import StatText from "../components/UI/StatText";

import * as statActions from "../store/actions/statistics";

const AccountScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <Header main title="Account" subtitle="Details" />
      <View style={styles.accountSection}>
        <InputContainer title="Name" text="Pierce Morris" />
        <InputContainer title="Email" text="pierce.morris1998@gmail.com" />
        <InputContainer title="Password" text="••••••••••••••" />
      </View>
      <Header main title="Statistics" subtitle="A breakdown of your activity" />
      <View style={styles.statsSection}>
        <StatText number="20" text="Gifts Recevied" />
        <StatText number="12" text="Gifts Sentt" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  accountSection: {
    marginVertical: 15
  },
  statsSection: {
    paddingHorizontal: 25,
    marginVertical: 20
  }
});

export default AccountScreen;
