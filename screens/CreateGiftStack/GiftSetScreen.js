import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  View,
  ProgressViewIOS
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
import state from "../../helper/giftSetState";

const GiftSetScreen = props => {
  [isComplete, setIsComplete] = useState(false);
  [isSending, setIsSending] = useState(false);
  [isConfirming, setIsConfirming] = useState(false);
  const friendDetailsValid = useSelector(store => store.gift.friendDetails);
  const tourDetailsValid = useSelector(store => store.gift.tourDetails);
  const locationOne = useSelector(store => store.gift.locationOne);
  const locationTwo = useSelector(store => store.gift.locationTwo);
  const locationThree = useSelector(store => store.gift.locationThree);
  const sendingStatus = useSelector(store => store.gift.sendingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      friendDetailsValid &&
      tourDetailsValid &&
      locationOne &&
      locationTwo &&
      locationThree
    ) {
      setIsComplete(true);
    } else {
      if (!isSending) {
        setIsComplete(false);
      } else {
        setIsSending(false);
        setIsConfirming(true);
      }
    }
  }, [
    tourDetailsValid,
    friendDetailsValid,
    locationOne,
    locationTwo,
    locationThree
  ]);

  const onConfirm = () => {
    setIsConfirming(false);
    props.navigation.pop();
  };

  const onSend = () => {
    if (isComplete) {
      setIsSending(true);
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
      Alert.alert(
        "An error occurred!",
        "Not all gift requirements have been completed",
        [{ text: "Ok" }]
      );
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      pointerEvents={isSending ? "none" : "auto"}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <BackButton {...props} />
        <Header title="Creating a Gift" subtitle="What you need to complete" />
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
      <Button onPress={() => onSend()}>Send</Button>
      {isSending && (
        <View style={styles.modalContainer}>
          <View style={styles.modalComponents}>
            <StyledText style={styles.modalText} bold>
              Sending Gift!
            </StyledText>
            {Platform.OS === "ios" ? (
              <View>
                <ActivityIndicator
                  style={{ marginBottom: 25 }}
                  size="small"
                  color={Colors.primary}
                />
                <ProgressViewIOS
                  progressTintColor={Colors.primary}
                  progress={sendingStatus ? sendingStatus : 0}
                  progressViewStyle="bar"
                />
              </View>
            ) : (
              <ActivityIndicator size="large" color={Colors.primary} />
            )}
          </View>
        </View>
      )}
      {isConfirming && (
        <View style={styles.modalContainer}>
          <View style={styles.modalComponents}>
            <StyledText style={styles.modalText} bold>
              Gift successfully sent!
            </StyledText>
            <Button style={{ width: "100%" }} onPress={() => onConfirm()}>
              Ok!
            </Button>
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
  modalContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.loadingBackground
  },
  modalComponents: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    width: Layout.window.width - 150,
    height: Layout.window.height / 4,
    justifyContent: "space-evenly",
    padding: 15,
    ...Layout.shadow
  },
  modalText: {
    padding: 0,
    marginTop: 5,
    color: Colors.primary,
    alignSelf: "center"
  }
});

export default GiftSetScreen;
