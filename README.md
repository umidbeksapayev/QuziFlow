# Interview & Flashcard Quiz Platform

Bu loyiha dasturchilar uchun savol-javob (flashcards) formatida o'z bilimlarini sinash, rivojlantirish va o'zlashtirilgan ma'lumotlarni doimiy xotirada saqlab qolish uchun yaratilgan to'liq professional platformadir. Loyihada **SM-2 (SuperMemo-2) Spaced Repetition (oraliqli takrorlash)** algoritmi, moslashuvchan dark/light mavzusi, qidirish va filtrlash, shuningdek foydalanuvchining shaxsiy statistikalari (daily streak va faollik heatmap) integratsiya qilingan.

---

## 🚀 Texnologiyalar tarkibi
* **Frontend**: React + Vite (Fast JSX rendering, Rolldown bundler)
* **Styling**: TailwindCSS (Modern shishasimon dizayn, glassmorphism, responsive, custom animations)
* **State Management**: Zustand (Yengil, modulli va yuqori tezlikdagi state management)
* **Backend**: Node.js + Express (Modular architecture, clean MVC separation)
* **Database & ORM**: SQLite (mahalliy ishga tushirish qulayligi uchun) va Prisma ORM (Ishlab chiqarish (production) uchun osongina PostgreSQL/MongoDB-ga ulanadi)
* **Authentication**: JSON Web Tokens (JWT) & bcryptjs parollarni shifrlash

---

## 📂 Loyiha tuzilishi (Folder Structure)

```
testSavollar/
├── backend/
│   ├── src/
│   │   ├── controllers/      # So'rovlarni qayta ishlovchi kontrollerlar (Auth, Cards, Stats)
│   │   ├── middleware/       # JWT marshrut himoyachilari (authMiddleware)
│   │   ├── routes/           # Express API yo'nalishlari (auth, cards, stats)
│   │   ├── utils/            # SM-2 algoritmi va yordamchi funksiyalar
│   │   ├── prisma/           # Ma'lumotlar bazasi sxemalari (schema.prisma) va Seed script
│   │   └── index.js          # Backend serverining kirish nuqtasi
│   ├── .env                  # Port, JWT secret va Database ulanish parametrlari
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # UI va funksional komponentlar
│   │   │   ├── Auth/         # Kirish/Ro'yxatdan o'tish (AuthForm)
│   │   │   ├── Dashboard/    # Streak Heatmap, Stats cards, Mastery grafika, Category progress
│   │   │   ├── Flashcard/    # Card Container, DeckFilter, 3D flip card
│   │   │   ├── Layout/       # Navbar va ThemeToggle
│   │   │   └── UI/           # Toast, Skeleton loading
│   │   ├── store/            # Zustand global do'konlari (auth, quiz, UI)
│   │   ├── services/         # API fetch so'rovlari (api.js wrapper)
│   │   ├── App.jsx           # Global sahifalar boshqaruvi va marshrutlash
│   │   ├── main.jsx          # React kirish nuqtasi
│   │   └── index.css         # TailwindCSS va 3D effektlar uchun maxsus CSS stillari
│   ├── index.html            # Asosiy HTML hujjati
│   ├── tailwind.config.js    # Shaxsiy ranglar va fontlar konfiguratsiyasi
│   ├── postcss.config.js
│   └── package.json
├── README.md                 # Loyiha hujjatlari (ushbu fayl)
└── package.json              # Concurrently yordamida loyihani ishga tushiruvchi skriptlar
```

---

## 🧠 Spaced Repetition (SM-2) Algoritmi

Loyihada foydalanuvchilar o'zlashtirgan kartalarni uzoq muddatli xotirada saqlash uchun ilmiy tasdiqlangan SuperMemo-2 (SM-2) algoritmi ishlatiladi.
Har safar foydalanuvchi javobni tekshirganda uning natijasi quyidagicha qayta ishlanadi:
* **Bilaman** ✅: 4 (yoki 5) baho beriladi. Repetitions (takrorlashlar soni) bittaga oshadi, interval (keyingi ko'rsatuv muddati) ko'payadi va **Easiness Factor (EF - osonlik koeffitsiyenti)** yuqorilaydi.
* **Bilmayman** ❌: 1 baho beriladi. Repetitions 0 ga qaytadi, interval 1 kunga qisqartiriladi, Easiness Factor kamayadi (minimal 1.3 gacha).

Buning natijasida siz tez-tez xato qilayotgan savollaringiz kunlik takrorlash (Due queue) ro'yxatida tez-tez chiqadi, oson savollar esa bir necha kundan so'ng qayta ko'rsatiladi.

---

## 💻 Mahalliy ishga tushirish (Setup Guide)

Loyiha hech qanday qo'shimcha baza (PostgreSQL/MongoDB) o'rnatmasdan **SQLite** orqali darhol ishlaydigan qilib sozlangan.

### 1. Loyihani yuklash va bog'liqliklarni o'rnatish
Loyiha ildiz (root) papkasida turib quyidagi buyruqni bajaring. Bu buyruq backend va frontend uchun barcha kerakli kutubxonalarni o'rnatadi:
```bash
npm run setup
```
*(Bu buyruq `npm install`-larni bajaradi, Prisma migration-larni ishga tushiradi va ma'lumotlar bazasiga default 30+ ta dasturlashga oid muhim savollarni yozadi).*

### 2. Loyihani ishga tushirish
Sinxron ravishda ham Express serverni, ham Vite React-ni ishga tushirish uchun root papkada quyidagi buyruqni bering:
```bash
npm run dev
```
Tizim ishga tushgach:
* **Frontend**: [http://localhost:5173](http://localhost:5173) manzilida
* **Backend**: [http://localhost:5000](http://localhost:5000) manzilida ishlaydi.

---

## 🛠️ PostgreSQL-ga o'tkazish (Production Setup)

Loyihani PostgreSQL-ga o'tkazish juda oson:
1. `backend/src/prisma/schema.prisma` faylida:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. `backend/.env` faylida `DATABASE_URL` qiymatini o'zgartiring:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/db_name?schema=public"
   ```
3. O'zgarishlardan so'ng quyidagi buyruqni ishga tushiring:
   ```bash
   npm run prisma:migrate
   ```

---

## ⌨️ Klaviatura qisqa yo'llari (Keyboard Shortcuts)

Flashcards bilan tezkor va qulay ishlash uchun quyidagi qisqa tugmalardan foydalanishingiz mumkin:
* **Space (Bo'sh joy tugmasi)**: Kartani oldi-orqa tomonini aylantirish (Flip card).
* **Chapga yo'nalish tugmasi (&larr;)**: "Bilmayman" ❌ deb javob berish (Karta ochiq bo'lganda).
* **O'ngga yo'nalish tugmasi (&rarr;)**: "Bilaman" ✅ deb javob berish (Karta ochiq bo'lganda).
