import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import StyledText from "../../components/StyledText";
import BackButton from "../../components/UI/BackButton";
import BulletPoint from "../../components/UI/BulletPoint";

const HelpfulTipsScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <BackButton {...props} />
        <Header title="Helpful Tips" subtitle="What to expect" />
        <StyledText>
          The gift contents will be consist of three point of interests. These
          could be:
        </StyledText>
        <BulletPoint text="A restaurant" />
        <BulletPoint text="A retail shop" />
        <BulletPoint text="A landmark or attraction" />
        <BulletPoint text="A piece of open art" />
        <BulletPoint text="Anywhere publicly accessible" />
        <StyledText>
          You will have a range of tools equipped to select the best method to
          get your show your point of interest.
        </StyledText>
      </View>
      <Button onPress={() => props.navigation.navigate("FriendDetails")}>
        Start!
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  }
});

export default HelpfulTipsScreen;
