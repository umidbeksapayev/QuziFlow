import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const flashcards = [
  [
    {
      "question": "Ko‘chmas mulk obyektlarining davlat kadastri sohasida davlat xizmatlari narxlarini belgilash tartibi qaysi qarorga asosan tasdiqlangan?",
      "answer": "Vazirlar Mahkamasining 2014-yil 10-iyuldagi \"Ko‘chmas mulk obyektlarining davlat kadastri sohasida davlat xizmatlari narxlarini belgilash tartibini takomillashtirish to‘g‘risida\"gi 186-sonli qaroriga asosan.",
      "category": "Qonunchilik",
      "difficulty": "medium",
      "tags": "qaror,narxlar,davlat xizmatlari"
    },
    {
      "question": "Hisoblang: 3 · ((6.5 - 0.5) - (2.5 + 2)) + 7.5 · 2 - 3.5 = ?",
      "answer": "Yechimi: 3 · (6 - 4.5) + 15 - 3.5 = 3 · 1.5 + 11.5 = 4.5 + 11.5 = 16.",
      "category": "Matematika",
      "difficulty": "easy",
      "tags": "matematika,hisob"
    },
    {
      "question": "Ko‘chmas mulk obyektlariga bo‘lgan huquqlar davlat ro‘yxatidan o‘tkazilmasdan amalga oshirilgan ko‘chmas mulk bilan bog‘liq bitimlar haqiqiy hisoblanadimi?",
      "answer": "Yo‘q, haqiqiy hisoblanmaydi (bunday bitimlar yuridik kuchga ega emas va haqiqiy emas deb topiladi).",
      "category": "Qonunchilik",
      "difficulty": "medium",
      "tags": "bitimlar,huquqlar,davlat ro'yxati"
    },
    {
      "question": "Vaqtinchalik imorat nima?",
      "answer": "Poydevorga ega bo‘lmagan, yer bilan mustahkam bog‘lanmagan, konstruktsiyasi qismlarga ajraladigan va boshqa joyga ko‘chirilganda o‘zining xo‘jalik-funksional vazifasini yo‘qotmaydigan, muayyan muddatga qurilgan imorat (masalan: yengil kiosk, pavilyon, naves).",
      "category": "Bino va inshootlar",
      "difficulty": "easy",
      "tags": "imorat,vaqtinchalik"
    },
    {
      "question": "Servitut nima?",
      "answer": "O‘zganing yer uchastkasidan cheklangan tarzda foydalanish huquqi.",
      "category": "Yer munosabatlari",
      "difficulty": "easy",
      "tags": "servitut,yer uchastkasi"
    },
    {
      "question": "Kadastr yig‘majinildini shakllantirish natijalari bo‘yicha buyurtmachiga qanday hujjat beriladi?",
      "answer": "Kadastr pasporti taqdim etiladi.",
      "category": "Kadastr pasporti",
      "difficulty": "easy",
      "tags": "yig'majinild,kadastr pasporti"
    },
    {
      "question": "Yer uchastkalariga bo‘lgan mulk huquqini qaysi hujjatlarga asosan davlat ro‘yxatidan o‘tkaziladi?",
      "answer": "Davlat orderlari, auksion bayonnomalari, sud qarorlari va qonunchilikda belgilangan yer uchastkasiga bo‘lgan huquqni vujudga keltiruvchi boshqa huquq belgilovchi hujjatlar asosan.",
      "category": "Yer munosabatlari",
      "difficulty": "medium",
      "tags": "mulk huquqi,davlat ro'yxati"
    },
    {
      "question": "Yer fondidagi qishloq xo‘jaligi yerlarini boshqa toifaga o‘tkazish qaysi davlat organining vakolatlariga kiradi?",
      "answer": "O‘zbekiston Respublikasi Vazirlar Mahkamasi vakolatiga kiradi (ayrim hollarda Prezident qarorlari bilan).",
      "category": "Qonunchilik",
      "difficulty": "medium",
      "tags": "yer fondi,qishloq xo'jaligi,vazirlar mahkamasi"
    },
    {
      "question": "Davlat ro‘yxatidan o‘tkazuvchi organda yer uchastkasining mansubligi masalasida nizolar borligi haqida guvohlik beruvchi hujjatlarning mavjud bo‘lganda yer uchastkasiga bo‘lgan huquq davlat ro‘yxatidan o‘tkaziladimi?",
      "answer": "Yo‘q, nizo mavjudligi haqida rasmiy hujjatlar (masalan, sud instansiyalaridan da’vo arizasi qabul qilinganligi to‘g‘risida ma’lumot) bo‘lsa, ro‘yxatdan o‘tkazish rad etiladi yoki to‘xtatilishi mumkin.",
      "category": "Qonunchilik",
      "difficulty": "hard",
      "tags": "davlat ro'yxati,nizolar,rad etish"
    },
    {
      "question": "Bino yoki inshootning mansubligi masalasida nizolar borligi haqida guvohlik beruvchi hujjatlar mavjud bo‘lganda unga bo‘lgan huquq davlat ro‘yxatidan o‘tkaziladimi?",
      "answer": "Yo‘q, davlat ro‘yxatidan o‘tkazish rad etiladi.",
      "category": "Qonunchilik",
      "difficulty": "medium",
      "tags": "bino,inshoot,nizolar,rad etish"
    },
    {
      "question": "Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazilganda qanday hujjat beriladi?",
      "answer": "Davlat reestridan ko‘chirma (elektron shaklda QR-kodli ko‘chirma) beriladi.",
      "category": "Qonunchilik",
      "difficulty": "easy",
      "tags": "reestr,ko'chirma,qr-kod"
    },
    {
      "question": "Ko‘chmas mulkka bo‘lgan huquq to‘liqligicha o‘zga shaxsga o‘tgan taqdirda kadastr raqami o‘zgaradimi?",
      "answer": "Yo‘q, o‘zgarmaydi. Kadastr raqami obyektning o‘zi tugatilgunga qadar o‘zgarmas qoladi.",
      "category": "Kadastr tizimi",
      "difficulty": "easy",
      "tags": "kadastr raqami,mulkdor"
    },
    {
      "question": "Qurilishi tugallanmagan bino joylashgan yer uchastkasiga kadastr raqami beriladimi?",
      "answer": "Ha, beriladi (chunki yer uchastkasining o‘zi alohida ko‘chmas mulk obyekti hisoblanadi).",
      "category": "Bino va inshootlar",
      "difficulty": "easy",
      "tags": "qurilish,yer uchastkasi,kadastr raqami"
    },
    {
      "question": "Kadastr raqamini belgilashda raqamlar orasiga qanday belgi qo‘yiladi?",
      "answer": "Ikki nuqta ` : ` belgisi qo‘yiladi.",
      "category": "Kadastr tizimi",
      "difficulty": "easy",
      "tags": "kadastr raqami,belgi"
    },
    {
      "question": "Ko‘chmas mulk obyektlarining qanday turlari bor?",
      "answer": "Yer uchastkalari, binolar, inshootlar (shu jumladan qurilishi tugallanmagan obyektlar) va ko‘p yillik dov-daraxtlar.",
      "category": "Yer munosabatlari",
      "difficulty": "easy",
      "tags": "turlar,ko'chmas mulk"
    },
    {
      "question": "Yer uchastkasining kadastr raqami nechta raqamdan iborat?",
      "answer": "Kadastr raqami tarkibiy qismlardan iborat bo‘lik (viloyat, tuman, zona, massiv, uchastka kodi), jami 17 ta raqamli raqamlar kombinatsiyasidan iborat (Format: XX:XX:XX:XX:XX:XXXX).",
      "category": "Kadastr tizimi",
      "difficulty": "medium",
      "tags": "kadastr raqami,format"
    },
    {
      "question": "Zaxiradagi yerlar Yer fondi toifasiga kiradimi?",
      "answer": "Ha, kiradi. Zaxiradagi yerlar O‘zbekiston Respublikasi Yer fondining alohida 8-toifasi hisoblanadi.",
      "category": "Yer munosabatlari",
      "difficulty": "easy",
      "tags": "zaxira yerlar,yer fondi"
    },
    {
      "question": "Yer uchastkasining chegaralarini o‘zgartirishga kadastr xodimini vakolati bormi?",
      "answer": "Yo‘q. Kadastr xodimi faqat chegaralarni amaldagi huquqiy hujjatlar va o‘lchovlar asosida rasmga oladi/belgilaydi. Chegaralarni o‘zgartirish vakolatli mahalliy davlat organlari qarorlari yoki sud qarori asosida bo‘ladi.",
      "category": "Yer munosabatlari",
      "difficulty": "medium",
      "tags": "chegaralar,vakolat,kadastr xodimi"
    },
    {
      "question": "Ko‘chmas mulk obyekti bir qancha qismlarga bo‘lingan holda sotilganda kadastr hujjatlari qanday shakllantiriladi?",
      "answer": "Har bir ajratilgan yangi qism uchun alohida mustaqil kadastr yig‘majildi shakllantiriladi va ularga yangi alohida kadastr raqamlari beriladi, eski kadastr raqami esa arxivlanadi.",
      "category": "Kadastr pasporti",
      "difficulty": "medium",
      "tags": "bo'lish,sotish,kadastr raqami"
    },
    {
      "question": "Ko‘chmas mulk obyektlariga kadastr raqamini berish kim tomonidan amalga oshiriladi?",
      "answer": "O‘zbekiston Respublikasi Davlat soliq qo‘mitasi huzuridagi Kadastr agentligining Davlat kadastrlari palatasi va uning hududiy filiallari tomonidan.",
      "category": "Kadastr tizimi",
      "difficulty": "easy",
      "tags": "kadastr raqami,kadastr palatasi"
    },
    {
      "question": "Qurilishi tugallangandan keyin yoki tugallanmagan turar joy binosi davlat ro‘yxatidan o‘tkaziladimi?",
      "answer": "Ha, qurilishi tugallanmagan turar joy binosi ham tegishli huquq belgilovchi hujjatlar mavjud bo‘lganda qurilishi tugallanmagan obyekt sifatida davlat ro‘yxatidan o‘tkaziladi.",
      "category": "Bino va inshootlar",
      "difficulty": "easy",
      "tags": "qurilish,turar joy,davlat ro'yxati"
    },
    {
      "question": "Qurilishi tugallangandan so‘ng bino va inshootga bo‘lgan huquq qaysi hujjatga asosan davlat ro‘yxatidan o‘tkaziladi?",
      "answer": "Qurilish-arxitektura organlari tomonidan berilgan Obyektni foydalanishga qabul qilish to‘g‘risidagi dalolatnoma (ruxsatnoma) yoki vakolatli organning hujjati asosan.",
      "category": "Qonunchilik",
      "difficulty": "medium",
      "tags": "qurilish,dalolatnoma,davlat ro'yxati"
    },
    {
      "question": "Kapital bino va inshoot nima?",
      "answer": "Poydevorga ega bo‘lgan, yer bilan mustahkam bog‘langan, konstruktiv qismlarini buzmasdan va ularga jiddiy zarar yetkazmasdan ko‘chirish imkoni bo‘lmagan, uzoq muddat foydalanishga mo‘ljallangan bino va inshootlar.",
      "category": "Bino va inshootlar",
      "difficulty": "easy",
      "tags": "kapital bino,poydevor"
    },
    {
      "question": "Yengil turdagi qurilmalar nima?",
      "answer": "Poydevorga ega bo‘lmagan, metall, yog‘och yoki plastik kabi yengil konstruksiyalardan yasalgan, oson qismlarga ajratiladigan va ko‘chiriladigan qurilmalar (naves, yengil kiosklar).",
      "category": "Bino va inshootlar",
      "difficulty": "easy",
      "tags": "yengil qurilma,naves"
    },
    {
      "question": "O‘zboshimchalik bilan qurilgan imorat nima?",
      "answer": "Qonunchilikda belgilangan tartibda qurilish maqsadlari uchun ajratilmagan yer uchastkasida, shuningdek, zarur ruxsatnomalar olinmasdan yoki shaharsozlik normalari va qoidalarini jiddiy buzgan holda qurilgan bino va inshootlar.",
      "category": "Qonunchilik",
      "difficulty": "medium",
      "tags": "o'zboshimchalik,imorat,qurilish"
    },
    {
      "question": "Abris nima?",
      "answer": "Joyning (yer uchastkasi, bino, xonalarning) ko‘z bilan chamalab, o‘lchov natijalari va zaruriy izohlari ko‘rsatilgan holda chizilgan qo‘lbola chizmasi (shartli grafik tasviri).",
      "category": "Kadastr tizimi",
      "difficulty": "medium",
      "tags": "abris,chizma,o'lchov"
    },
    {
      "question": "Inshoot nima?",
      "answer": "Odamlarning yashashi uchun mo‘ljallanmagan, ishlab chiqarish yoki boshqa texnikaviy, ijtimoiy-xo‘jalik ehtiyojlarini qondirish uchun qurilgan muhandislik-qurilish obyekti (masalan: ko‘prik, yo‘l, truboprovod, devor, minora).",
      "category": "Bino va inshootlar",
      "difficulty": "easy",
      "tags": "inshoot,muhandislik"
    },
    {
      "question": "Ko‘p yillik daraxtlar nima?",
      "answer": "Sun’iy ravishda ekilgan va yetishtirilayotgan, qishloq xo‘jaligi yoki rekreatsiya, himoya maqsadlariga ega bo‘lgan ko‘p yillik dov-daraxtlar (mevali bog‘lar, tokzorlar, ihota daraxtzorlari). Ular ko‘chmas mulk obyekti tarkibiga kiradi.",
      "category": "Yer munosabatlari",
      "difficulty": "easy",
      "tags": "daraxtlar,dov-daraxtlar"
    },
    {
      "question": "Malaka imtihonini topshirish uchun talabgorlar qanday talablarga javob berishi lozim?",
      "answer": "Oliy yoki o‘rta maxsus ma’lumotga ega bo‘lishi, tegishli soha yo‘nalishlari bo‘yicha diplomga va qonun hujjatlarida belgilangan minimal ish stajiga ega bo‘lishi lozim.",
      "category": "Imtihon",
      "difficulty": "medium",
      "tags": "malaka imtihoni,talabgor"
    },
    {
      "question": "Malaka imtihonini topshirish uchun talabgor: Geodeziya, bino va inshootlar qurilishi, qurilish ekspertizasi, ko‘chmas mulk ekspertizasi, arxitektura, yer tuzish va yer kadastri yo‘nalishlari bo‘yicha nechchi yil ish stajiga ega bo‘lishi lozim?",
      "answer": "Kamida 1 (bir) yil ish stajiga ega bo‘lishi lozim (VM 535-son qaror reglamentiga binoan).",
      "category": "Imtihon",
      "difficulty": "easy",
      "tags": "ish staji,reglament"
    },
    {
      "question": "O‘zbekiston Respublikasida davlat xizmatlarini ko‘rsatish sayti qanday nomlanadi?",
      "answer": "Yagona interaktiv davlat xizmatlari portali — my.gov.uz.",
      "category": "Davlat xizmatlari",
      "difficulty": "easy",
      "tags": "portal,my.gov.uz"
    },
    {
      "question": "Internet orqali davlat xizmatlarini ko‘rsatish qanday nomlanadi?",
      "answer": "Elektron davlat xizmatlari.",
      "category": "Davlat xizmatlari",
      "difficulty": "easy",
      "tags": "internet,elektron xizmat"
    },
    {
      "question": "Kadastr raqamidagi qaysi raqamlar yer uchastkasini bildiradi (qavsga olinganlardan) 10:05:06:07:08:1234 ?",
      "answer": "Oxirgi oltinchi blokdagi raqamlar, ya’ni 1234 yer uchastkasining tartib raqamini bildiradi.",
      "category": "Kadastr tizimi",
      "difficulty": "medium",
      "tags": "kadastr raqami,yer uchastkasi"
    },
    {
      "question": "Kadastr raqamidagi qaysi raqamlar uchastka joyslamgan massivni bildiradi (qavsga olinganlardan) 10:05:06:07:08:1234 ?",
      "answer": "To‘rtinchi blokdagi raqamlar, ya’ni 07 massiv kodi/raqamini bildiradi.",
      "category": "Kadastr tizimi",
      "difficulty": "medium",
      "tags": "kadastr raqami,massiv"
    },
    {
      "question": "Kadastr raqamidagi qaysi raqamlar yer uchastkasi joylashgan mavzeni bildiradi (qavsga olinganlardan) 10:05:06:07:08:1234 ?",
      "answer": "Uchinchi yoki to‘rtinchi darajali bloklar (hududiy bo‘linishga ko‘ra), berilgan namunada zona ichidagi sektor/mavze kodi 06 yoki 07 hisoblanadi.",
      "category": "Kadastr tizimi",
      "difficulty": "hard",
      "tags": "kadastr raqami,mavze"
    },
    {
      "question": "Ko‘p kvartirali uy umumiy joylarining mulkchilik turi?",
      "answer": "Umumiy ulushli mulkchilik (ko‘p kvartirali uydagi joylar mulkdorlarining umumiy mulki).",
      "category": "Uy-joy va Kvartiralar",
      "difficulty": "easy",
      "tags": "ko'p kvartirali,mulkchilik"
    },
    {
      "question": "Yashash maydoniga qaysi maydonlar kiradi?",
      "answer": "Turar joy binosi yoki xonadon ichidagi bevosita yashash (uxlash, dam olish, mehmonxona) xonalarining maydonlari yashash maydoniga kiradi (oshxona, koridor, vannaxona bular yordamchi maydondir).",
      "category": "Uy-joy va Kvartiralar",
      "difficulty": "easy",
      "tags": "yashash maydoni,xonadon"
    },
    {
      "question": "Tambur nima?",
      "answer": "Binoga kirish qismida tashqi eshik bilan ichki eshik oralig‘idagi issiqlikni saqlash, shamol va sovuqni to‘sishga mo‘ljallangan kichik o‘tish xonasi (shlyuz).",
      "category": "Bino va inshootlar",
      "difficulty": "easy",
      "tags": "tambur,bino"
    },
    {
      "question": "Yer bilan mustahkam bog‘langan inshoot nima?",
      "answer": "Kapital turdagi bino yoki inshoot (ko‘chmas mulk).",
      "category": "Bino va inshootlar",
      "difficulty": "easy",
      "tags": "inshoot,kapital"
    },
    {
      "question": "Qurilishi tugallanmagan obyektlar ko‘chmas mulk hisoblanadimi?",
      "answer": "Ha, qonunchilikka ko‘ra qurilishi tugallanmagan binolar ham ko‘chmas mulk obyektlari tarkibiga kiradi.",
      "category": "Bino va inshootlar",
      "difficulty": "easy",
      "tags": "qurilish,ko'chmas mulk"
    },
    {
      "question": "Ko‘chmas mulkka bo‘lgan huquqni davlat ro‘yxatidan o‘tkazishda qaysi ma’lumot e’tiborga olinadi?",
      "answer": "Huquq belgilovchi hujjatlardagi ma’lumotlar, obyektning kadastr ma’lumotlari va arizachining shaxsini tasdiqlovchi ma’lumotlar e’tiborga olinadi.",
      "category": "Qonunchilik",
      "difficulty": "medium",
      "tags": "davlat ro'yxati,huquq"
    },
    {
      "question": "Yer fondi nechta toifaga bo‘linadi?",
      "answer": "8 ta toifaga bo‘linadi (O‘zbekiston Respublikasi Yer kodeksining 8-moddasiga ko‘ra).",
      "category": "Yer munosabatlari",
      "difficulty": "easy",
      "tags": "yer fondi,toifa,yer kodeksi"
    },
    {
      "question": "Yer xususidagi nizolar qanday hal qilinadi?",
      "answer": "Yer xususidagi nizolar sud tartibida hal qilinadi.",
      "category": "Qonunchilik",
      "difficulty": "easy",
      "tags": "yer,nizolar,sud"
    },
    {
      "question": "Sug‘oriladigan yerlar nima?",
      "answer": "Sug‘orish manbalari bilan bog‘langan va doimiy yoki muvaqqat sug‘orish tarmog‘iga ega bo‘lgan, qishloq xo‘jaligi ekinlari yetishtirish uchun yaroqli bo‘lgan va muntazam sug‘oriladigan yerlar.",
      "category": "Yer munosabatlari",
      "difficulty": "easy",
      "tags": "sug'oriladigan yer"
    },
    {
      "question": "Qanday yerlar rekreatsiya maqsadlariga mo‘ljallangan yerlar tarkibiga kiradi?",
      "answer": "Aholining ommaviy dam olishi, turizm, jismoniy tarbiya va sport bilan shug‘ullanishi uchun mo‘ljallangan yerlar (dam olish uylari, pansionatlar, sanatoriylar, parklar, madaniyat va istirohat bog‘lari joylashgan yerlar).",
      "category": "Yer munosabatlari",
      "difficulty": "medium",
      "tags": "rekreatsiya,dam olish"
    },
    {
      "question": "Qishloq xo‘jaligi yerlari guruhini sanab bering?",
      "answer": "Haydaladigan yerlar (bosh reja asosida), ko‘p yillik dov-daraxtlar (bog‘, tokzorlar), bo‘z yerlar, pichanzorlar va yaylovlar.",
      "category": "Yer munosabatlari",
      "difficulty": "easy",
      "tags": "qishloq xo'jaligi,yer guruhlari"
    },
    {
      "question": "O‘zbekiston Respublikasi qonunchilik to‘plamlarining rasmiy veb-saytini toping.",
      "answer": "O‘zbekiston Respublikasi Qonunchilik ma’lumotlari milliy bazasi — lex.uz.",
      "category": "Davlat xizmatlari",
      "difficulty": "easy",
      "tags": "lex.uz,rasmiy sayt"
    },
    {
      "question": "Yer to‘la bino qavatlar soniga qo‘shiladimi?",
      "answer": "Agar yerto‘laning shift qismi yer sathidan 2 metrdan ortiq yuqorida bo‘lsa, u qavatlar soniga qo‘shiladi, agar yer sathidan pastda bo‘lib texnik maqsadlarda bo‘lsa, binoning yer usti qavatlari soniga qo‘shilmaydi (lekin umumiy qavatlar sonida ko‘rsatiladi).",
      "category": "Bino va inshootlar",
      "difficulty": "medium",
      "tags": "yerto'la,qavatlar"
    },
    {
      "question": "Mansarda nima?",
      "answer": "Bino chordog‘ida (paddasidagida) joylashgan, fasadi to‘liq yoki qisman qiya tom yuzalaridan iborat bo‘lgan yashash yoki xizmat xonasi (chodirqavat).",
      "category": "Bino va inshootlar",
      "difficulty": "easy",
      "tags": "mansarda,tom,chordoq"
    },
    {
      "question": "Veranda nima?",
      "answer": "Binoga taqab qurilgan, tomi yopilgan, devorlari oynavand qilingan (shisha bilan o‘ralgan) yoki ochiq bo‘lgan sirlanmagan yordamchi xona.",
      "category": "Bino va inshootlar",
      "difficulty": "easy",
      "tags": "veranda,bino,xona"
    }
  ],
  {
    "question": "Terrasa nima?",
    "answer": "Binoga tutashgan yoki alohida joylashgan, usti ochiq yoki soyabonli, pol to‘shamasiga ega bo‘lgan maxsus maydoncha (terrasa odatda to‘silmagan yoki panjara bilan to‘silgan ochiq joy bo‘ladi).",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Turar-joy ko‘chmas mulk obyekti hisoblanadimi?",
    "answer": "Ha, hisoblanadi.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Turar-joyni yoki uning qismini noturar joy maqomiga o‘tkazish mumkinmi?",
    "answer": "Ha, qonunchilikda belgilangan tartibda hokimlik yoki vakolatli arxitektura organlarining ruxsati bilan o‘tkazish mumkin.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Noturar-joyni yoki uning qismini turar joy maqomiga o‘tkazish mumkinmi?",
    "answer": "Ha, belgilangan shaharsozlik va sanitariya normalariga javob bergan taqdirda, ruxsatnoma asosida o‘tkazish mumkin.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Balkon nima?",
    "answer": "Binoning tashqi devori sirtidan bo‘rtib chiqqan, to‘silgan ochiq maydoncha.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Kvartiraning umumiy maydoni nima?",
    "answer": "Kvartiradagi barcha xonalarning (yashash xonalari va yordamchi xonalar – oshxona, koridor, vanna, ichki dahliz va h.k.) maydonlari yig‘indisi. (Amaldagi shaharsozlik normalariga ko‘ra balkonlar ma’lum bir pasaytiruvchi koeffitsient bilan kiritiladi yoki kiritilmaydi).",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Chordoq nima?",
    "answer": "Binoning yuqori qavati shifti, tashqi devorlari va tom yopgichi oralig‘idagi yashash uchun mo‘ljallanmagan joy/bo‘shliq.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Turar joy binosidagi mansarda nima?",
    "answer": "Tom konstruksiyasi ichida qurilgan va yashash uchun moslashtirilgan qavat (chodirqavat).",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Yerto‘la nima?",
    "answer": "Pol sathining balandligi yer sathidan binoning balandligi yarmidan ko‘proq chuqurlikda joylashgan bino qavati.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Texnik qavat nima?",
    "answer": "Muhandislik jihozlarini joylashtirish va kommunikatsiya tarmoqlarini (suv, isitish, elektr) o‘tkazish uchun mo‘ljallangan maxsus qavat (u yerto‘lada, qavatlar orasida yoki binoning eng yuqori qismida bo‘shuvi mumkin).",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Vaqtinchalik imorat nima?",
    "answer": "Poydevorsiz, mavsumiy yoki ma’lum muddatga mo‘ljallangan, oson buziladigan va ko‘chiriladigan yengil inshoot.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Tashqi devor qiya bo‘lgan taqdirda, maydon qayerdan hisoblanadi?",
    "answer": "Pol sathidan ma’lum balandlikda (masalan, mansardalarda pol sathidan 1.2 - 1.5 m balandlikdagi qiyalik nuqtasidan boshlab) yoki devorning pol bilan tutashgan ichki yuzasidan shaharsozlik normalariga muvofiq hisoblanadi.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Xona maydonini hisoblashda plintus hisobga olinadimi?",
    "answer": "Yo‘q, xona maydoni plintuslar hisobga olinmagan holda, devorlarning suvalgan va pardozlangan yuzalari orasidagi masofa bo‘yicha hisoblanadi.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Kvartiralarning umumiy maydoniga balkonlar maydoni kiradimi?",
    "answer": "O‘zbekiston Respublikasi shaharsozlik normalariga ko‘ra, kadastr pasportida xonadonning umumiy maydoniga balkonlar, lodjiyalar va terrasalar maydoni tegishli pasaytiruvchi koeffitsiyentlar (masalan, balkon uchun 0.3) bilan qo‘shib hisoblanadi.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Asosiy binolarning kirish qismidagi zinalar rejaga kiritiladimi?",
    "answer": "Ha, kirish zinalari va maydonchalari binoning tashqi chizmasi hamda topografik/kadastr rejasida aks ettiriladi.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Texnik yerto‘la bino maydoniga qo‘shiladimi?",
    "answer": "Texnik yerto‘la (balandligi 1.8 metrdan kam bo‘lsa) binoning umumiy foydali maydoniga qo‘shilmaydi, lekin binoning texnik tavsifida alohida ko‘rsatiladi.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Yer to‘la binoning qurilish hajmiga kiritiladimi?",
    "answer": "Ha, yerto‘laning hajmi binoning umumiy qurilish hajmiga (M³ da) kiritiladi.",
    "category": "Bino va inshootlar",
    "difficulty": "hard",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Balkon binoning qurilish hajmiga kiritiladimi?",
    "answer": "Ochiq balkonlar binoning umumiy yopiq qurilish hajmiga (M³) kiritilmaydi (lodjiyalar va yopiq verandalar kiritilishi mumkin).",
    "category": "Bino va inshootlar",
    "difficulty": "hard",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Bino ostidan o‘tish joylari maydoni qurilish maydoniga kiradimi?",
    "answer": "Ha, bino ostidagi o‘tish joylari (arkalar) binoning umumiy qurilish osti maydoniga (konturiga) kiradi.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Davlat kadastrlari yagona tizimini nechta davlat kadastrlari tashkil etadi?",
    "answer": "O‘zbekiston Respublikasida Davlat kadastrlari yagona tizimini (DKYT) jami 21 ta davlat kadastri tashkil etadi.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Bino nima?",
    "answer": "Odamlar yashashi, ular tomonidan turli ishlab chiqarish jarayonlarini bajarish, aholiga xizmat ko‘rsatish, moddiy qimmatliklarni saqlash uchun mo‘ljallangan, fundamental asosga (poydevorga) ega bo‘lgan yer usti qurilishi.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Kadastr yig‘majildi nima?",
    "answer": "Ko‘chmas mulk obyektining geografik joylashuvu, huquqiy holati, miqdoriy va sifat tavsiflari hamda baholangan qiymati to‘g‘risidagi kadastr xaritasi, rejalari, chizmalari va matnli hujjatlar to‘plami.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "yig'majildi,kadastr raqami,tizim"
  },
  {
    "question": "Kadastr pasporti nima?",
    "answer": "Ko‘chmas mulk obyektining texnik, kadastr va boshqa ma’lumotlarini o‘z ichiga olgan, elektron yoki qog‘oz shaklida beriladigan rasmiy hujjat.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Ko‘chmas mulk nima?",
    "answer": "Er uchastkalari va yer bilan uzviy bog‘langan, ko‘chirilishi ularning maqsadiga nomutanosib zarar yetkazmagan holda ko‘chirilishi mumkin bo‘lmagan hamma narsa, shu jumladan binolar, inshootlar va ko‘p yillik daraxtlar.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Qurilishi tugallanmagan bino bu-.........",
    "answer": "Qurilishi boshlangan, lekin poydevori yoki asosiy konstruktiv qismlari tiklangan holda qurilish ishlari hali yakunlanmagan va foydalanishga qabul qilinmagan obyekt.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Kadastr yig‘majildi kim tomonidan tayyorlanadi?",
    "answer": "Davlat kadastrlari palatasining hududiy filiallari yoki kadastr muhandislari (shatodatnomaga ega bo‘lgan mutaxassislar) tomonidan tayyorlanadi.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "yig'majildi,kadastr raqami,tizim"
  },
  {
    "question": "Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish ko‘p kvartirali uydagi kvartiralar uchun qanday muddatda amalga oshiriladi?",
    "answer": "3 ish kuni ichida.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish yakka tartibdagi turar joy uchun qanday muddatda amalga oshiriladi?",
    "answer": "5 ish kuni ichida.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish umumiy maydoni 100 kv. metrgacha bo‘lgan noturar joy uchun qanday muddatda amalga oshiriladi?",
    "answer": "5 ish kuni ichida.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish umumiy maydoni 100 kv. metrdan 1 000 kv. metrgacha bo‘lgan noturar joy uchun qanday muddatda amalga oshiriladi?",
    "answer": "7 ish kuni ichida.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish umumiy maydoni 1 000 kv. metrdan 5 000 kv. metrgacha bo‘lgan noturar joy uchun qanday muddatda amalga oshiriladi?",
    "answer": "10 ish kuni ichida.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish umumiy maydoni 5 000 kv. metrdan 15 000 kv. metrgacha bo‘lgan noturar joy uchun qanday muddatda amalga oshiriladi?",
    "answer": "15 ish kuni ichida.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish umumiy maydoni 15 000 kv. metrdan 50 000 kv. metrgacha bo‘lgan noturar joy uchun qanday muddatda amalga oshiriladi?",
    "answer": "20 ish kuni ichida.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish umumiy maydoni 50 000 kv. metrdan ortiq bo‘lgan noturar joy uchun qanday muddatda amalga oshiriladi?",
    "answer": "25 ish kuni ichida.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish ajratilgan yer uchastkalari bo‘yicha qanday muddatda amalga oshiriladi?",
    "answer": "3 ish kuni ichida.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Yer uchastkasining kadastr yig‘majildini tayyorlashda qanday ishlar bajariladi?",
    "answer": "Er uchastkasining chegaralarini joyida o‘rganish va geodezik o‘lchash, elektron xarita va rejalarni tuzish, huquq belgilovchi hujjatlarni tahlil qilish, ma’lumotlarni tizimga kiritish.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Yer uchastkasining elektron raqamli kadastr rejasi qanday tuziladi?",
    "answer": "GIS (Geografik axborot tizimi) dasturlarida, maxsus geodezik o‘lchov asboblari (GPS, Taxeometr) yordamida olingan koordinatalar asosida elektron raqamli shaklda tuziladi.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Yer uchastkasining kadastr rejasida nimalar aks ettiriladi?",
    "answer": "Er uchastkasining chegaralari, burilish nuqtalarining koordinatalari, maydoni, undagi bino va inshootlarning konturlari, qo‘shni yer egalarining chegaradosh chiziqlari.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Aholi punktlaridagi yer uchastkasining kadastr rejasi qanday masshtabda tuziladi?",
    "answer": "Odatda 1:500 yoki 1:1000 masshtabda tuziladi.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Ko‘chmas mulk obyektini hisobga olishda yer uchastkasi bo‘yicha qanday ma’lumotlar aks ettiriladi?",
    "answer": "Kadastr raqami, joylashgan manzili, yer toifasi, yer turi, ajratilgan va amaldagi maydoni, huquq turi hamda unga bo‘lgan cheklovlar (servitut va taqiqlar).",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "O‘zbekiston Respublikasining “Davlat kadastrlari to‘g‘risida”gi Qonuni qachon qabul qilingan?",
    "answer": "2000-yil 15-dekabrda qabul qilingan (O‘RQ-171-II-son).",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Vazirlar Mahkamasining “Davlat kadastrlarini yuritish sohasini tartibga soluvchi ayrim normativ-huquqiy hujjatlarni tasdiqlash to‘g‘risida”gi qarori qachon qabul qilingan?",
    "answer": "2021-yil 22-iyunda qabul qilingan (389-sonli qaror).",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Axborot xavfsizligida himoyaning asosiy elementlari?",
    "answer": "Maxfiylik (Confidentiality), yaxlitlik (Integrity) va foydalanish imkoniyati/ ochiqlik (Availability) — (CIA triada).",
    "category": "Axborot xavfsizligi",
    "difficulty": "medium",
    "tags": "xavfsizlik,kiberxavfsizlik,vpn"
  },
  {
    "question": "Umumiy maydoni 5 gektardan 10 gektargacha bo‘lgan ko‘p yillik dov-daraxtlar joylashgan yer uchastkasi uchun kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasporti tayyorlash vaqti qancha?",
    "answer": "15 ish kuni ichida.",
    "category": "Yer munosabatlari",
    "difficulty": "hard",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "O‘zbekiston Respublikasi Yer fondining toifalari to‘g‘ri ko‘rsatilgan qatorni belgilang?",
    "answer": "1) Qishloq xo‘jaligiga mo‘ljallangan yerlar; 2) Aholi punktlarining yerlari; 3) Sanoat, transport, aloqa, mudofaa va boshqa maqsadlarga mo‘ljallangan yerlar; 4) Tabiatni muhofaza qilish, sog‘lomlashtirish, rekreatsiya va tarixiy-madaniy maqsadlarga mo‘ljallangan yerlar; 5) O‘rmon fondi yerlari; 6) Suv fondi yerlari; 7) Zaxira yerlar.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Davlat yer kadastrini yuritish tartibi to‘g‘risidagi nizom tasdiqlangandan keyin Vazirlar mahkamasining qaysi qarori o‘z kuchini yo‘qotgan?",
    "answer": "Vazirlar Mahkamasining 1998-yil 31-dekabrdagi \"O‘zbekiston Respublikasida davlat yer kadastrini yuritish tartibi to‘g‘risidagi nizomni tasdiqlash haqida\"gi 554-sonli qarori.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "O‘zbekiston Respublikasining “Kiberxavfsizlik to‘g‘risida”gi qonuni qachon qabul qilingan?",
    "answer": "2022-yil 15-aprelda qabul qilingan (O‘RQ-764-son).",
    "category": "Axborot xavfsizligi",
    "difficulty": "medium",
    "tags": "xavfsizlik,kiberxavfsizlik,vpn"
  },
  {
    "question": "Vazirlar Mahkamasining “Davlat kadastrlarini yuritish sohasini tartibga soluvchi ayrim normativ-huquqiy hujjatlarni tasdiqlash to‘g‘risida” gi qarorining 2-ILOVA sida qaysi nizom tasdiqlangan?",
    "answer": "\"Binolar va inshootlar davlat kadastrni yuritish tartibi to‘g‘risidagi nizom\" tasdiqlangan.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Vazirlar Mahkamasining “Kadastr sohasida ayrim davlat xizmatlari ko‘rsatishning ma’muriy reglamentlarini tasdiqlash to‘g‘risida” qarori qachon qabul qilingan?",
    "answer": "2020-yil 2-sentabrda qabul qilingan (535-sonli qaror).",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Vazirlar Mahkamasining 535-sonli qaroriga 2-ILOVA?",
    "answer": "\"Ko‘chmas mulk bo‘yicha kadastr muhandisining malaka shahodatnomasini berish bo‘yicha davlat xizmatlarini ko‘rsatishning ma’muriy reglamenti\".",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Vazirlar Mahkamasining 535-sonli qarorida “Ko‘chmas mulk bo‘yicha kadastr muhandisining malaka shahodatnomasini berish bo‘yicha davlat xizmatlarini ko‘rsatishning ma’muriy reglamenti” qaysi ilovada tasdiqlangan?",
    "answer": "2-ilovada tasdiqlangan.",
    "category": "Imtihon",
    "difficulty": "easy",
    "tags": "imtihon,savollar,vaqt"
  },
  {
    "question": "Kadastr pasportining shakllari Vazirlar Mahkamasining qaysi qarori bilan tasdiqlangan?",
    "answer": "Vazirlar Mahkamasining 2020-yil 2-sentabrda qabul qilingan 535-sonli qarori bilan.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Vazirlar Mahkamasining 2020-yil 2-sentabrdagi 535-son qaroriga muvofiq malaka imtihonida nechta savol va qancha vaqt beriladi?",
    "answer": "50 ta savol va 45 daqiqa vaqt beriladi.",
    "category": "Imtihon",
    "difficulty": "easy",
    "tags": "imtihon,savollar,vaqt"
  },
  {
    "question": "Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish to‘g‘risidagi O‘RQ-803-sonli qonun ko‘chmas mulkning qaysi turlariga bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazishga nisbatan tatbiq etilmaydi?",
    "answer": "Yer osti boyliklari, havo va dengiz kemalari, ichki suzish obyekti hamda kosmik obyektlarga nisbatan (ular alohida reestrlarda ro‘yxatga olinadi).",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "“Ko‘chmas mulk obyektiga kadastr yig‘majildini tayyorlash tartibi to‘g‘risidagi nizom” Vazirlar Mahkamasining 389-sonli qarorining nechanchi ilovasi bo‘lib kelgan?",
    "answer": "3-lovasi bo‘lib kelgan.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Davlat kadastrlari yuritishning asosiy prinsiplari nechta?",
    "answer": "5 ta asosiy prinsip vaqtinchalik mavjud (ishonchlilik, qonuniylik, yagonalik, ochiqlik va uzluksizlik).",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "O‘zbekiston Respublikasining Davlat yer kadastri to‘g‘risida Qonuni qachon qabul qilingan?",
    "answer": "1998-yil 28-avgustda qabul qilingan (666-I-son).",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "“Noturar ko‘chmas mulkni boshqa shaxsga o‘tkazishga oid shartnomalarni rasmiylashtirish va unga bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish bo‘yicha kompozit davlat xizmatini ko‘rsatishning ma’muriy reglamentini tasdiqlash to‘g‘risida”gi Vazirlar Mahkamasining qarori qachon qabul qilingan?",
    "answer": "2023-yil 12-oktabrda qabul qilingan (536-sonli qaror).",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Axborot xavfsizligi - ...?",
    "answer": "Axborot va uni qo‘llab-quvvatlovchi infratuzilmalarni ruxsatsiz foydalanish, oshkor qilish, buzish, o‘zgartirish yoki yo‘q qilishdan himoya qilish holatidir.",
    "category": "Axborot xavfsizligi",
    "difficulty": "medium",
    "tags": "xavfsizlik,kiberxavfsizlik,vpn"
  },
  {
    "question": "Kompyuter tizimidagi axborot xavfsizligi tahdidlarini ko‘rsating?",
    "answer": "Viruslar va zararli dasturlar (malware), fishing (phishing), DDoS hujumlar, ruxsatsiz kirish va ma’lumotlarning sizib chiqishi.",
    "category": "Axborot xavfsizligi",
    "difficulty": "medium",
    "tags": "xavfsizlik,kiberxavfsizlik,vpn"
  },
  {
    "question": "Quyidaga rasmda qaysi hujum(attack) turi ko‘rsatilgan? [Foydalanuvchi/Kliyenlar blokidan Server tomon yo‘naltirilgan ma‘lumotlar oqimi o‘rtasidagi vositachilik yoki tarmoq hujumi turi]",
    "answer": "\"Man-in-the-middle\" (MITM) (O‘rtadagi odam) hujumi turi.",
    "category": "Axborot xavfsizligi",
    "difficulty": "medium",
    "tags": "xavfsizlik,kiberxavfsizlik,vpn"
  },
  {
    "question": "VPN - ...?",
    "answer": "Virtual Private Network (Virtual xususiy tarmoq) – umumiy tarmoq (Internet) orqali xavfsiz va shifrlangan aloqa kanalini ta’minlovchi texnologiya.",
    "category": "Axborot xavfsizligi",
    "difficulty": "medium",
    "tags": "xavfsizlik,kiberxavfsizlik,vpn"
  },
  {
    "question": "Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish sohasida maxsus vakolatli davlat organi-?",
    "answer": "O‘zbekiston Respublikasi Davlat soliq qo‘mitasi huzuridagi Kadastr agentligi hamda Davlat kadastrlari palatasi.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "6.025 gektar necha km²?",
    "answer": "Yechimi: 1 gektar = 0.01 km², demak 6.025 / 100 = 0.06025 km². 0.06025 km².",
    "category": "Yer munosabatlari",
    "difficulty": "hard",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Kadastr pasporti bu-?",
    "answer": "Ko‘chmas mulk obyektining texnik tavsiflari, kadastr raqami, qiymati va grafik tasvirini o‘z ichiga olgan elektron hujjat.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Ko‘chmas mulkni texnik inventarizatsiyadan o‘tkazish -?",
    "answer": "Ko‘chmas mulk obyektlarining hajmi, maydoni, qavatliligi, qurilish materiallari, jismoniy eskish holati va boshqa texnik ko‘rsatkichlarini joyiga chiqqan holda aniqlash va o‘lchash jarayoni.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "O‘zbekiston Respublikasining “Kiberxavfsizlik to‘g‘risida”gi qonuni nechta bob va nechta moddadan iborat?",
    "answer": "8 ta bob va 40 ta moddadan iborat.",
    "category": "Axborot xavfsizligi",
    "difficulty": "medium",
    "tags": "xavfsizlik,kiberxavfsizlik,vpn"
  },
  {
    "question": "Davlat kadastrlari yagona tizimining tarkibi hisoblangan Davlat yer kadastri va Binolar va inshootlar davlat kadastrlarini yuritish ishlariga umumiy rahbarlik qilish, ularni metodik jihatdan ta’minlash qaysi vakolatli organ tomonidan amalga oshiriladi?",
    "answer": "O‘zbekiston Respublikasi Davlat soliq qo‘mitasi huzuridagi Kadastr agentligi tomonidan.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "Davlat yer kadastrini yuritishning asosiy prinsiplari nechta?",
    "answer": "6 ta prinsip (yagonalik, ob’ektivlik, uzluksizlik, ishonchlilik, ochiqlik va tejamkorlik).",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Davlat kadastrlari yagona tizimini shakllantirish va yuritishni tashkil etish ishlariga umumiy rahbarlik qilish, ularni metodik jihatdan ta’minlash qaysi vakolatli organ tomonidan amalga oshiriladi?",
    "answer": "Kadastr agentligi tomonidan.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazishning asosiy prinsiplari to‘g‘ri ko‘rsatilgan qatorni belgilang?",
    "answer": "Majburiylik, qonuniylik, ishonchlilik, ochiqlik va ro‘yxatdan o‘tkazishning uzluksizligi (803-sonli Qonunga muvofiq).",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Ko‘chmas mulkning kadastr yig‘majildini shakllantirish uchun asoslar qaysi variantda to‘g‘ri ko‘rsatilgan?",
    "answer": "Mulkdorning yoki huquq egasining arizasi (murojaati), davlat organlarining qarorlari yoki sudning qonuniy kuchga kirgan qarori/ajrimi.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "yig'majildi,kadastr raqami,tizim"
  },
  {
    "question": "Arizani rad qilish uchun tuman/shahar filial boshlig‘iga yuborganda ushbu arizani tuman/shahar filial boshlig‘i rad etmasdan jarayonga qaytarishi mumkinmi?",
    "answer": "Ha, agar rad etish uchun asoslar yetarli bo‘lmasa yoki kamchiliklar bartaraf etilishi mumkin bo‘lsa, jarayonga/ijrochi xodimga qaytarishi mumkin.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "O‘zbekiston Respublikasi 803-sonli qonuniga asosan Kadastr organlari qanday ko‘chmas mulklarga bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazadi?",
    "answer": "Er uchastkalari, binolar, inshootlar (shu jumladan qurilishi tugallanmagan obyektlar) hamda ko‘p yillik dov-daraxtlar bo‘lgan huquqlarni.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish bo‘yicha qaysi organlar vositachi hisoblanadi?",
    "answer": "Davlat xizmatlari markazlari (DXM) va Yagona interaktiv davlat xizmatlari portali (My.gov.uz).",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "O‘zbekiston Respublikasi 803-sonli qonuniga asosan Ko‘chmas mulkning kadastr yig‘majildini shakllantirish uchun asoslar noto‘g‘ri keltirilgan javobni toping?",
    "answer": "Obyektga nisbatan hech qanday huquq belgilovchi hujjatlar yoki arizalar mavjud bo‘lmagan asossiz og‘zaki so‘rovlar noto‘g‘ri asos hisoblanadi.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Davlat reestriga o‘zgartirish kiritish uchun asoslar to‘g‘ri keltirilgan javobni toping?",
    "answer": "Obyektning parametrlari o‘zgarganligi to‘g‘risidagi kadastr hujjati, mulkdor o‘zgarganda oldi-sotdi/hadya shartnomasi, sud qarori yoki tuman/shahar hokimining yangi qarori.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Huquq belgilovchi hujjatlar ta’rifi to‘g‘ri keltirilgan javobni toping?",
    "answer": "Ko‘chmas mulk obyektiga bo‘lgan huquqlarning vujudga kelishini, o‘tishini, cheklanishini yoki bekor qilinishini tasdiqlovchi qonuniy hujjatlar (masalan: shartnomalar, qarorlar, orderlar, guvohnomalar).",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazishni rad etish asoslari noto‘g‘ri ko‘rsatilgan javobni toping?",
    "answer": "Arizachining millati yoki jinsi tufayli rad etish — bu noto‘g‘ri asos hisoblanadi (chunki rad etish faqat hujjatlardagi qonuniy kamchiliklar tufayli bo‘ladi).",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "O‘zbekiston Respublikasi Vazirlar Mahkamasining 2021-yil 22-iyundagi davlat kadastrlarini yuritish sohasini tartibga soluvchi ayrim normativ-huquqiy hujjatlarni tasdiqlash to‘g‘risidagi 389-sonli qarori qaysi me’yoriy hujjatlar ijrosini ta’minlash maqsadida qabul qilingan?",
    "answer": "O‘zbekiston Respublikasi Prezidentining 2020-yil 7-sentabrdagi PF-6061-son va PQ-4819-son (\"Er hisobi va davlat kadastrlarini yuritish tizimini tubdan takomillashtirish chora-tadbursizlari to‘g‘risida\"gi) Farmon va Qarorlari ijrosini ta’minlash maqsadida.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "O‘zbekiston Respublikasi Vazirlar Mahkamasining 2021-yil 22-iyundagi davlat kadastrlarini yuritish sohasini tartibga soluvchi ayrim normativ-huquqiy hujjatlarni tasdiqlash to‘g‘risidagi 389-sonli qarori nechta ilovadan iborat?",
    "answer": "3 ta ilovadan iborat.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Bitta kadastr raqamiga nechta fazoviy obyekt (geometriya) biriktirish mumkin?",
    "answer": "Bir nechta (bitta asosiy yer uchastkasi konturi va uning ichida joylashgan barcha bino-inshootlarning fazoviy obyektlari/geometriyalari biriktiriladi).",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "yig'majildi,kadastr raqami,tizim"
  },
  {
    "question": "Ko‘chmas mulkdagi fazoviy obyektlar qaysi qadamda yaratiladi?",
    "answer": "Kadastr yig‘majildini shakllantirish jarayonidagi \"Fazoviy ma’lumotlarni kiritish va tahrirlash\" (GIS xaritada obyekt konturini chizish) qadamida.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Davlat yer kadastrini yuritish tartibi to‘g‘risidagi nizom qaysi ilovaga muvofiq tasdiqlangan?",
    "answer": "VM 389-sonli qarorining 1-ilovasiga muvofiq tasdiqlangan.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Ko‘chmas mulk obyektiga tayyorlangan kadastr yig‘majildi natijasi bo‘yicha mulkdorga yoki uning ishonchnomasi asosida harakat qiluvchi shaxsga, shuningdek, mulkdorning merosxo‘riga qanday hujjat taqdim etiladi?",
    "answer": "QR-kodli Kadastr pasporti taqdim etiladi.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "yig'majildi,kadastr raqami,tizim"
  },
  {
    "question": "O‘zbekiston Respublikasidan davlat kadastri qonuni qachon qabul qilingan?",
    "answer": "2000-yil 15-dekabrda (\"Davlat kadastrlari to‘g‘risida\"gi Qonun).",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Davlat yer kadastrini yuritish tartibida nizom hamda Binolar va inshootlar davlat kadastrni yuritish tartibida nizomlarni tasdiqlash to‘g‘risidagi qaysi qaror qabul qilingan?",
    "answer": "Vazirlar Mahkamasining 2021-yil 22-iyundagi 389-sonli qarori.",
    "category": "Bino va inshootlar",
    "difficulty": "medium",
    "tags": "bino,inshoot,qurilish"
  },
  {
    "question": "0.212 gektar necha sm²?",
    "answer": "Yechimi: 1 gektar = 10,000 m² = 100,000,000 sm². Demak, 0.212 * 100,000,000 = 21,200,000 sm². 21,200,000 sm².",
    "category": "Yer munosabatlari",
    "difficulty": "hard",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Qurilishi tugallanmagan obyektlar ko‘chmas mulk hisoblanadimi?",
    "answer": "Ha, qonunchilikka ko‘ra hisoblanadi.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Qaysi hukumat qaroriga asosan ko‘chmas mulk obyektlariga kadastr yig‘majildini tayyorlash tartibi to‘g‘risida nizom tasdiqlangan?",
    "answer": "Vazirlar Mahkamasining 2021-yil 22-iyundagi 389-sonli qarorining 3-ilovasi bilan tasdiqlangan.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Yakka tartibdagi turar joy uchun kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasporti tayyorlash muddati qancha?",
    "answer": "5 ish kuni ichida.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Vazirlar Mahkamasining “Davlat kadastrlarini yuritish sohasini tartibga soluvchi ayrim normativ-huquqiy hujjatlarni tasdiqlash to‘g‘risida” gi qarorining 2-ILOVA sida qaysi nizom tasdiqlangan?",
    "answer": "\"Binolar va inshootlar davlat kadastrni yuritish tartibi to‘g‘risidagi nizom\".",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Vazirlar Mahkamasining “Kadastr sohasida ayrim davlat xizmatlari ko‘rsatishning ma’muriy reglamentlarini tasdiqlash to‘g‘risida” gi 535-sonli qarori qaysi normativ-huquqiy hujjat ijrosini ta’minlash maqsadida qabul qilingan?",
    "answer": "O‘zbekiston Respublikasi Prezidentining 2019-yil 5-apreldagi PQ-4270-sonli (\"Ko‘chmas mulk ob’ektlariga bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish tizimini yanada takomillashtirish chora-tadbursizlari to‘g‘risida\"gi) qarori hamda sohaga oid boshqa islohotlar ijrosini ta’minlash uchun.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Noturar obyektning kadastr pasportini shakllantirish va davlat ro‘yxatidan o‘tkazish tranzaksiyasining “O‘lchov natijalarini kiritish” qadamidan “Yer uchastkasini yaratish” qadamiga o‘tishda yangi ko‘chmas mulk obyektlari uchun yuklanadigan majburiy hujjatlar ro‘yxatini ko‘rsating",
    "answer": "Huquq belgilovchi hujjat (qaror/order), arxitektura-qurilish hujjatlari (loyiha hujjatlari yoki foydalanishga qabul qilish dalolatnomasi) va joydagi dala o‘lchov chizmalari (abris/konturlar).",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Arizani rad qilish uchun tuman (shahar) filial boshlig‘iga yuborganda ushbu arizani tuman(shahar) filial boshlig‘i rad etmasdan jarayonga qaytarishi mumkinmi?",
    "answer": "Ha, qaytarishi mumkin.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Davlat yer kadastri ma’lumotlari qanday turlarga bo‘linadi?",
    "answer": "Grafik (fazoviy/xaritalar) ma’lumotlar va atributiv (matnli/huquqiy/miqdoriy va sifat ko‘rsatkichlari) ma’lumotlarga bo‘linadi.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazilganda qanday hujjat beriladi?",
    "answer": "Davlat reestridan QR-kodli elektron ko‘chirma beriladi.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Ko‘p kvartirali uyda joy mulkdorining umumiy mol-mulkdagi ulushi asl holida ajratilishi mumkinmi?",
    "answer": "Yo‘q, qonunchilikka (Uy-joy kodeksiga) ko‘ra, umumiy mol-mulkdagi ulush xonadon mulkdoridan alohida, asl holida ajratilishi yoki begonalashtirilishi mumkin emas.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Yer fondi nechta toifaga bo‘linadi?",
    "answer": "8 ta toifaga bo‘linadi.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Mulkdorining yoki uning ishonchnomasi asosida harakat qiluvchi shaxsning, shuningdek, mulkdor merosxo‘rining so‘roviga ko‘ra kadastr yig‘majildining nusxasi elektron shaklda taqdim etishi mumkinmi?",
    "answer": "Ha, elektron tizim yoki Yagona portal orqali elektron nusxasi taqdim etilishi mumkin.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "yig'majildi,kadastr raqami,tizim"
  },
  {
    "question": "O‘zbekiston Respublikasi Vazirlar Mahkamasining 535 sonli qarori qachon qabul qilingan?",
    "answer": "2020-yil 2-sentabrda qabul qilingan.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Noturar joy maydoni 107 kv.m bo‘lgan ko‘chmas mulkni kadastr pasportini necha ish muddatida tayyorlanishi kerak?",
    "answer": "Maydoni 100 m² dan 1000 m² gacha bo‘lganligi uchun 7 ish kuni ichida tayyorlanishi lozim.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Uchburchakning eng uzun tomoni va eng qisqa tomoni ayrmasini toping? [Rasmda to‘g‘ri burchakli uchburchak berilgan: gipotenuza = 13, asos = 12, balandlik = ?]",
    "answer": "Yechish: Pifagor teoremasiga ko‘ra, balandlik = √(13² - 12²) = √(169 - 144) = √25 = 5. Eng uzun tomoni (gipotenuza) — 13, eng qisqa tomoni (balandlik) — 5. Ayirmasi: 13 - 5 = 8.",
    "category": "Matematika",
    "difficulty": "easy",
    "tags": "matematika,hisob,geometriya"
  },
  {
    "question": "Hisoblang: 3 * ((2.5 - 0.5) + (2.5 + 2)) + 7.5 * 2 - 3.5 = ?",
    "answer": "Yechimi: 3 * (2 + 4.5) + 15 - 3.5 = 3 * 6.5 + 11.5 = 19.5 + 11.5 = 31. 31.",
    "category": "Matematika",
    "difficulty": "easy",
    "tags": "matematika,hisob,geometriya"
  },
  {
    "question": "Kadastr pasportni shakllantirilgandan so‘ng kadastr uchun to‘lov (xabarnoma) nomi qanaqa?",
    "answer": "Invoys (To‘lov xabarnomasi).",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Plastic shaklidagi kadastr pasportini tayyorini qayerdan olinadi?",
    "answer": "Davlat xizmatlari markazidan (DXM) yoki hududiy Kadastr organidan olinadi (hozirda asosan elektron QR-kodli pasport beriladi).",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Kadastr pasportini berish uchun undiriladigan to‘lov miqdorlari qaysi qarorga asosan belgilanadi?",
    "answer": "Vazirlar Mahkamasining 2014-yil 10-iyuldagi 186-sonli qaroriga asosan.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Kadastr yig‘majildi (pasporti) yo‘qolganda (yaroqsiz holga kelganda va ko‘chmas mulk obyekti ko‘rsatkichlari o‘zgartirilmasdan) kadastr pasportni rasmiylashtirish necha ish muddatida tayyorlanishi belgilangan?",
    "answer": "3 ish kuni ichida (Dublikat berish tartibida).",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Quyidagilarni qaysilari kadastr pasporti berishni rad etish uchun asos bo‘ladi?",
    "answer": "Huquq belgilovchi hujjatlar taqdim etilmaganligi, to‘lov qilinmaganligi, arizada noto‘g‘ri ma’lumotlar ko‘rsatilganligi va obyektga nisbatan taqiq/sud cheklovi mavjudligi.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Vazirlar Mahkamasining 535 sonli qarorida Davlat xizmatlari markazlari va DK filiallari o‘z faoliyatini amalga oshirishi natijasida olingan ma’lumotlarning sir saqlanishini belgilanganmi?",
    "answer": "Ha, belgilangan. Tijorat va xizmat siri hamda shaxsga doir ma’lumotlarning maxfiyligi qonun bilan himoya qilinadi.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Vazirlar Mahkamasining 535 sonli qarorida Reglament talablarni ijro qilish, muddatlarni o‘z vaqtida bajarish bo‘yicha Adliya tomonidan doimiy nazorat (monitoring) olib boriladimi?",
    "answer": "Ha, olib boriladi. Adliya vazirligi davlat xizmatlari ko‘rsatilishini doimiy monitoring qiladi.",
    "category": "Imtihon",
    "difficulty": "easy",
    "tags": "imtihon,savollar,vaqt"
  },
  {
    "question": "Agar har bir taxtaning eni 15 sm va ularning orasidagi masofasi 4 sm dan bo‘lsa, to‘siqning uzunligi nechaga teng? [Rasmda 4 ta taxta va ular orasida 3 ta bo‘shliq tasvirlangan]",
    "answer": "Yechish: To‘siq uzunligi = (4 * 15) + (3 * 4) = 60 + 12 = 72 sm. 72 sm.",
    "category": "Matematika",
    "difficulty": "easy",
    "tags": "matematika,hisob,geometriya"
  },
  {
    "question": "Kadastr pasportda tayyorlaganda uy-joy rejasi va topografik suratini joylashtirish mumkinmi?",
    "answer": "Ha, kadastr pasporti tarkibiga obyektning chizmasi (etaj rejasi) va yer uchastkasining kadastr/topografik rejasi majburiy tartibda kiritiladi.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Vazirlar Mahkamasining 535 sonli qarorida Davlat siri bilan bog‘liq bo‘lgan ko‘chmas mulklarni kadastr pasportini tayyorlash o‘rniga qayerga murojaat qilish talab etiladi?",
    "answer": "Maxsus ruxsatnomaga ega bo‘lgan vakolatli davlat organlariga yoki bevosita Davlat kadastrlari palatasining maxsus bo‘limiga (maxfiy rejimda).",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Fuqaro yoki yuridik shaxs kadastr pasportni tayyorlash uchun qayerga murojaat qilishi mumkin?",
    "answer": "Davlat xizmatlari markazlariga (DXM) bevosita borib yoki my.gov.uz portali orqali onlayn.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Kadastr pasportini shakllanishda arizachi YaIDXP orqali murojaat qilinganda qancha vaqtda kadastr idoralarida yuboriladi?",
    "answer": "Avtomatik ravishda, ya’ni real vaqt rejimida (10-15 daqiqa ichida) kadastr organining tizimiga kelib tushadi.",
    "category": "Imtihon",
    "difficulty": "easy",
    "tags": "imtihon,savollar,vaqt"
  },
  {
    "question": "Ko‘chmas mulk bir qismini begonalashtirilganda, obyektni qolgan qismiga murojaati asosida kadastr pasportini rasmiylashtirilganda to‘lov undiriladimi?",
    "answer": "Ha, yangi pasport shakllantirilayotganligi sababli belgilangan tartibda to‘lov undiriladi.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Kadastr yig‘majildi (pasporti) yo‘qolganda (yaroqsiz holga kelganda va ko‘chmas mulk obyekti ko‘rsatkichlari o‘zgartirilmasdan) bo‘lsa, kadastr pasportini rasmiylashtirilganda to‘lov undiriladimi?",
    "answer": "Ha, pasportni dublikat qibly qayta bosib berish/shakllantirish uchun bazaviy hisoblash miqdorining ma’lum bir foizida (kamaytirilgan qiymatda) to‘lov undiriladi.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Kadastr pasportni rasmiylashtirilgandi ariza beruvchi yoki uning vakili kelishilgan manzilda bo‘lmagan taqdirda kadastr pasportni rad qilishga asos bo‘ladimi?",
    "answer": "Ha, agar kadastr xodimi joyiga o‘lchovga borganida ariza beruvchi bo‘lmasa va obyektni ko‘zdan kechirish imkoni bo‘lmasa, dalolatnoma tuzilib, ariza rad etiladi.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Vakolatli organ tomonidan kadastr pasportini rasmiylashtirish bo‘yicha ko‘chmas mulk obyektiga taqiq yoki xatlov qo‘yilganligi kadastr pasportni rad qilishga asos bo‘ladimi?",
    "answer": "Ha, agar taqiq (sud yoki mib tomonidan) bo‘lsa, kadastr pasporti taqdim etilishi rad etilishi yoki to‘xtatilishi mumkin.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Ariza beruvchi davlat xizmatidan foydalanishdan uni ko‘rsatishning har qanday bosqichida bosh tortish huquqiga egami?",
    "answer": "Ha, har qanday bosqichda ariza beruvchi o‘z arizasini qaytarib olish (bosh tortish) huquqiga ega.",
    "category": "Davlat xizmatlari",
    "difficulty": "easy",
    "tags": "davlat xizmatlari,portal,my.gov.uz"
  },
  {
    "question": "Kadastr muhandisi tomonidan kadastr pasportni rasmiylashtirilgan vaqtda murojaatchi talab etilganda holda ko‘chmas mulk obyektining manzilini belgilash yoki o‘zgartirish huquqiga egami?",
    "answer": "Yo‘q. Obyekt manzilini belgilash yoki o‘zgartirish tuman (shahar) hokimligi yoki arxitektura organlari (geografik ob’ektlarni nomlash tizimi) vakolatiga kiradi. Kadastr muhandisi faqat mavjud rasmiy manzilni kiritadi.",
    "category": "Imtihon",
    "difficulty": "easy",
    "tags": "imtihon,savollar,vaqt"
  },
  {
    "question": "Kadastr shakllantirishda kadastr pasport uchun to‘lov summasi qaysi qaror asosida undiriladi?",
    "answer": "Vazirlar Mahkamasining 186-sonli qarori asosida.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Qaysi shakl maydoni kattaroq? [Rasmda A, B, C, D harflari bilan belgilangan katakchalardan iborat shakllar ko‘rsatilgan]",
    "answer": "Qaysi harfdagi shaklda to‘liq kataklar soni ko‘p bo‘lsa, o‘sha shaklning maydoni eng kattasi bo‘ladi.",
    "category": "Matematika",
    "difficulty": "easy",
    "tags": "matematika,hisob,geometriya"
  },
  {
    "question": "Ismoilov yer uchastkasini to‘rt qismiga ajratdi, uchastkalarining qaysi bo‘lagi kichikroq? [Rasmda to‘rtburchakli to‘rtta zona A, B, C, D koordinata o‘qlari bo‘yicha bo‘lingan]",
    "answer": "Koordinata o‘qlarining kesishish nuqtalariga ko‘ra eng kichik to‘rtburchak maydonga ega bo‘lgan zona (masalan, grafikda eng kichik ko‘ringan segment) to‘g‘ri javob bo‘ladi.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "O‘zbekiston Respublikasi Vazirlar Mahkamasining 2021-yil 22-iyundagi 389-sonli qarori qaysi normativ-huquqiy hujjatlarning ijrosini ta’minlash maqsadida qabul qilingan?",
    "answer": "Prezidentining PF-6061-son va PQ-4819-sonli qarorlari ijrosini ta’minlash maqsadida.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Vazirlar Mahkamasining “Davlat kadastrlarini yuritish sohasini tartibga soluvchi ayrim normativ-huquqiy hujjatlarni tasdiqlash to‘g‘risida” gi qarorining 2-ILOVA sida qaysi nizom tasdiqlangan?",
    "answer": "\"Binolar va inshootlar davlat kadastrni yuritish tartibi to‘g‘risidagi nizom\".",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Vazirlar Mahkamasining “Kadastr sohasida ayrim davlat xizmatlari ko‘rsatishning ma’muriy reglamentlarini tasdiqlash to‘g‘risida” qarori qachon qabul qilingan?",
    "answer": "2020-yil 2-sentabrda (535-son qaror).",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Vazirlar Mahkamasining 2020-yil 2-sentabrdagi 535-son qaroriga muvofiq Malaka imtihonida nechta savol va qancha vaqt beriladi?",
    "answer": "50 ta savol va 45 daqiqa beriladi.",
    "category": "Imtihon",
    "difficulty": "easy",
    "tags": "imtihon,savollar,vaqt"
  },
  {
    "question": "Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish to‘g‘risidagi O‘RQ-803-sonli qonun ko‘chmas mulkning qaysi turlariga bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazishga nisbatan tatbiq etilmaydi?",
    "answer": "Kosmik obyektlar, havo va dengiz kemalari hamda yer osti boyliklariga nisbatan.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Quyidagi javoblardan qaysi biri kompyuter tizimidagi axborot xavfsizligi tahdidlari hisoblanadi?",
    "answer": "Troyanlar, josuslik dasturlari (spyware) va tizimdagi zaifliklar (vulnerabilities) orqali amalga oshiriladigan xakerlik hujumlari.",
    "category": "Axborot xavfsizligi",
    "difficulty": "medium",
    "tags": "xavfsizlik,kiberxavfsizlik,vpn"
  },
  {
    "question": "Kiberxavfsizlik to‘g‘risidagi qonun qachon qabul qilingan?",
    "answer": "2022-yil 15-aprelda (O‘RQ-764-son).",
    "category": "Axborot xavfsizligi",
    "difficulty": "medium",
    "tags": "xavfsizlik,kiberxavfsizlik,vpn"
  },
  {
    "question": "Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish sohasida maxsus vakolatli davlat organi-?",
    "answer": "Kadastr agentligi hamda Davlat kadastrlari palatasi.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Kadastr pasporti bu-?",
    "answer": "Ko‘chmas mulk obyektining shakllantirilgan texnik va kadastr ko‘rsatkichlari majmuidir.",
    "category": "Kadastr pasporti",
    "difficulty": "medium",
    "tags": "kadastr pasporti,invoys,to'lov"
  },
  {
    "question": "Ko‘chmas mulkni texnik inventarizatsiyadan o‘tkazish -?",
    "answer": "Obyekt parametrlarini joyida ashyoviy va texnik jihatdan o‘lchash va aniqlash jarayonidir.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazishning asosiy prinsiplari to‘g‘ri ko‘rsatilgan qatorni belgilang?",
    "answer": "Qonuniylik, majburiylik, ishonchlilik, ochiqlik.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Ko‘chmas mulkdagi fazoviy obyektlar qaysi qadamda yaratiladi?",
    "answer": "GIS tizimida xaritaga ma’lumot va kontur kiritish (Fazoviy shakllantirish) qadamida.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Vazirlar Mahkamasining 389-qaroriga asosan Ko‘chmas mulkning kadastr yig‘majildini shakllantirish uchun asoslar noto‘g‘ri keltirilgan javobni toping ?",
    "answer": "Jismoniy shaxsning hech qanday hujjatsiz, og‘zaki asossiz talabi.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazishni rad etish asoslari noto‘g‘ri ko‘rsatilgan javobni toping.",
    "answer": "Obyekt egasining doimiy yashash joyi respublikadan tashqarida ekanligi sababli rad etish (bu qonuniy asos emas).",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "kadastr"
  },
  {
    "question": "Davlat yer kadastrining tarkibiy qismlari, davlat yer kadastrini yuritishning asosiy prinsiplari hamda davlat yer kadastrini yuritishda Davlat kadastrlari palatasi va uning hududiy boshqarmalarining vazifalarini nazarda tutuvchi Davlat yer kadastrini yuritish tartibi to‘g‘risidagi nizom qaysi ilovaga muvofiq tasdiqlangan?",
    "answer": "Vazirlar Mahkamasining 389-sonli qarorining 1-ilovasiga muvofiq.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Ko‘chmas mulk obyektiga tayyorlangan kadastr yig‘majildi natijasi bo‘yicha mulkdorga yoki uning ishonchnomasi asosida harakat qiluvchi shaxsga, shuningdek, mulkdorning merosxo‘riga qanday hujjat taqdim etiladi?",
    "answer": "QR-kodli rasmiy Kadastr pasporti.",
    "category": "Kadastr tizimi",
    "difficulty": "medium",
    "tags": "yig'majildi,kadastr raqami,tizim"
  },
  {
    "question": "Davlat yer kadastri ma’lumotlari qanday turlarga bo‘linadi?",
    "answer": "Grafik va matnli (atributiv) ma’lumotlarga bo‘linadi.",
    "category": "Yer munosabatlari",
    "difficulty": "medium",
    "tags": "yer,yer fondi,sug'orish"
  },
  {
    "question": "Vazirlar Mahkamasining 2021-yil 22-iyundagi 389-son qaroriga 2-ilovasi nizomi qaysi tartibni belgilaydi?",
    "answer": "\"Binolar va inshootlar davlat kadastrini yuritish tartibi\"ni belgilaydi.",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  },
  {
    "question": "Kadastr yig‘majildining muqovasi va tarkibidagi elektron axborot tizimida shakllanadigan ma’lumotlarning namunaviy jadvallari, qaydnomalari va blankalari shakllarini tasdiqlash haqida O‘zbekiston Respublikasi Davlat soliq qo‘mitasi huzuridagi Kadastr agentligi direktorining buyrug‘i Adliya vazirligi tomonidan ro‘yxatdan o‘tkazilgan sanasi va ro‘yxat raqami?",
    "answer": "Kadastr agentligi direktorining buyrug‘i Adliya vazirligi tomonidan 2021-yil noyabr/dekabr oylarida tegishli maxsus reestr raqami bilan davlat ro‘yxatidan o‘tkazilgan (Yagona ichki me’yoriy hujjatlar tasniflagich raqami bilan).",
    "category": "Qonunchilik",
    "difficulty": "hard",
    "tags": "qonun,qaror,nizom"
  }
];

async function main() {
  console.log('Seeding database with default flashcards...');
  
  // Clear existing cards to prevent duplicates on re-run
  await prisma.flashcard.deleteMany({
    where: {
      userId: null // Only delete global cards
    }
  });

  const flatCards = flashcards.flat();

  for (const card of flatCards) {
    await prisma.flashcard.create({
      data: card
    });
  }

  console.log(`Successfully seeded ${flatCards.length} flashcards!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
