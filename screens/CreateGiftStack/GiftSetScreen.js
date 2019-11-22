import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import Title from "../../components/UI/Title";
import BackButton from "../../components/UI/BackButton";
import ButtonInverse from "../../components/UI/ButtonInverse";

const GiftSetScreen = props => {
  const friendDetailsValid = useSelector(store => store.gift.friendDetails);
  const tourDetailsValid = useSelector(store => store.gift.tourDetails);
  const locationOne = useSelector(store => store.gift.locationOne);
  const locationTwo = useSelector(store => store.gift.locationTwo);
  const locationThree = useSelector(store => store.gift.locationThree);

  return (
    <SafeAreaView style={styles.container}>
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
      <Button onPress={() => {}}>Complete</Button>
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
  }
});

export default GiftSetScreen;
