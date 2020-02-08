import Firebase from "firebase";

export const uploadAsset = async (file, filename, filetype) => {
  const url = `${filetype}/${filename}`;
  const fileData = await fetch(file);
  const fileBlob = await fileData.blob();

  const ref = Firebase.storage()
    .ref()
    .child(url);

  return await ref.put(fileBlob).then(() => ref.getDownloadURL());
};
