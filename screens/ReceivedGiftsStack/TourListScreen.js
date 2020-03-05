import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../components/UI/Header";
import BackButton from "../../components/UI/BackButton";
import LargeButton from "../../components/UI/LargeButton";
import Colors from "../../constants/Colors";

import * as receivedActions from "../../store/actions/received";

const TourListScreen = props => {
  const dispatch = useDispatch();
  const gift = useSelector(store => store.received.currentGift);
  const control = useSelector(store => store.received.control);

  const shouldDisplayName = id => {
    if (id < control) {
      return true;
    } else {
      return false;
    }
  }

  const _handleBack = () => {
    dispatch(receivedActions.resetTour());
    props.navigation.pop();
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={_handleBack} />
      <Header
        title="Tour Breakdown"
        subtitle={`Start in ${gift.tourDetails.start}`}
      />
      <View style={styles.buttonContainer}>
        <LargeButton
          id={1}
          animated
          delay={0}
          control={control}
          image={gift.locationThree.image}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("TourItem", {
                id: 1,
                name: gift.locationOne.name,
                location: gift.locationOne,
                image: gift.locationOne.image
              });
            }}
          >
            <Text style={styles.title}>{shouldDisplayName(1) ? gift.locationOne.name : "Location 1"}</Text>
          </TouchableOpacity>
        </LargeButton>
        <LargeButton
          id={2}
          animated
          delay={500}
          control={control}
          image={gift.locationTwo.image}
        >
          <TouchableOpacity
            disabled={control < 2}
            onPress={() => {
              props.navigation.navigate("TourItem", {
                id: 2,
                name: gift.locationTwo.name,
                location: gift.locationTwo,
                image: gift.locationTwo.image
              });
            }}
          >
            <Text style={styles.title}>{shouldDisplayName(2) ? gift.locationTwo.name : "Location 2"}</Text>
          </TouchableOpacity>
        </LargeButton>
        <LargeButton
          id={3}
          animated
          delay={1000}
          control={control}
          image={gift.locationThree.image}
        >
          <TouchableOpacity
          disabled={control < 3}
            onPress={() => {
              props.navigation.navigate("TourItem", {
                id: 3,
                name: gift.locationThree.name,
                location: gift.locationThree,
                image: gift.locationThree.image
              });
            }}
          >
            <Text style={styles.title}>{shouldDisplayName(3) ? gift.locationThree.name : "Location 3"}</Text>
          </TouchableOpacity>
        </LargeButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flex: 1
  },
  title: {
    fontFamily: "sf-bold",
    fontSize: 28,
    color: Colors.white
  }
});

export default TourListScreen;
