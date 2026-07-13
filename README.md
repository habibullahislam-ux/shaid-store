# সাঈদের দোকান — অনলাইন অর্ডারিং অ্যাপ (Phase 1 MVP)

এই ফোল্ডারে ৩টা মূল ফাইল আছে:
- `customer.html` — কাস্টমার অ্যাপ (ক্যাটালগ, কার্ট, চেকআউট)
- `admin.html` — এডমিন প্যানেল (পণ্য ও অর্ডার ম্যানেজমেন্ট)
- `firebase-config.js` — Firebase কানেকশন সেটিংস (এখানে আপনার কনফিগ বসাতে হবে)
- `seed-products.json` — আপলোড করা ৫০০টা পণ্যের লিস্ট (দাম ০, স্টক ২০ ডিফল্ট)

কোনো npm বা বিল্ড টুল লাগবে না — সরাসরি ব্রাউজারে খুললেই চলবে, শুধু Firebase সেটআপ করতে হবে একবার।

---

## ধাপ ১: Firebase প্রজেক্ট তৈরি করুন

1. https://console.firebase.google.com এ যান, Google একাউন্ট দিয়ে লগইন করুন
2. **"Add project"** চাপুন
3. প্রজেক্টের নাম দিন, যেমন `rahman-store` — চাইলে Google Analytics বন্ধ রাখতে পারেন (দরকার নেই)
4. প্রজেক্ট তৈরি হওয়া পর্যন্ত অপেক্ষা করুন

## ধাপ ২: Firestore Database চালু করুন

1. বাম পাশের মেনু থেকে **Build > Firestore Database** এ যান
2. **"Create database"** চাপুন
3. Location হিসেবে কাছাকাছি একটা রিজিয়ন বেছে নিন (যেমন `asia-south1`)
4. **Production mode** সিলেক্ট করে Enable করুন

## ধাপ ৩: Authentication চালু করুন (এডমিন লগইনের জন্য)

1. বাম মেনু থেকে **Build > Authentication** এ যান
2. **"Get started"** চাপুন
3. **Sign-in method** ট্যাবে গিয়ে **Email/Password** চালু (Enable) করুন
4. **Users** ট্যাবে গিয়ে **"Add user"** চাপুন — এখানে নিজের ইমেইল ও একটা পাসওয়ার্ড দিন, এটাই এডমিন প্যানেলে লগইনের জন্য ব্যবহার হবে

## ধাপ ৪: Web App যোগ করে কনফিগ কপি করুন

1. প্রজেক্ট সেটিংস (⚙️ আইকন) > **Project settings** এ যান
2. নিচে স্ক্রল করে **"Your apps"** সেকশনে `</>` (Web) আইকনে ক্লিক করুন
3. একটা নাম দিন (যেমন `rahman-store-web`), Firebase Hosting সেটআপ করার দরকার নেই এখন
4. যে `firebaseConfig` অবজেক্টটা দেখাবে সেটা কপি করুন
5. `firebase-config.js` ফাইলটা খুলে `YOUR_API_KEY` ইত্যাদি জায়গায় নিজের ভ্যালুগুলো বসান

## ধাপ ৫: Firestore Security Rules বসান

1. Firestore Database > **Rules** ট্যাবে যান
2. নিচের rules গুলো বসিয়ে **Publish** করুন:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /orders/{orderId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

এই নিয়মে কাস্টমাররা পণ্য দেখতে পারবে ও অর্ডার দিতে পারবে (লগইন ছাড়াই), কিন্তু পণ্য এডিট বা অর্ডার স্ট্যাটাস বদলাতে পারবে শুধু লগইন করা এডমিন।

## ধাপ ৬: অ্যাপ চালু করুন

1. `customer.html`, `admin.html`, `firebase-config.js`, `seed-products.json` — এই ৪টা ফাইল একই ফোল্ডারে রাখুন
2. `admin.html` ব্রাউজারে খুলুন, ধাপ ৩-এ বানানো ইমেইল/পাসওয়ার্ড দিয়ে লগইন করুন
3. **"পণ্য"** ট্যাবে গিয়ে **"সিড ডেটা ইম্পোর্ট (৫০০ পণ্য)"** বাটনে চাপুন — সব পণ্য Firestore-এ চলে যাবে
4. প্রতিটা পণ্যের দাম (Price) ও স্টক টেবিল থেকে সরাসরি এডিট করে বসিয়ে দিন
5. `customer.html` খুলে দেখুন — শুধু "সক্রিয়" স্ট্যাটাসের ও দাম বসানো পণ্য দেখাবে

---

## অনলাইনে হোস্ট করা (মোবাইল থেকে অ্যাক্সেসের জন্য)

আপনার আগের প্রজেক্টগুলোর মতো এই ফাইলগুলোও Netlify বা Firebase Hosting-এ আপলোড করে দিলে যেকোনো জায়গা থেকে লিংক দিয়ে অ্যাক্সেস করা যাবে। Netlify-তে শুধু এই ৪টা ফাইল ড্র্যাগ-ড্রপ করলেই কাজ হয়ে যাবে।

---

## Phase 2-এর জন্য যা বাকি থাকলো (পরে যোগ করা যাবে)

- ড্যাশবোর্ড সেলস রিপোর্ট (daily/monthly)
- কুপন ও ডিসকাউন্ট
- কাস্টমার হিস্ট্রি ও Reorder
- পণ্যের আসল ছবি (এখন ইমোজি আইকন দিয়ে দেখানো হচ্ছে)
- push notification (নতুন অর্ডার এলে)
- SMS/WhatsApp দিয়ে অর্ডার কনফার্মেশন

এগুলো নিয়ে যখন প্রস্তুত হবেন, বলবেন — ধাপে ধাপে যোগ করে দেবো।
