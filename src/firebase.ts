// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA7E5uMhwOMum2TPqTpQvV5Q-ki6EkX9E",
  authDomain: "austin-blog.firebaseapp.com",
  databaseURL: "https://austin-blog-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "austin-blog",
  storageBucket: "austin-blog.appspot.com",
  messagingSenderId: "234954796390",
  appId: "1:234954796390:web:8695aaee9ee2567d222ca7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const isDev = import.meta.env.MODE === "development";
if (isDev) {
  const db = getDatabase();
  connectDatabaseEmulator(
    db,
    "localhost",
    9001 // ここはfirebase.jsonに入っている設定に合わせましょう！
  );
}
