import { Notifications } from "expo";
import Firebase from "firebase";
import * as Permissions from "expo-permissions";

export async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== "granted") {
    alert("No notification permissions!");
    return;
  }

  try {
    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // Get the current user
    const currentUser = Firebase.auth().currentUser;

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    Firebase.database()
      .ref(`users/${currentUser.uid}/push_token`)
      .set(token);
  } catch (err) {
    console.log(err);
  }
}
