# এসো আরবি শিখি — PWA প্যাকেজ

এই ফোল্ডারে আপনার গেমের সম্পূর্ণ, ইনস্টলযোগ্য PWA (Progressive Web App) ভার্সন আছে।

## ফাইল গঠন

> **নোট:** আগের ভার্সনে আইকনগুলো আলাদা `icons/` ফোল্ডারে ছিল, কিন্তু
> GitHub-এর ওয়েব আপলোড বাটন (Add file → Upload files → ফাইল বেছে নেওয়া)
> সাবফোল্ডার তৈরি করতে পারে না — শুধু ড্র্যাগ-অ্যান্ড-ড্রপ করলে ফোল্ডার
> ঠিকভাবে যায়। এই কারণেই আইকনগুলো 404 হচ্ছিল এবং Android তাই "Install"
> অপশন দেখায়নি। এখন সব ফাইল **একই লেভেলে (root)** রাখা হয়েছে, যাতে
> কীভাবেই আপলোড করুন না কেন, কোনো ফাইল হারিয়ে না যায়।

```
├── index.html
├── manifest.json
├── sw.js
├── icon-192.png
├── icon-512.png
├── icon-maskable-192.png
├── icon-maskable-512.png
├── apple-touch-icon.png
├── favicon-32.png
└── favicon-16.png
```

সবগুলো ফাইল রিপোর **rootএ** থাকতে হবে — কোনো সাবফোল্ডারে না।

## GitHub Pages-এ আপলোড করে লাইভ করা

1. GitHub-এ একটি নতুন রিপোজিটরি তৈরি করুন (public হতে হবে)।
2. এই ফোল্ডারের **সব ১০টি ফাইল** একসাথে সিলেক্ট করে "Add file → Upload
   files" পেজে ড্র্যাগ-অ্যান্ড-ড্রপ করুন (বা ফাইল পিকার দিয়ে সবগুলো
   একসাথে বেছে নিন)। যেহেতু এখন কোনো সাবফোল্ডার নেই, তাই সব ফাইলই
   সরাসরি root-এ চলে যাবে — কোনো ফাইল miss হওয়ার সুযোগ নেই।
   পুরনো রিপোতে যদি আগের `icons/` ফোল্ডার এবং তার ভেতরের পুরনো ফাইলগুলো
   থেকে থাকে, সেগুলো মুছে দিন যাতে পুরনো broken path ও নতুন ফাইল একসাথে
   না থাকে।

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
আইকনের ব্যাকগ্রাউন্ড রঙ থেকে নেওয়া: `#176941` — এটি `manifest.json`
ও `index.html` এর theme-color মেটা ট্যাগে ব্যবহার করা হয়েছে, যাতে
স্ট্যাটাস বার ও ব্রাউজার UI আপনার আইকনের সাথে মিলে যায়।
