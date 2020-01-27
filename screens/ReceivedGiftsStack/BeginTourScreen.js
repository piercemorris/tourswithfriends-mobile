import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receivedActions.receiveGift(id));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton {...props} />
        <Header title={name} subtitle={"In " + city} />
        {loadingGift === false ? (
          <View>
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
              <Text>Error occured</Text>
            )}
          </View>
        ) : (
          <ActivityIndicator
            style={styles.loadingIndicator}
            color={Colors.primary}
            hidesWhenStopped={loadingGift}
          />
        )}
      </View>
      <Button onPress={() => props.navigation.navigate("TourList")}>
        Embark!
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  tourDescription: {
    paddingVertical: 15
  },
  loadingIndicator: {
    alignSelf: "center"
  },
  giftText: {
    paddingLeft: 30
  }
});

export default BeginTourScreen;
