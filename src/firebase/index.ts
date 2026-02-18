import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDJOX_77h8GybvmDvjVDbDc08rFTaD4RMQ',
  authDomain: 'niikei-11666.firebaseapp.com',
  projectId: 'niikei-11666',
  storageBucket: 'niikei-11666.firebasestorage.app',
  messagingSenderId: '778408039768',
  appId: '1:778408039768:web:9a41e1a4d78eee4586012d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
