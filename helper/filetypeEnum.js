import mediaRefEnum from "./representationEnum";

export const filetypeEnum = Object.freeze({
  Image: "images",
  Audio: "audio",
  Voice: "voice",
  Video: "videos"
});

export const getLocationFiletype = mediaRef => {
  switch (mediaRefEnum[mediaRef]) {
    case mediaRefEnum.Image:
      return filetypeEnum.Image;
    case mediaRefEnum["Image Text"]:
      return filetypeEnum.Image;
    case mediaRefEnum.Video:
      return filetypeEnum.Video;
    case mediaRefEnum.Audio:
      return filetypeEnum.Audio;
    case mediaRefEnum.Voice:
      return filetypeEnum.Voice;
    default:
      console.error("default switch statement reached");
      break;
  }
};
