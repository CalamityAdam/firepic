import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';

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
  if (window) firebase.analytics();
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;

// Helpers

/**
 * gets a users/{uid} document with username
 * @param {string} username do
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
