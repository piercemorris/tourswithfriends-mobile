import React from "react";
import { SafeAreaView } from "react-native";

import Info from "../components/UI/Info";
import Header from "../components/UI/Header";
import Button from "../components/UI/Button";
import StyledText from "../components/StyledText";
import BulletPoint from "../components/UI/BulletPoint";

const CreateScreen = props => {
  return (
    <SafeAreaView>
      <Header title="Creating a Gift" subtitle="How to make a great gift" />
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
      <Button
        onPress={() => {
          props.navigation.navigate("CreateStack");
        }}
      >
        Begin
      </Button>
    </SafeAreaView>
  );
};

export default CreateScreen;
