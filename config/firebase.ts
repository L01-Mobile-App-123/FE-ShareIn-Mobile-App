import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAJy7E222PPoYlNqPjP1HY6vJDCcj5ESGc',
  authDomain: 'mobile-42f8f.firebaseapp.com',
  projectId: 'mobile-42f8f',
  storageBucket: 'mobile-42f8f.firebasestorage.app',
  messagingSenderId: '358784758263',
  appId: '1:358784758263:web:652629ed0e9379c0acfef2',
  measurementId: 'G-MJS1T91VSQ',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
