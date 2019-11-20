import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";

import Input from "../../components/UI/Input";
import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import StyledText from "../../components/StyledText";
import BackButton from "../../components/UI/BackButton";
import Colors from "../../constants/Colors";

const FriendDetailsScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton {...props} />
        <Header title="Your friend" subtitle="Just some details" />
        <StyledText>
          To send your gift successfully we need details about your friend.
        </StyledText>
        <Input id="name" title="Name" onInputChange={() => {}} />
        <Input email id="email" title="Email" onInputChange={() => {}} />
        <Input
          id="desc"
          title="A description about your friend"
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          onInputChange={() => {}}
        />
        <StyledText style={{ color: Colors.lightGrey }}>
          This information is to send an email to your friend to either be
          invited to download the app or a link to open the app on their device.
        </StyledText>
      </View>
      <Button onPress={() => props.navigation.pop()}>Complete</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  }
});

export default FriendDetailsScreen;
