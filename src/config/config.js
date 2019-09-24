import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCs3-pT2_oB97DEfhRZzdFBMPxCfNQvh3o",
    authDomain: "nn-courier.firebaseapp.com",
    databaseURL: "https://nn-courier.firebaseio.com",
    projectId: "nn-courier",
    storageBucket: "nn-courier.appspot.com",
  };
  firebase.initializeApp(firebaseConfig);


export default firebase;