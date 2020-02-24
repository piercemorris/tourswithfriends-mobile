import Firebase from "firebase";

export const uploadAsset = async (file, filename, filetype) => {
  console.log(file, filename);
  try {
    console.log("Initial");
    const url = `${filetype}/${filename}`;
    console.log(url);
    const fileData = await fetch(file);
    const fileBlob = await fileData.blob();

    console.log("Fetched file and data");

    console.log("Generating ref for database");
    const ref = Firebase.storage()
      .ref()
      .child(url);

    console.log("Attempting to upload asset");
    const downloadURL = await ref
      .put(fileBlob)
      .then(() => ref.getDownloadURL())
      .catch(err => console.log(err));

    console.log("Uploaded asset", downloadURL);
    return downloadURL;
  } catch (ex) {
    console.log(ex);
  }
};
