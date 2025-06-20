import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

 const firebaseConfig = {
      apiKey: "AIzaSyBdYIyBptMgyjLvJ6dvHEtKfX-ShXYEXn4",
       authDomain: "base-de-datos-nosql-c8735.firebaseapp.com",
       projectId: "base-de-datos-nosql-c8735",
       storageBucket: "base-de-datos-nosql-c8735.firebasestorage.app",
       messagingSenderId: "487106898993",
       appId: "1:487106898993:web:47c0634b90ee8a6ad5b910",
       measurementId: "G-VK10CJDGHP"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
