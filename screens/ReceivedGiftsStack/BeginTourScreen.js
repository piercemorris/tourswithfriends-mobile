import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ProgressViewIOS,
  Platform
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../components/UI/Header";
import Title from "../../components/UI/Title";
import Info from "../../components/UI/Info";
import Button from "../../components/UI/Button";
import StyledText from "../../components/StyledText";
import BackButton from "../../components/UI/BackButton";
import BulletPoint from "../../components/UI/BulletPoint";
import Colors from "../../constants/Colors";

import * as receivedActions from "../../store/actions/received";

const BeginTourScreen = props => {
  const [id] = useState(props.navigation.getParam("id"));
  const [name] = useState(props.navigation.getParam("name"));
  const [city] = useState(props.navigation.getParam("city"));
  const [user] = useState(props.navigation.getParam("user"));
  const gift = useSelector(store => store.received.currentGift);
  const loadingGift = useSelector(store => store.received.loadingGift);
  const loadingPercent = useSelector(store => store.received.loadingGiftStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receivedActions.receiveGift(id));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contain}>
        <BackButton {...props} />
        <Header title={name} subtitle={"In " + city} />
        {loadingGift === false ? (
          <View style={styles.contain}>
            {gift ? (
              <View style={styles.tourDescription}>
                <Title title="Location" />
                <StyledText style={styles.giftText}>
                  {gift.tourDetails.city}
                </StyledText>
                <Title title="Description" />
                <StyledText style={styles.giftText}>
                  {gift.tourDetails.description}
                </StyledText>
                <Info
                  text={`It is best to embark with the tour creator for guidance`}
                />
              </View>
            ) : (
              <View style={styles.error}>
                <Text style={styles.errorText}>
                  An error occurred loading gift data :(
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.center}>
            <Text style={{alignSelf: "center", fontFamily: "sf-bold", fontSize: 18}}>Loading your unique gift!</Text>
            {Platform.OS === "ios" ?
              <ProgressViewIOS 
                progressTintColor={Colors.primary}
                progress={loadingPercent ? loadingPercent : 0} 
                progressViewStyle="bar" 
              /> 
              :
              <ActivityIndicator
                style={styles.loadingIndicator}
                color={Colors.primary}
                hidesWhenStopped={loadingGift}
              />
            }
          </View>
        )}
      </View>
      {gift && (
        <Button onPress={() => props.navigation.navigate("TourList")}>
          Embark!
        </Button>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  contain: {
    flex: 1
  },
  center: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  tourDescription: {
    paddingVertical: 15
  },
  loadingIndicator: {
    alignSelf: "center"
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorText: {},
  giftText: {
    paddingLeft: 30
  }
});

export default BeginTourScreen;
