import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import Title from "../../components/UI/Title";
import StyledText from "../../components/StyledText";
import BackButton from "../../components/UI/BackButton";
import ButtonInverse from "../../components/UI/ButtonInverse";
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

  const goBackHandler = () => {
    setIsSending(true);
    setTimeout(() => {
      if (
        friendDetailsValid &&
        tourDetailsValid &&
        locationOne &&
        locationTwo &&
        locationThree
      ) {
        dispatch(locationActions.sendGift());
        setIsSending(false);
        props.navigation.popToTop();
      } else {
        setIsSending(false);
        setComplete(false);
      }
    }, 5000);
  };

  return (
    <SafeAreaView
      style={styles.container}
      pointerEvents={isSending ? "none" : "auto"}
    >
      <View>
        <BackButton {...props} />
        <Header title="Gift Creation" subtitle="What you need to complete" />
        <View style={styles.contentContainer}>
          <Title title="Friend Details" />
          <ButtonInverse
            completed={friendDetailsValid}
            text="Enter Friends Details"
            onPress={() => props.navigation.navigate("FriendDetails")}
          />
          <Title title="Tour Details" />
          <ButtonInverse
            completed={tourDetailsValid}
            text="Enter Tour Details"
            onPress={() => props.navigation.navigate("TourDetails")}
          />
          <Title title="Location 1" />
          <ButtonInverse
            text="Add to location 1"
            completed={locationOne}
            onPress={() =>
              props.navigation.navigate("LocationStack", {
                id: 1
              })
            }
          />
          <Title title="Location 2" />
          <ButtonInverse
            text="Add to location 2"
            completed={locationTwo}
            onPress={() =>
              props.navigation.navigate("LocationStack", {
                id: 2
              })
            }
          />
          <Title title="Location 3" />
          <ButtonInverse
            text="Add to location 3"
            completed={locationThree}
            onPress={() =>
              props.navigation.navigate("LocationStack", {
                id: 3
              })
            }
          />
        </View>
      </View>
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
    justifyContent: "space-between"
  },
  contentContainer: {
    paddingTop: 15
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
