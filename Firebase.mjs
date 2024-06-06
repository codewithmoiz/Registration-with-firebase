import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzfS_Mj_gbw8vB-OtKfgp2hj-yG6PqaHs",
  authDomain: "registration-form-aa530.firebaseapp.com",
  projectId: "registration-form-aa530",
  storageBucket: "registration-form-aa530.appspot.com",
  messagingSenderId: "731173152837",
  appId: "1:731173152837:web:0d0303f293ee69587cdb2c"
};

export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const db = getFirestore(app);