# এসো আরবি শিখি — PWA প্যাকেজ

এই ফোল্ডারে আপনার গেমের সম্পূর্ণ, ইনস্টলযোগ্য PWA (Progressive Web App) ভার্সন আছে।

## ফাইল গঠন
```
├── index.html              (মূল গেম — সব লজিক ও UI)
├── manifest.json           (PWA মেটাডেটা — নাম, আইকন, থিম কালার)
├── sw.js                   (সার্ভিস ওয়ার্কার — অফলাইন সাপোর্ট)
└── icons/
    ├── icon-192.png         (হোম স্ক্রিন আইকন)
    ├── icon-512.png         (হোম স্ক্রিন আইকন, বড়)
    ├── icon-maskable-192.png (Android adaptive আইকন)
    ├── icon-maskable-512.png (Android adaptive আইকন, বড়)
    ├── apple-touch-icon.png (iOS হোম স্ক্রিন)
    ├── favicon-32.png
    └── favicon-16.png
```

## GitHub Pages-এ আপলোড করে লাইভ করা

1. GitHub-এ একটি নতুন রিপোজিটরি তৈরি করুন (public হতে হবে)।
2. এই ফোল্ডারের **সব ফাইল** (icons ফোল্ডারসহ) রিপোর root-এ আপলোড করুন —
   GitHub ওয়েবসাইটে "Add file → Upload files" দিয়ে drag-and-drop করলেই হবে,
   অথবা টার্মিনাল থেকে:
   ```bash
   git init
   git add .
   git commit -m "Initial PWA release"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
3. রিপোর **Settings → Pages** এ যান।
4. "Branch" এ `main` সিলেক্ট করুন, ফোল্ডার `/ (root)` রাখুন, তারপর Save করুন।
5. কয়েক মিনিট পর আপনার গেম লাইভ হবে এই ঠিকানায়:
   `https://<username>.github.io/<repo-name>/`

> ফাইলগুলোর ভেতরের সব লিংক (manifest, icons, sw.js) relative path
> (যেমন `./icons/...`) দিয়ে লেখা, তাই GitHub Pages-এর সাবফোল্ডার
> ঠিকানাতেও (`username.github.io/repo-name/`) এটি ঠিকঠাক কাজ করবে —
> আলাদা কোনো path পরিবর্তন লাগবে না।

## ইনস্টল করে দেখা (মোবাইল/ডেস্কটপ)

লাইভ লিংকে ভিজিট করার পর:
- **Android (Chrome):** ঠিকানা বারে বা মেনুতে "Install app" / "Add to Home screen" অপশন আসবে।
- **iPhone (Safari):** Share বাটন → "Add to Home Screen"।
- **ডেস্কটপ (Chrome/Edge):** ঠিকানা বারের ডানপাশে ইনস্টল আইকন (⊕) দেখাবে।

ইনস্টল করলে এটি একটি সাধারণ অ্যাপের মতোই আইকনসহ হোম স্ক্রিনে বসবে এবং
ইন্টারনেট ছাড়াও (sw.js এর কল্যাণে) খোলা যাবে।

## ভবিষ্যতে কনটেন্ট আপডেট করলে

`sw.js` ফাইলে থাকা `CACHE_NAME` এর ভ্যালু বাড়িয়ে দিন, যেমন:
```js
const CACHE_NAME = 'esho-arabi-shikhi-v1';   // পুরনো
const CACHE_NAME = 'esho-arabi-shikhi-v2';   // নতুন আপডেটের পর
```
এটা না করলে যারা আগে থেকে অ্যাপটি ইনস্টল করে রেখেছেন, তারা ব্রাউজার
ক্যাশের কারণে পুরনো ভার্সন দেখতে পারেন।

## পরবর্তীতে APK বানানো

এই PWA থেকে সরাসরি একটি Android APK/AAB বানানো যায়, কোনো নতুন কোড
লেখা ছাড়াই। দুটি সহজ পথ:

### অপশন ১ — PWABuilder (সবচেয়ে সহজ, কোনো ইনস্টল লাগে না)
1. https://www.pwabuilder.com এ যান।
2. আপনার লাইভ GitHub Pages লিংক (`https://<username>.github.io/<repo-name>/`) পেস্ট করুন।
3. এটি স্বয়ংক্রিয়ভাবে আপনার `manifest.json` ও `sw.js` শনাক্ত করবে।
4. "Package for stores" → **Android** সিলেক্ট করুন।
5. এটি একটি সাইনড/আনসাইনড APK বা AAB ফাইল জেনারেট করে দেবে, যেটা
   সরাসরি ইনস্টল করা যায় অথবা Play Store-এ আপলোড করা যায়।

### অপশন ২ — Bubblewrap CLI (Google-এর অফিসিয়াল টুল, বেশি কন্ট্রোল)
```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest=https://<username>.github.io/<repo-name>/manifest.json
bubblewrap build
```
এটি একটি Trusted Web Activity (TWA) ভিত্তিক Android প্রজেক্ট তৈরি করে,
যা থেকে সরাসরি APK/AAB build করা যায়।

> দুটি পদ্ধতিতেই `icon-512.png` এবং `icon-maskable-512.png` ব্যবহৃত
> হবে, যা এই প্যাকেজে আগে থেকেই তৈরি করা আছে — তাই এই ধাপে আলাদা করে
> আইকন বানাতে হবে না।

## থিম কালার
আইকনের ব্যাকগ্রাউন্ড রঙ থেকে নেওয়া: `#007964` — এটি `manifest.json`
ও `index.html` এর theme-color মেটা ট্যাগে ব্যবহার করা হয়েছে, যাতে
স্ট্যাটাস বার ও ব্রাউজার UI আপনার আইকনের সাথে মিলে যায়।
