
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyCB8BpROPadoBBlP7AW4HGwT8ij93draTs",
    authDomain: "fir-rnrjs.firebaseapp.com",
    projectId: "fir-rnrjs",
    storageBucket: "fir-rnrjs.appspot.com",
    messagingSenderId: "386696795385",
    appId: "1:386696795385:web:3a1fba3aa0193c54883e28",
    measurementId: "G-7E9XW15GCQ"
};

// khởi tạo ứng dụng firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
} 
else {
    firebase.app();
}

// sử dụng các dich vụ firebase
const auth = firebase.auth()
const firestore = firebase.firestore();