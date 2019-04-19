importScripts("https://www.gstatic.com/firebasejs/5.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.10.0/firebase-messaging.js");

var config = {
    apiKey: "AIzaSyDMYpInrRV-1YRW6NsZu-GF_XX-R5fwZB8",
    authDomain: "jstemplates-91358.firebaseapp.com",
    databaseURL: "https://jstemplates-91358.firebaseio.com",
    projectId: "jstemplates-91358",
    storageBucket: "jstemplates-91358.appspot.com",
    messagingSenderId: "956201364905",
};
firebase.initializeApp(config);
firebase.messaging()
    .setBackgroundMessageHandler(payload =>
        self.registration.showNotification(payload.notification.title, { body: payload.notification.body }));