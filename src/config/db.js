import * as firebase from 'firebase';

 let config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""

  };
let app = firebase.initializeApp(config);
export const db = app.database();


