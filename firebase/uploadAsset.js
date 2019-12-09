import Firebase from "firebase";

export const uploadImage = async (image, filename, uid) => {
  const url = `images/${filename}`;
  const imageData = await fetch(image);
  const imageBlob = await imageData.blob();

  const ref = Firebase.storage().ref().child(url);

  return await ref.put(imageBlob).then(() => ref.getDownloadURL());
}