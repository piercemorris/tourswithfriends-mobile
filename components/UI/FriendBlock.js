import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

import StyledText from "../StyledText";

const FriendBlock = props => {
  return ( 
    <LinearGradient style={styles.container} colors={[Colors.primary, Colors.secondary]}>
      <StyledText bold style={{color: Colors.white}}>{props.name}</StyledText>
    </LinearGradient>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 15,
    marginBottom: 25,
    marginLeft: 15,
    backgroundColor: Colors.primary,
    width: Layout.window.width / 2.5,
    height: Layout.window.width / 2.5,
    borderRadius: Layout.window.width / 5,
    ...Layout.shadow
  }
})
 
export default FriendBlock;