import React from 'react';
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={Platform.OS === "android" ? Colors.white : Colors.primary}
    />
  );
}
