import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDA0Qk8VzQzoO_lR_-pHuT1NePq1Y2ihRE',
  authDomain: 'firepic-30686.firebaseapp.com',
  projectId: 'firepic-30686',
  storageBucket: 'firepic-30686.appspot.com',
  messagingSenderId: '1026514760266',
  appId: '1:1026514760266:web:6e9da4d67512293852ecb3',
  measurementId: 'G-N636JY34SB',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
