import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  View
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import StyledText from "../../components/StyledText";
import BackButton from "../../components/UI/BackButton";
import SquareButton from "../../components/UI/SquareButton";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import * as locationActions from "../../store/actions/location";

const GiftSetScreen = props => {
  [complete, setComplete] = useState(true);
  [isSending, setIsSending] = useState(false);
  const friendDetailsValid = useSelector(store => store.gift.friendDetails);
  const tourDetailsValid = useSelector(store => store.gift.tourDetails);
  const locationOne = useSelector(store => store.gift.locationOne);
  const locationTwo = useSelector(store => store.gift.locationTwo);
  const locationThree = useSelector(store => store.gift.locationThree);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!complete) {
      Alert.alert(
        "An error occurred!",
        "Not all gift requirements have been completed",
        [{ text: "Ok" }]
      );
    }
    setComplete(true);
  }, [complete]);

  useEffect(() => {
    if (isSending && !locationOne && !locationTwo && !locationThree) {
      updateState();
    }
  }, [isSending, locationOne]);

  const updateState = () => {
    setIsSending(false);

    props.navigation.popToTop();
  };

  const goBackHandler = () => {
    setIsSending(true);
    if (
      friendDetailsValid &&
      tourDetailsValid &&
      locationOne &&
      locationTwo &&
      locationThree
    ) {
      dispatch(
        locationActions.sendGift(
          friendDetailsValid,
          tourDetailsValid,
          locationOne,
          locationTwo,
          locationThree
        )
      );
    } else {
      setIsSending(false);
      setComplete(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      pointerEvents={isSending ? "none" : "auto"}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <BackButton {...props} />
        <Header title="Gift Creation" subtitle="What you need to complete" />
        <View style={styles.contentContainer}>
          <SquareButton
            name="Friend Details"
            icon="person"
            completed={friendDetailsValid}
            onPress={() => props.navigation.navigate("FriendDetails")}
          />
          <SquareButton
            name="Tour Details"
            icon="paper"
            completed={tourDetailsValid}
            onPress={() => props.navigation.navigate("TourDetails")}
          />
          <SquareButton
            name="Location 1"
            icon="gift"
            completed={locationOne}
            onPress={() =>
              props.navigation.navigate("LocationStack", {
                id: 1
              })
            }
          />
          <SquareButton
            name="Location 2"
            icon="gift"
            completed={locationTwo}
            onPress={() =>
              props.navigation.navigate("LocationStack", {
                id: 2
              })
            }
          />
          <SquareButton
            name="Location 3"
            icon="gift"
            completed={locationThree}
            onPress={() =>
              props.navigation.navigate("LocationStack", {
                id: 3
              })
            }
          />
        </View>
      </ScrollView>
      <Button onPress={() => goBackHandler()}>Send</Button>
      {isSending && (
        <View style={styles.sendingContainer}>
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <StyledText
              style={{ padding: 0, marginTop: 5, color: Colors.primary }}
              bold
            >
              Sending Gift!
            </StyledText>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 15
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  sendingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.loadingBackground
  },
  activityIndicator: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    ...Layout.shadow
  }
});

export default GiftSetScreen;
