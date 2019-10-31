import React from "react";
import { SafeAreaView } from "react-native";

import Header from "../components/UI/Header";
import Button from "../components/UI/Button";
import Info from "../components/UI/Info";
import StyledText from "../components/StyledText";

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
