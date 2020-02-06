import React from "react";
import { View, Text } from "react-native";

import mediaType from "../../helper/representationEnum";

import CreateImage from "../CreatingGiftMedia/CreateImage";
import CreateVoice from "../CreatingGiftMedia/CreateVoice";

const RepresentationSwitcher = props => {
  switch (mediaType[props.selectedMethod]) {
    case mediaType.Image:
      return <CreateImage {...props} />;
    case mediaType["Image Text"]:
      return <Text>Not yet implemented</Text>;
    case mediaType.Video:
      return <Text>Not yet implemented</Text>;
    case mediaType.Alert:
      return <Text>Not yet implemented</Text>;
    case mediaType["Music Alert"]:
      return <Text>Not yet implemented</Text>;
    case mediaType.Voice:
      return <CreateVoice {...props} />;
    case mediaType.Audio:
      return <Text>Not yet implemented</Text>;
    default:
      console.error(
        "Default switch handler reached - selectMethod not defined"
      );
      break;
  }
};

export default RepresentationSwitcher;
