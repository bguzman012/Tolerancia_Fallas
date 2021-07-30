importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyDIGS_8WgkCevNlPNBCY1GIn208xFXMASw",
  authDomain: "skillsoft-ea998.firebaseapp.com",  
  projectId: "skillsoft-ea998",
  storageBucket: "skillsoft-ea998.appspot.com",
  messagingSenderId: "598079570410",
  appId: "1:598079570410:web:ec38ce89e2f5cec6a13293"
});
const messaging = firebase.messaging();