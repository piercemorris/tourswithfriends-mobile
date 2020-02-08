import React from "react";
import { StyleSheet, Text } from "react-native";

import mediaTypeRef from "../../helper/representationEnum";
import ImageUncover from "../ReceivedGiftMedia/ImageUncover";
import VoiceUncover from "../ReceivedGiftMedia/VoiceUncover";

const MediaSwitcher = ({ name, mediaType, mediaFileRef }) => {
  switch (mediaTypeRef[mediaType]) {
    case mediaTypeRef.Image:
      return <ImageUncover name={name} mediaFileRef={mediaFileRef} />;
    case mediaTypeRef["Image Text"]:
      return <Text>Not yet implemented</Text>;
    case mediaTypeRef.Video:
      return <Text>Not yet implemented</Text>;
    case mediaTypeRef.Alert:
      return <Text>Not yet implemented</Text>;
    case mediaTypeRef["Music Alert"]:
      return <Text>Not yet implemented</Text>;
    case mediaTypeRef.Voice:
      return <VoiceUncover name={name} mediaFileRef={mediaFileRef} />;
    case mediaTypeRef.Audio:
      return <Text>Not yet implemented</Text>;
    default:
      console.error("Default switch handler reached - mediaType not defined");
      break;
  }
};

export default MediaSwitcher;
