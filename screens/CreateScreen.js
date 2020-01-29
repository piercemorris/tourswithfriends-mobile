import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import Info from "../components/UI/Info";
import Header from "../components/UI/Header";
import Button from "../components/UI/Button";
import StyledText from "../components/StyledText";
import BulletPoint from "../components/UI/BulletPoint";

import Firebase from "firebase";
import axios from "axios";
import url from "../https/index";

const CreateScreen = props => {
  const sendNotif = async () => {
    const user = Firebase.auth().currentUser;

    try {
      const res = axios.post(url.live + "users" + url.GIFT_NOTIF_ENDPOINT, {
        senderUid: user.uid,
        receiverUid: user.uid
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header
          main
          title="Creating a Gift"
          subtitle="How to make a great gift"
        />
        <StyledText>
          Start by thinking about the person you wish to make the gift for - the
          better you know the person, the better suited the gift will be. Why
          don’t you ask yourself some questions to spark some creativity? For
          example:
        </StyledText>
        <BulletPoint text="What is their favourite cuisine? 🍔" />
        <BulletPoint text="What are their hobbies? ⚽️" />
        <BulletPoint text="Do they have a favourite restaurant? 🌮" />
        <BulletPoint text="Are they an indoor or outdoor person? 🌳" />
        <StyledText>
          These are just a few examples, but the thinking is all down to you!
        </StyledText>
        <Info text="You can only add 3 gifts so make them count!" />
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
        <Button
          onPress={() => {
            sendNotif();
            //props.navigation.navigate("CreateStack");
          }}
        >
          Begin
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    flex: 1
  },
  scrollContainer: {
    paddingVertical: 22
  }
});

export default CreateScreen;
