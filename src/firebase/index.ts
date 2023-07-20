import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// envから読み込み用
// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STRAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
// } from 'constants/env';

const firebaseConfig = {
  apiKey: 'AIzaSyCMoarbmdaLkqiF-kYXWiV4HzdePAgUl2A',
  authDomain: 'niikei-cms.firebaseapp.com',
  projectId: 'niikei-cms',
  storageBucket: 'niikei-cms.appspot.com',
  messagingSenderId: '769478816418',
  appId: '1:769478816418:web:9b13a89183ea486c729dfb',
};
// INFO: ~20270707
// const firebaseConfig = {
//   apiKey: 'AIzaSyAYt6ZyGJ2ZTjp2ALCo3D6Uhw72julmsUQ',
//   authDomain: 'niikei-39d3f.firebaseapp.com',
//   projectId: 'niikei-39d3f',
//   storageBucket: 'niikei-39d3f.appspot.com',
//   messagingSenderId: '234851398955',
//   appId: '1:234851398955:web:932a1c255d5f612d59416e',
// };
// envから読み込み用
// const firebaseConfig = {
//   apiKey: API_KEY ?? 'AIzaSyAYt6ZyGJ2ZTjp2ALCo3D6Uhw72julmsUQ',
//   authDomain: AUTH_DOMAIN ?? 'niikei-39d3f.firebaseapp.com',
//   projectId: PROJECT_ID ?? 'niikei-39d3f',
//   storageBucket: STRAGE_BUCKET ?? 'niikei-39d3f.appspot.com',
//   messagingSenderId: MESSAGING_SENDER_ID ?? '234851398955',
//   appId: APP_ID ?? '1:234851398955:web:932a1c255d5f612d59416e',
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
