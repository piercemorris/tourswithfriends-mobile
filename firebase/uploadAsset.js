import Firebase from "firebase";

export const uploadAsset = async (file, filename, filetype) => {
  try {
    const url = `${filetype}/${filename}`;
    const fileData = await fetch(file);
    const fileBlob = await fileData.blob();

    const ref = Firebase.storage()
      .ref()
      .child(url);

    const downloadURL = await ref
      .put(fileBlob)
      .then(() => ref.getDownloadURL())
      .catch(err => console.log(err));

    return downloadURL;
  } catch (ex) {
    console.log(ex);
  }
};
