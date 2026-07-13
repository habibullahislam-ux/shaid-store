// ==========================================================
// সাঈদের দোকান — Firebase কনফিগ (fir-store-328d9 প্রজেক্ট)
// এই ফাইলটা customer.html ও admin.html এর পাশে একই ফোল্ডারে রাখুন
// ==========================================================
const firebaseConfig = {
  apiKey: "AIzaSyA7c7e8FOWTaq6wroIdY7Y7_ey4XHzc7rw",
  authDomain: "fir-store-328d9.firebaseapp.com",
  projectId: "fir-store-328d9",
  storageBucket: "fir-store-328d9.firebasestorage.app",
  messagingSenderId: "250277964176",
  appId: "1:250277964176:web:cbd7978dc3069b4f302b15"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
