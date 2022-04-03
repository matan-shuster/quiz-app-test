// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyBzpbVMVoTizabjBjdFsmhhM5Zb__lo3JQ",

    authDomain: "quiz-app-2d96a.firebaseapp.com",

    projectId: "quiz-app-2d96a",

    storageBucket: "quiz-app-2d96a.appspot.com",

    messagingSenderId: "490024422009",

    appId: "1:490024422009:web:5911bd7ded0de2ccf522a8",

    measurementId: "G-QEYDS30VMX"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);