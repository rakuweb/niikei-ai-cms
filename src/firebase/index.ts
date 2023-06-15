import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STRAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from 'constants/env';

const firebaseConfig = {
  apiKey: API_KEY ?? 'AIzaSyAYt6ZyGJ2ZTjp2ALCo3D6Uhw72julmsUQ',
  authDomain: AUTH_DOMAIN ?? 'niikei-39d3f.firebaseapp.com',
  projectId: PROJECT_ID ?? 'niikei-39d3f',
  storageBucket: STRAGE_BUCKET ?? 'niikei-39d3f.appspot.com',
  messagingSenderId: MESSAGING_SENDER_ID ?? '234851398955',
  appId: APP_ID ?? '1:234851398955:web:932a1c255d5f612d59416e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
