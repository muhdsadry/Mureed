import * as firebase from 'firebase';

 let config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
let app = firebase.initializeApp(config);
export const db = app.database();


