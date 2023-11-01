import firebase from "firebase/app";
import "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjRHihyJeO5rwKLSvNLVRD4vPaVf_ocFw",
  authDomain: "my-notification-2ac09.firebaseapp.com",
  projectId: "my-notification-2ac09",
  storageBucket: "my-notification-2ac09.appspot.com",
  messagingSenderId: "72020072684",
  appId: "1:72020072684:web:ca52fba2093c5b1bf0edc9"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    // currentToken = await messaging.requestPermission().then(() => messaging.getToken({ vapidKey: publicKey }));
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
