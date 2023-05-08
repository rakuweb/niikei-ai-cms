import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAYt6ZyGJ2ZTjp2ALCo3D6Uhw72julmsUQ',
  authDomain: 'niikei-39d3f.firebaseapp.com',
  projectId: 'niikei-39d3f',
  storageBucket: 'niikei-39d3f.appspot.com',
  messagingSenderId: '234851398955',
  appId: '1:234851398955:web:932a1c255d5f612d59416e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
