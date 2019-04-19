// Initialize Firebase

var config = {
    apiKey: "AIzaSyDMYpInrRV-1YRW6NsZu-GF_XX-R5fwZB8",
    authDomain: "jstemplates-91358.firebaseapp.com",
    databaseURL: "https://jstemplates-91358.firebaseio.com",
    projectId: "jstemplates-91358",
    storageBucket: "jstemplates-91358.appspot.com",
    messagingSenderId: "956201364905",
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
let token = null;

messaging.usePublicVapidKey('BAp7u4PzjypiDrdRUU2JX4nCWImGV66jKQKnzC1_MkdtH5oYcCAq9gB0aqAHg-XpfoHoj505_ADomduEvNSWrko');

messaging.requestPermission()
    .then(() => messaging.getToken())
    .then(tokenS => token = tokenS)
    .catch(err => console.log('Err :', err));

messaging.onMessage(payload => {
    let obj = payload.notification;
    new Notification(obj.title, {
        body: obj.body
    })
});