// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyCPq5sSe6IcMKCG6ocxKgw3SN0wfhn11pI",
    authDomain: "todotasks-5c2a9.firebaseapp.com",
    projectId: "todotasks-5c2a9",
    storageBucket: "todotasks-5c2a9.appspot.com",
    messagingSenderId: "813965289640",
    appId: "1:813965289640:web:cb1401465f9479f40eba9d",
    measurementId: "G-TEDBSBFEXQ"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});




