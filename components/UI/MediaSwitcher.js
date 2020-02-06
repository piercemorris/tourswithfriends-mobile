import React from "react";
import { StyleSheet, Text } from "react-native";

import mediaTypeRef from "../../helper/representationEnum";
import ImageUncover from "../ReceivedGiftMedia/ImageUncover";

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
      return <Text>Not yet implemented</Text>;
    case mediaTypeRef.Audio:
      return <Text>Not yet implemented</Text>;
    default:
      console.error("Default switch handler reached - mediaType not defined");
      break;
  }
};

export default MediaSwitcher;
