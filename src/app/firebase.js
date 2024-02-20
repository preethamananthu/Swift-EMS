// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6bbz683BLAyXZ85HxbEPypfKSTXf9ryc",
  authDomain: "swift-demo1.firebaseapp.com",
  projectId: "swift-demo1",
  storageBucket: "swift-demo1.appspot.com",
  messagingSenderId: "8367995021",
  appId: "1:8367995021:web:942376b72a31764f470ac4",
  measurementId: "G-KK4LTS76PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth=getAuth(app);

// export default firebase(){<>Nothing is here</>};