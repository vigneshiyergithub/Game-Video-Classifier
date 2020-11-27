import firebase from "firebase";

const config = {
    apiKey: "AIzaSyCryJ4k18JHLdx04b28bOjRPdcfvosxXg8",
    authDomain: "apexrat-e6ff5.firebaseapp.com",
    databaseURL: "https://apexrat-e6ff5.firebaseio.com",
    projectId: "apexrat-e6ff5",
    storageBucket: "apexrat-e6ff5.appspot.com",
    messagingSenderId: "785495384320",
    appId: "1:785495384320:web:dc49a028f5500ae69893e5",
    measurementId: "G-P6BV638JTN"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
