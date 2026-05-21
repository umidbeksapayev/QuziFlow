const fs = require('fs');
const path = require('path');

// 51 to 194 raw text
const rawNewQuestions = `
51. Terrasa nima?
Javob: Binoga tutashgan yoki alohida joylashgan, usti ochiq yoki soyabonli, pol to‘shamasiga ega bo‘lgan maxsus maydoncha (terrasa odatda to‘silmagan yoki panjara bilan to‘silgan ochiq joy bo‘ladi).
52. Turar-joy ko‘chmas mulk obyekti hisoblanadimi?
Javob: Ha, hisoblanadi.
53. Turar-joyni yoki uning qismini noturar joy maqomiga o‘tkazish mumkinmi?
Javob: Ha, qonunchilikda belgilangan tartibda hokimlik yoki vakolatli arxitektura organlarining ruxsati bilan o‘tkazish mumkin.
54. Noturar-joyni yoki uning qismini turar joy maqomiga o‘tkazish mumkinmi?
Javob: Ha, belgilangan shaharsozlik va sanitariya normalariga javob bergan taqdirda, ruxsatnoma asosida o‘tkazish mumkin.
55. Balkon nima?
Javob: Binoning tashqi devori sirtidan bo‘rtib chiqqan, to‘silgan ochiq maydoncha.
56. Kvartiraning umumiy maydoni nima?
Javob: Kvartiradagi barcha xonalarning (yashash xonalari va yordamchi xonalar – oshxona, koridor, vanna, ichki dahliz va h.k.) maydonlari yig‘indisi. (Amaldagi shaharsozlik normalariga ko‘ra balkonlar ma’lum bir pasaytiruvchi koeffitsient bilan kiritiladi yoki kiritilmaydi).
57. Chordoq nima?
Javob: Binoning yuqori qavati shifti, tashqi devorlari va tom yopgichi oralig‘idagi yashash uchun mo‘ljallanmagan joy/bo‘shliq.
58. Turar joy binosidagi mansarda nima?
Javob: Tom konstruksiyasi ichida qurilgan va yashash uchun moslashtirilgan qavat (chodirqavat).
59. Yerto‘la nima?
Javob: Pol sathining balandligi yer sathidan binoning balandligi yarmidan ko‘proq chuqurlikda joylashgan bino qavati.
60. Texnik qavat nima?
Javob: Muhandislik jihozlarini joylashtirish va kommunikatsiya tarmoqlarini (suv, isitish, elektr) o‘tkazish uchun mo‘ljallangan maxsus qavat (u yerto‘lada, qavatlar orasida yoki binoning eng yuqori qismida bo‘shuvi mumkin).
61. Vaqtinchalik imorat nima?
Javob: Poydevorsiz, mavsumiy yoki ma’lum muddatga mo‘ljallangan, oson buziladigan va ko‘chiriladigan yengil inshoot.
62. Tashqi devor qiya bo‘lgan taqdirda, maydon qayerdan hisoblanadi?
Javob: Pol sathidan ma’lum balandlikda (masalan, mansardalarda pol sathidan 1.2 - 1.5 m balandlikdagi qiyalik nuqtasidan boshlab) yoki devorning pol bilan tutashgan ichki yuzasidan shaharsozlik normalariga muvofiq hisoblanadi.
63. Xona maydonini hisoblashda plintus hisobga olinadimi?
Javob: Yo‘q, xona maydoni plintuslar hisobga olinmagan holda, devorlarning suvalgan va pardozlangan yuzalari orasidagi masofa bo‘yicha hisoblanadi.
64. Kvartiralarning umumiy maydoniga balkonlar maydoni kiradimi?
Javob: O‘zbekiston Respublikasi shaharsozlik normalariga ko‘ra, kadastr pasportida xonadonning umumiy maydoniga balkonlar, lodjiyalar va terrasalar maydoni tegishli pasaytiruvchi koeffitsiyentlar (masalan, balkon uchun 0.3) bilan qo‘shib hisoblanadi.
65. Asosiy binolarning kirish qismidagi zinalar rejaga kiritiladimi?
Javob: Ha, kirish zinalari va maydonchalari binoning tashqi chizmasi hamda topografik/kadastr rejasida aks ettiriladi.
66. Texnik yerto‘la bino maydoniga qo‘shiladimi?
Javob: Texnik yerto‘la (balandligi 1.8 metrdan kam bo‘lsa) binoning umumiy foydali maydoniga qo‘shilmaydi, lekin binoning texnik tavsifida alohida ko‘rsatiladi.
67. Yer to‘la binoning qurilish hajmiga kiritiladimi?
Javob: Ha, yerto‘laning hajmi binoning umumiy qurilish hajmiga (M³ da) kiritiladi.
68. Balkon binoning qurilish hajmiga kiritiladimi?
Javob: Ochiq balkonlar binoning umumiy yopiq qurilish hajmiga (M³) kiritilmaydi (lodjiyalar va yopiq verandalar kiritilishi mumkin).
69. Bino ostidan o‘tish joylari maydoni qurilish maydoniga kiradimi?
Javob: Ha, bino ostidagi o‘tish joylari (arkalar) binoning umumiy qurilish osti maydoniga (konturiga) kiradi.
70. Davlat kadastrlari yagona tizimini nechta davlat kadastrlari tashkil etadi?
Javob: O‘zbekiston Respublikasida Davlat kadastrlari yagona tizimini (DKYT) jami 21 ta davlat kadastri tashkil etadi.
71. Bino nima?
Javob: Odamlar yashashi, ular tomonidan turli ishlab chiqarish jarayonlarini bajarish, aholiga xizmat ko‘rsatish, moddiy qimmatliklarni saqlash uchun mo‘ljallangan, fundamental asosga (poydevorga) ega bo‘lgan yer usti qurilishi.
72. Kadastr yig‘majildi nima?
Javob: Ko‘chmas mulk obyektining geografik joylashuvu, huquqiy holati, miqdoriy va sifat tavsiflari hamda baholangan qiymati to‘g‘risidagi kadastr xaritasi, rejalari, chizmalari va matnli hujjatlar to‘plami.
73. Kadastr pasporti nima?
Javob: Ko‘chmas mulk obyektining texnik, kadastr va boshqa ma’lumotlarini o‘z ichiga olgan, elektron yoki qog‘oz shaklida beriladigan rasmiy hujjat.
74. Ko‘chmas mulk nima?
Javob: Er uchastkalari va yer bilan uzviy bog‘langan, ko‘chirilishi ularning maqsadiga nomutanosib zarar yetkazmagan holda ko‘chirilishi mumkin bo‘lmagan hamma narsa, shu jumladan binolar, inshootlar va ko‘p yillik daraxtlar.
75. Qurilishi tugallanmagan bino bu-.........
Javob: Qurilishi boshlangan, lekin poydevori yoki asosiy konstruktiv qismlari tiklangan holda qurilish ishlari hali yakunlanmagan va foydalanishga qabul qilinmagan obyekt.
76. Kadastr yig‘majildi kim tomonidan tayyorlanadi?
Javob: Davlat kadastrlari palatasining hududiy filiallari yoki kadastr muhandislari (shatodatnomaga ega bo‘lgan mutaxassislar) tomonidan tayyorlanadi.
77. Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish ko‘p kvartirali uydagi kvartiralar uchun qanday muddatda amalga oshiriladi?
Javob: 3 ish kuni ichida.
78. Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish yakka tartibdagi turar joy uchun qanday muddatda amalga oshiriladi?
Javob: 5 ish kuni ichida.
79. Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish umumiy maydoni 100 kv. metrgacha bo‘lgan noturar joy uchun qanday muddatda amalga oshiriladi?
Javob: 5 ish kuni ichida.
80. Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish umumiy maydoni 100 kv. metrdan 1 000 kv. metrgacha bo‘lgan noturar joy uchun qanday muddatda amalga oshiriladi?
Javob: 7 ish kuni ichida.
81. Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish umumiy maydoni 1 000 kv. metrdan 5 000 kv. metrgacha bo‘lgan noturar joy uchun qanday muddatda amalga oshiriladi?
Javob: 10 ish kuni ichida.
82. Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish umumiy maydoni 5 000 kv. metrdan 15 000 kv. metrgacha bo‘lgan noturar joy uchun qanday muddatda amalga oshiriladi?
Javob: 15 ish kuni ichida.
83. Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish umumiy maydoni 15 000 kv. metrdan 50 000 kv. metrgacha bo‘lgan noturar joy uchun qanday muddatda amalga oshiriladi?
Javob: 20 ish kuni ichida.
84. Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish umumiy maydoni 50 000 kv. metrdan ortiq bo‘lgan noturar joy uchun qanday muddatda amalga oshiriladi?
Javob: 25 ish kuni ichida.
85. Davlat kadastrlari palatasi tomonidan kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasportini taqdim etish ajratilgan yer uchastkalari bo‘yicha qanday muddatda amalga oshiriladi?
Javob: 3 ish kuni ichida.
86. Yer uchastkasining kadastr yig‘majildini tayyorlashda qanday ishlar bajariladi?
Javob: Er uchastkasining chegaralarini joyida o‘rganish va geodezik o‘lchash, elektron xarita va rejalarni tuzish, huquq belgilovchi hujjatlarni tahlil qilish, ma’lumotlarni tizimga kiritish.
87. Yer uchastkasining elektron raqamli kadastr rejasi qanday tuziladi?
Javob: GIS (Geografik axborot tizimi) dasturlarida, maxsus geodezik o‘lchov asboblari (GPS, Taxeometr) yordamida olingan koordinatalar asosida elektron raqamli shaklda tuziladi.
88. Yer uchastkasining kadastr rejasida nimalar aks ettiriladi?
Javob: Er uchastkasining chegaralari, burilish nuqtalarining koordinatalari, maydoni, undagi bino va inshootlarning konturlari, qo‘shni yer egalarining chegaradosh chiziqlari.
89. Aholi punktlaridagi yer uchastkasining kadastr rejasi qanday masshtabda tuziladi?
Javob: Odatda 1:500 yoki 1:1000 masshtabda tuziladi.
90. Ko‘chmas mulk obyektini hisobga olishda yer uchastkasi bo‘yicha qanday ma’lumotlar aks ettiriladi?
Javob: Kadastr raqami, joylashgan manzili, yer toifasi, yer turi, ajratilgan va amaldagi maydoni, huquq turi hamda unga bo‘lgan cheklovlar (servitut va taqiqlar).
91. O‘zbekiston Respublikasining “Davlat kadastrlari to‘g‘risida”gi Qonuni qachon qabul qilingan?
Javob: 2000-yil 15-dekabrda qabul qilingan (O‘RQ-171-II-son).
92. Vazirlar Mahkamasining “Davlat kadastrlarini yuritish sohasini tartibga soluvchi ayrim normativ-huquqiy hujjatlarni tasdiqlash to‘g‘risida”gi qarori qachon qabul qilingan?
Javob: 2021-yil 22-iyunda qabul qilingan (389-sonli qaror).
93. Axborot xavfsizligida himoyaning asosiy elementlari?
Javob: Maxfiylik (Confidentiality), yaxlitlik (Integrity) va foydalanish imkoniyati/ ochiqlik (Availability) — (CIA triada).
94. Umumiy maydoni 5 gektardan 10 gektargacha bo‘lgan ko‘p yillik dov-daraxtlar joylashgan yer uchastkasi uchun kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasporti tayyorlash vaqti qancha?
Javob: 15 ish kuni ichida.
95. O‘zbekiston Respublikasi Yer fondining toifalari to‘g‘ri ko‘rsatilgan qatorni belgilang?
Javob: 1) Qishloq xo‘jaligiga mo‘ljallangan yerlar; 2) Aholi punktlarining yerlari; 3) Sanoat, transport, aloqa, mudofaa va boshqa maqsadlarga mo‘ljallangan yerlar; 4) Tabiatni muhofaza qilish, sog‘lomlashtirish, rekreatsiya va tarixiy-madaniy maqsadlarga mo‘ljallangan yerlar; 5) O‘rmon fondi yerlari; 6) Suv fondi yerlari; 7) Zaxira yerlar.
96. Davlat yer kadastrini yuritish tartibi to‘g‘risidagi nizom tasdiqlangandan keyin Vazirlar mahkamasining qaysi qarori o‘z kuchini yo‘qotgan?
Javob: Vazirlar Mahkamasining 1998-yil 31-dekabrdagi "O‘zbekiston Respublikasida davlat yer kadastrini yuritish tartibi to‘g‘risidagi nizomni tasdiqlash haqida"gi 554-sonli qarori.
97. O‘zbekiston Respublikasining “Kiberxavfsizlik to‘g‘risida”gi qonuni qachon qabul qilingan?
Javob: 2022-yil 15-aprelda qabul qilingan (O‘RQ-764-son).
98. Vazirlar Mahkamasining “Davlat kadastrlarini yuritish sohasini tartibga soluvchi ayrim normativ-huquqiy hujjatlarni tasdiqlash to‘g‘risida” gi qarorining 2-ILOVA sida qaysi nizom tasdiqlangan?
Javob: "Binolar va inshootlar davlat kadastrni yuritish tartibi to‘g‘risidagi nizom" tasdiqlangan.
99. Vazirlar Mahkamasining “Kadastr sohasida ayrim davlat xizmatlari ko‘rsatishning ma’muriy reglamentlarini tasdiqlash to‘g‘risida” qarori qachon qabul qilingan?
Javob: 2020-yil 2-sentabrda qabul qilingan (535-sonli qaror).
100. Vazirlar Mahkamasining 535-sonli qaroriga 2-ILOVA?
Javob: "Ko‘chmas mulk bo‘yicha kadastr muhandisining malaka shahodatnomasini berish bo‘yicha davlat xizmatlarini ko‘rsatishning ma’muriy reglamenti".
101. Vazirlar Mahkamasining 535-sonli qarorida “Ko‘chmas mulk bo‘yicha kadastr muhandisining malaka shahodatnomasini berish bo‘yicha davlat xizmatlarini ko‘rsatishning ma’muriy reglamenti” qaysi ilovada tasdiqlangan?
Javob: 2-ilovada tasdiqlangan.
102. Kadastr pasportining shakllari Vazirlar Mahkamasining qaysi qarori bilan tasdiqlangan?
Javob: Vazirlar Mahkamasining 2020-yil 2-sentabrda qabul qilingan 535-sonli qarori bilan.
103. Vazirlar Mahkamasining 2020-yil 2-sentabrdagi 535-son qaroriga muvofiq malaka imtihonida nechta savol va qancha vaqt beriladi?
Javob: 50 ta savol va 45 daqiqa vaqt beriladi.
104. Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish to‘g‘risidagi O‘RQ-803-sonli qonun ko‘chmas mulkning qaysi turlariga bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazishga nisbatan tatbiq etilmaydi?
Javob: Yer osti boyliklari, havo va dengiz kemalari, ichki suzish obyekti hamda kosmik obyektlarga nisbatan (ular alohida reestrlarda ro‘yxatga olinadi).
105. “Ko‘chmas mulk obyektiga kadastr yig‘majildini tayyorlash tartibi to‘g‘risidagi nizom” Vazirlar Mahkamasining 389-sonli qarorining nechanchi ilovasi bo‘lib kelgan?
Javob: 3-lovasi bo‘lib kelgan.
106. Davlat kadastrlari yuritishning asosiy prinsiplari nechta?
Javob: 5 ta asosiy prinsip vaqtinchalik mavjud (ishonchlilik, qonuniylik, yagonalik, ochiqlik va uzluksizlik).
107. O‘zbekiston Respublikasining Davlat yer kadastri to‘g‘risida Qonuni qachon qabul qilingan?
Javob: 1998-yil 28-avgustda qabul qilingan (666-I-son).
108. “Noturar ko‘chmas mulkni boshqa shaxsga o‘tkazishga oid shartnomalarni rasmiylashtirish va unga bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish bo‘yicha kompozit davlat xizmatini ko‘rsatishning ma’muriy reglamentini tasdiqlash to‘g‘risida”gi Vazirlar Mahkamasining qarori qachon qabul qilingan?
Javob: 2023-yil 12-oktabrda qabul qilingan (536-sonli qaror).
109. Axborot xavfsizligi - ...?
Javob: Axborot va uni qo‘llab-quvvatlovchi infratuzilmalarni ruxsatsiz foydalanish, oshkor qilish, buzish, o‘zgartirish yoki yo‘q qilishdan himoya qilish holatidir.
110. Kompyuter tizimidagi axborot xavfsizligi tahdidlarini ko‘rsating?
Javob: Viruslar va zararli dasturlar (malware), fishing (phishing), DDoS hujumlar, ruxsatsiz kirish va ma’lumotlarning sizib chiqishi.
111. Quyidaga rasmda qaysi hujum(attack) turi ko‘rsatilgan? [Foydalanuvchi/Kliyenlar blokidan Server tomon yo‘naltirilgan ma‘lumotlar oqimi o‘rtasidagi vositachilik yoki tarmoq hujumi turi]
Javob: "Man-in-the-middle" (MITM) (O‘rtadagi odam) hujumi turi.
112. VPN - ...?
Javob: Virtual Private Network (Virtual xususiy tarmoq) – umumiy tarmoq (Internet) orqali xavfsiz va shifrlangan aloqa kanalini ta’minlovchi texnologiya.
113. Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish sohasida maxsus vakolatli davlat organi-?
Javob: O‘zbekiston Respublikasi Davlat soliq qo‘mitasi huzuridagi Kadastr agentligi hamda Davlat kadastrlari palatasi.
114. 6.025 gektar necha km²?
Javob: Yechimi: 1 gektar = 0.01 km², demak 6.025 / 100 = 0.06025 km².
0.06025 km².
115. Kadastr pasporti bu-?
Javob: Ko‘chmas mulk obyektining texnik tavsiflari, kadastr raqami, qiymati va grafik tasvirini o‘z ichiga olgan elektron hujjat.
116. Ko‘chmas mulkni texnik inventarizatsiyadan o‘tkazish -?
Javob: Ko‘chmas mulk obyektlarining hajmi, maydoni, qavatliligi, qurilish materiallari, jismoniy eskish holati va boshqa texnik ko‘rsatkichlarini joyiga chiqqan holda aniqlash va o‘lchash jarayoni.
117. O‘zbekiston Respublikasining “Kiberxavfsizlik to‘g‘risida”gi qonuni nechta bob va nechta moddadan iborat?
Javob: 8 ta bob va 40 ta moddadan iborat.
118. Davlat kadastrlari yagona tizimining tarkibi hisoblangan Davlat yer kadastri va Binolar va inshootlar davlat kadastrlarini yuritish ishlariga umumiy rahbarlik qilish, ularni metodik jihatdan ta’minlash qaysi vakolatli organ tomonidan amalga oshiriladi?
Javob: O‘zbekiston Respublikasi Davlat soliq qo‘mitasi huzuridagi Kadastr agentligi tomonidan.
119. Davlat yer kadastrini yuritishning asosiy prinsiplari nechta?
Javob: 6 ta prinsip (yagonalik, ob’ektivlik, uzluksizlik, ishonchlilik, ochiqlik va tejamkorlik).
120. Davlat kadastrlari yagona tizimini shakllantirish va yuritishni tashkil etish ishlariga umumiy rahbarlik qilish, ularni metodik jihatdan ta’minlash qaysi vakolatli organ tomonidan amalga oshiriladi?
Javob: Kadastr agentligi tomonidan.
121. Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazishning asosiy prinsiplari to‘g‘ri ko‘rsatilgan qatorni belgilang?
Javob: Majburiylik, qonuniylik, ishonchlilik, ochiqlik va ro‘yxatdan o‘tkazishning uzluksizligi (803-sonli Qonunga muvofiq).
122. Ko‘chmas mulkning kadastr yig‘majildini shakllantirish uchun asoslar qaysi variantda to‘g‘ri ko‘rsatilgan?
Javob: Mulkdorning yoki huquq egasining arizasi (murojaati), davlat organlarining qarorlari yoki sudning qonuniy kuchga kirgan qarori/ajrimi.
123. Arizani rad qilish uchun tuman/shahar filial boshlig‘iga yuborganda ushbu arizani tuman/shahar filial boshlig‘i rad etmasdan jarayonga qaytarishi mumkinmi?
Javob: Ha, agar rad etish uchun asoslar yetarli bo‘lmasa yoki kamchiliklar bartaraf etilishi mumkin bo‘lsa, jarayonga/ijrochi xodimga qaytarishi mumkin.
124. O‘zbekiston Respublikasi 803-sonli qonuniga asosan Kadastr organlari qanday ko‘chmas mulklarga bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazadi?
Javob: Er uchastkalari, binolar, inshootlar (shu jumladan qurilishi tugallanmagan obyektlar) hamda ko‘p yillik dov-daraxtlar bo‘lgan huquqlarni.
125. Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish bo‘yicha qaysi organlar vositachi hisoblanadi?
Javob: Davlat xizmatlari markazlari (DXM) va Yagona interaktiv davlat xizmatlari portali (My.gov.uz).
126. O‘zbekiston Respublikasi 803-sonli qonuniga asosan Ko‘chmas mulkning kadastr yig‘majildini shakllantirish uchun asoslar noto‘g‘ri keltirilgan javobni toping?
Javob: Obyektga nisbatan hech qanday huquq belgilovchi hujjatlar yoki arizalar mavjud bo‘lmagan asossiz og‘zaki so‘rovlar noto‘g‘ri asos hisoblanadi.
127. Davlat reestriga o‘zgartirish kiritish uchun asoslar to‘g‘ri keltirilgan javobni toping?
Javob: Obyektning parametrlari o‘zgarganligi to‘g‘risidagi kadastr hujjati, mulkdor o‘zgarganda oldi-sotdi/hadya shartnomasi, sud qarori yoki tuman/shahar hokimining yangi qarori.
128. Huquq belgilovchi hujjatlar ta’rifi to‘g‘ri keltirilgan javobni toping?
Javob: Ko‘chmas mulk obyektiga bo‘lgan huquqlarning vujudga kelishini, o‘tishini, cheklanishini yoki bekor qilinishini tasdiqlovchi qonuniy hujjatlar (masalan: shartnomalar, qarorlar, orderlar, guvohnomalar).
129. Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazishni rad etish asoslari noto‘g‘ri ko‘rsatilgan javobni toping?
Javob: Arizachining millati yoki jinsi tufayli rad etish — bu noto‘g‘ri asos hisoblanadi (chunki rad etish faqat hujjatlardagi qonuniy kamchiliklar tufayli bo‘ladi).
130. O‘zbekiston Respublikasi Vazirlar Mahkamasining 2021-yil 22-iyundagi davlat kadastrlarini yuritish sohasini tartibga soluvchi ayrim normativ-huquqiy hujjatlarni tasdiqlash to‘g‘risidagi 389-sonli qarori qaysi me’yoriy hujjatlar ijrosini ta’minlash maqsadida qabul qilingan?
Javob: O‘zbekiston Respublikasi Prezidentining 2020-yil 7-sentabrdagi PF-6061-son va PQ-4819-son ("Er hisobi va davlat kadastrlarini yuritish tizimini tubdan takomillashtirish chora-tadbursizlari to‘g‘risida"gi) Farmon va Qarorlari ijrosini ta’minlash maqsadida.
131. O‘zbekiston Respublikasi Vazirlar Mahkamasining 2021-yil 22-iyundagi davlat kadastrlarini yuritish sohasini tartibga soluvchi ayrim normativ-huquqiy hujjatlarni tasdiqlash to‘g‘risidagi 389-sonli qarori nechta ilovadan iborat?
Javob: 3 ta ilovadan iborat.
132. Bitta kadastr raqamiga nechta fazoviy obyekt (geometriya) biriktirish mumkin?
Javob: Bir nechta (bitta asosiy yer uchastkasi konturi va uning ichida joylashgan barcha bino-inshootlarning fazoviy obyektlari/geometriyalari biriktiriladi).
133. Ko‘chmas mulkdagi fazoviy obyektlar qaysi qadamda yaratiladi?
Javob: Kadastr yig‘majildini shakllantirish jarayonidagi "Fazoviy ma’lumotlarni kiritish va tahrirlash" (GIS xaritada obyekt konturini chizish) qadamida.
134. Davlat yer kadastrini yuritish tartibi to‘g‘risidagi nizom qaysi ilovaga muvofiq tasdiqlangan?
Javob: VM 389-sonli qarorining 1-ilovasiga muvofiq tasdiqlangan.
135. Ko‘chmas mulk obyektiga tayyorlangan kadastr yig‘majildi natijasi bo‘yicha mulkdorga yoki uning ishonchnomasi asosida harakat qiluvchi shaxsga, shuningdek, mulkdorning merosxo‘riga qanday hujjat taqdim etiladi?
Javob: QR-kodli Kadastr pasporti taqdim etiladi.
136. O‘zbekiston Respublikasidan davlat kadastri qonuni qachon qabul qilingan?
Javob: 2000-yil 15-dekabrda ("Davlat kadastrlari to‘g‘risida"gi Qonun).
137. Davlat yer kadastrini yuritish tartibida nizom hamda Binolar va inshootlar davlat kadastrni yuritish tartibida nizomlarni tasdiqlash to‘g‘risidagi qaysi qaror qabul qilingan?
Javob: Vazirlar Mahkamasining 2021-yil 22-iyundagi 389-sonli qarori.
138. 0.212 gektar necha sm²?
Javob: Yechimi: 1 gektar = 10,000 m² = 100,000,000 sm². Demak, 0.212 * 100,000,000 = 21,200,000 sm².
21,200,000 sm².
139. Qurilishi tugallanmagan obyektlar ko‘chmas mulk hisoblanadimi?
Javob: Ha, qonunchilikka ko‘ra hisoblanadi.
140. Qaysi hukumat qaroriga asosan ko‘chmas mulk obyektlariga kadastr yig‘majildini tayyorlash tartibi to‘g‘risida nizom tasdiqlangan?
Javob: Vazirlar Mahkamasining 2021-yil 22-iyundagi 389-sonli qarorining 3-ilovasi bilan tasdiqlangan.
141. Yakka tartibdagi turar joy uchun kadastr yig‘majildini tayyorlash va uning natijasi bo‘yicha kadastr pasporti tayyorlash muddati qancha?
Javob: 5 ish kuni ichida.
142. Vazirlar Mahkamasining “Davlat kadastrlarini yuritish sohasini tartibga soluvchi ayrim normativ-huquqiy hujjatlarni tasdiqlash to‘g‘risida” gi qarorining 2-ILOVA sida qaysi nizom tasdiqlangan?
Javob: "Binolar va inshootlar davlat kadastrni yuritish tartibi to‘g‘risidagi nizom".
143. Vazirlar Mahkamasining “Kadastr sohasida ayrim davlat xizmatlari ko‘rsatishning ma’muriy reglamentlarini tasdiqlash to‘g‘risida” gi 535-sonli qarori qaysi normativ-huquqiy hujjat ijrosini ta’minlash maqsadida qabul qilingan?
Javob: O‘zbekiston Respublikasi Prezidentining 2019-yil 5-apreldagi PQ-4270-sonli ("Ko‘chmas mulk ob’ektlariga bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish tizimini yanada takomillashtirish chora-tadbursizlari to‘g‘risida"gi) qarori hamda sohaga oid boshqa islohotlar ijrosini ta’minlash uchun.
144. Noturar obyektning kadastr pasportini shakllantirish va davlat ro‘yxatidan o‘tkazish tranzaksiyasining “O‘lchov natijalarini kiritish” qadamidan “Yer uchastkasini yaratish” qadamiga o‘tishda yangi ko‘chmas mulk obyektlari uchun yuklanadigan majburiy hujjatlar ro‘yxatini ko‘rsating
Javob: Huquq belgilovchi hujjat (qaror/order), arxitektura-qurilish hujjatlari (loyiha hujjatlari yoki foydalanishga qabul qilish dalolatnomasi) va joydagi dala o‘lchov chizmalari (abris/konturlar).
145. Arizani rad qilish uchun tuman (shahar) filial boshlig‘iga yuborganda ushbu arizani tuman(shahar) filial boshlig‘i rad etmasdan jarayonga qaytarishi mumkinmi?
Javob: Ha, qaytarishi mumkin.
146. Davlat yer kadastri ma’lumotlari qanday turlarga bo‘linadi?
Javob: Grafik (fazoviy/xaritalar) ma’lumotlar va atributiv (matnli/huquqiy/miqdoriy va sifat ko‘rsatkichlari) ma’lumotlarga bo‘linadi.
147. Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazilganda qanday hujjat beriladi?
Javob: Davlat reestridan QR-kodli elektron ko‘chirma beriladi.
148. Ko‘p kvartirali uyda joy mulkdorining umumiy mol-mulkdagi ulushi asl holida ajratilishi mumkinmi?
Javob: Yo‘q, qonunchilikka (Uy-joy kodeksiga) ko‘ra, umumiy mol-mulkdagi ulush xonadon mulkdoridan alohida, asl holida ajratilishi yoki begonalashtirilishi mumkin emas.
149. Yer fondi nechta toifaga bo‘linadi?
Javob: 8 ta toifaga bo‘linadi.
150. Mulkdorining yoki uning ishonchnomasi asosida harakat qiluvchi shaxsning, shuningdek, mulkdor merosxo‘rining so‘roviga ko‘ra kadastr yig‘majildining nusxasi elektron shaklda taqdim etishi mumkinmi?
Javob: Ha, elektron tizim yoki Yagona portal orqali elektron nusxasi taqdim etilishi mumkin.
151. O‘zbekiston Respublikasi Vazirlar Mahkamasining 535 sonli qarori qachon qabul qilingan?
Javob: 2020-yil 2-sentabrda qabul qilingan.
152. Noturar joy maydoni 107 kv.m bo‘lgan ko‘chmas mulkni kadastr pasportini necha ish muddatida tayyorlanishi kerak?
Javob: Maydoni 100 m² dan 1000 m² gacha bo‘lganligi uchun 7 ish kuni ichida tayyorlanishi lozim.
153. Uchburchakning eng uzun tomoni va eng qisqa tomoni ayrmasini toping? [Rasmda to‘g‘ri burchakli uchburchak berilgan: gipotenuza = 13, asos = 12, balandlik = ?]
Javob: Yechish: Pifagor teoremasiga ko‘ra, balandlik = √(13² - 12²) = √(169 - 144) = √25 = 5. Eng uzun tomoni (gipotenuza) — 13, eng qisqa tomoni (balandlik) — 5. Ayirmasi: 13 - 5 = 8.
154. Hisoblang: 3 * ((2.5 - 0.5) + (2.5 + 2)) + 7.5 * 2 - 3.5 = ?
Javob: Yechimi: 3 * (2 + 4.5) + 15 - 3.5 = 3 * 6.5 + 11.5 = 19.5 + 11.5 = 31.
31.
155. Kadastr pasportni shakllantirilgandan so‘ng kadastr uchun to‘lov (xabarnoma) nomi qanaqa?
Javob: Invoys (To‘lov xabarnomasi).
156. Plastic shaklidagi kadastr pasportini tayyorini qayerdan olinadi?
Javob: Davlat xizmatlari markazidan (DXM) yoki hududiy Kadastr organidan olinadi (hozirda asosan elektron QR-kodli pasport beriladi).
157. Kadastr pasportini berish uchun undiriladigan to‘lov miqdorlari qaysi qarorga asosan belgilanadi?
Javob: Vazirlar Mahkamasining 2014-yil 10-iyuldagi 186-sonli qaroriga asosan.
158. Kadastr yig‘majildi (pasporti) yo‘qolganda (yaroqsiz holga kelganda va ko‘chmas mulk obyekti ko‘rsatkichlari o‘zgartirilmasdan) kadastr pasportni rasmiylashtirish necha ish muddatida tayyorlanishi belgilangan?
Javob: 3 ish kuni ichida (Dublikat berish tartibida).
159. Quyidagilarni qaysilari kadastr pasporti berishni rad etish uchun asos bo‘ladi?
Javob: Huquq belgilovchi hujjatlar taqdim etilmaganligi, to‘lov qilinmaganligi, arizada noto‘g‘ri ma’lumotlar ko‘rsatilganligi va obyektga nisbatan taqiq/sud cheklovi mavjudligi.
160. Vazirlar Mahkamasining 535 sonli qarorida Davlat xizmatlari markazlari va DK filiallari o‘z faoliyatini amalga oshirishi natijasida olingan ma’lumotlarning sir saqlanishini belgilanganmi?
Javob: Ha, belgilangan. Tijorat va xizmat siri hamda shaxsga doir ma’lumotlarning maxfiyligi qonun bilan himoya qilinadi.
161. Vazirlar Mahkamasining 535 sonli qarorida Reglament talablarni ijro qilish, muddatlarni o‘z vaqtida bajarish bo‘yicha Adliya tomonidan doimiy nazorat (monitoring) olib boriladimi?
Javob: Ha, olib boriladi. Adliya vazirligi davlat xizmatlari ko‘rsatilishini doimiy monitoring qiladi.
162. Agar har bir taxtaning eni 15 sm va ularning orasidagi masofasi 4 sm dan bo‘lsa, to‘siqning uzunligi nechaga teng? [Rasmda 4 ta taxta va ular orasida 3 ta bo‘shliq tasvirlangan]
Javob: Yechish: To‘siq uzunligi = (4 * 15) + (3 * 4) = 60 + 12 = 72 sm.
72 sm.
163. Kadastr pasportda tayyorlaganda uy-joy rejasi va topografik suratini joylashtirish mumkinmi?
Javob: Ha, kadastr pasporti tarkibiga obyektning chizmasi (etaj rejasi) va yer uchastkasining kadastr/topografik rejasi majburiy tartibda kiritiladi.
164. Vazirlar Mahkamasining 535 sonli qarorida Davlat siri bilan bog‘liq bo‘lgan ko‘chmas mulklarni kadastr pasportini tayyorlash o‘rniga qayerga murojaat qilish talab etiladi?
Javob: Maxsus ruxsatnomaga ega bo‘lgan vakolatli davlat organlariga yoki bevosita Davlat kadastrlari palatasining maxsus bo‘limiga (maxfiy rejimda).
165. Fuqaro yoki yuridik shaxs kadastr pasportni tayyorlash uchun qayerga murojaat qilishi mumkin?
Javob: Davlat xizmatlari markazlariga (DXM) bevosita borib yoki my.gov.uz portali orqali onlayn.
166. Kadastr pasportini shakllanishda arizachi YaIDXP orqali murojaat qilinganda qancha vaqtda kadastr idoralarida yuboriladi?
Javob: Avtomatik ravishda, ya’ni real vaqt rejimida (10-15 daqiqa ichida) kadastr organining tizimiga kelib tushadi.
167. Ko‘chmas mulk bir qismini begonalashtirilganda, obyektni qolgan qismiga murojaati asosida kadastr pasportini rasmiylashtirilganda to‘lov undiriladimi?
Javob: Ha, yangi pasport shakllantirilayotganligi sababli belgilangan tartibda to‘lov undiriladi.
168. Kadastr yig‘majildi (pasporti) yo‘qolganda (yaroqsiz holga kelganda va ko‘chmas mulk obyekti ko‘rsatkichlari o‘zgartirilmasdan) bo‘lsa, kadastr pasportini rasmiylashtirilganda to‘lov undiriladimi?
Javob: Ha, pasportni dublikat qibly qayta bosib berish/shakllantirish uchun bazaviy hisoblash miqdorining ma’lum bir foizida (kamaytirilgan qiymatda) to‘lov undiriladi.
169. Kadastr pasportni rasmiylashtirilgandi ariza beruvchi yoki uning vakili kelishilgan manzilda bo‘lmagan taqdirda kadastr pasportni rad qilishga asos bo‘ladimi?
Javob: Ha, agar kadastr xodimi joyiga o‘lchovga borganida ariza beruvchi bo‘lmasa va obyektni ko‘zdan kechirish imkoni bo‘lmasa, dalolatnoma tuzilib, ariza rad etiladi.
170. Vakolatli organ tomonidan kadastr pasportini rasmiylashtirish bo‘yicha ko‘chmas mulk obyektiga taqiq yoki xatlov qo‘yilganligi kadastr pasportni rad qilishga asos bo‘ladimi?
Javob: Ha, agar taqiq (sud yoki mib tomonidan) bo‘lsa, kadastr pasporti taqdim etilishi rad etilishi yoki to‘xtatilishi mumkin.
171. Ariza beruvchi davlat xizmatidan foydalanishdan uni ko‘rsatishning har qanday bosqichida bosh tortish huquqiga egami?
Javob: Ha, har qanday bosqichda ariza beruvchi o‘z arizasini qaytarib olish (bosh tortish) huquqiga ega.
172. Kadastr muhandisi tomonidan kadastr pasportni rasmiylashtirilgan vaqtda murojaatchi talab etilganda holda ko‘chmas mulk obyektining manzilini belgilash yoki o‘zgartirish huquqiga egami?
Javob: Yo‘q. Obyekt manzilini belgilash yoki o‘zgartirish tuman (shahar) hokimligi yoki arxitektura organlari (geografik ob’ektlarni nomlash tizimi) vakolatiga kiradi. Kadastr muhandisi faqat mavjud rasmiy manzilni kiritadi.
173. Kadastr shakllantirishda kadastr pasport uchun to‘lov summasi qaysi qaror asosida undiriladi?
Javob: Vazirlar Mahkamasining 186-sonli qarori asosida.
174. Qaysi shakl maydoni kattaroq? [Rasmda A, B, C, D harflari bilan belgilangan katakchalardan iborat shakllar ko‘rsatilgan]
Javob: Qaysi harfdagi shaklda to‘liq kataklar soni ko‘p bo‘lsa, o‘sha shaklning maydoni eng kattasi bo‘ladi.
175. Ismoilov yer uchastkasini to‘rt qismiga ajratdi, uchastkalarining qaysi bo‘lagi kichikroq? [Rasmda to‘rtburchakli to‘rtta zona A, B, C, D koordinata o‘qlari bo‘yicha bo‘lingan]
Javob: Koordinata o‘qlarining kesishish nuqtalariga ko‘ra eng kichik to‘rtburchak maydonga ega bo‘lgan zona (masalan, grafikda eng kichik ko‘ringan segment) to‘g‘ri javob bo‘ladi.
176. O‘zbekiston Respublikasi Vazirlar Mahkamasining 2021-yil 22-iyundagi 389-sonli qarori qaysi normativ-huquqiy hujjatlarning ijrosini ta’minlash maqsadida qabul qilingan?
Javob: Prezidentining PF-6061-son va PQ-4819-sonli qarorlari ijrosini ta’minlash maqsadida.
177. Vazirlar Mahkamasining “Davlat kadastrlarini yuritish sohasini tartibga soluvchi ayrim normativ-huquqiy hujjatlarni tasdiqlash to‘g‘risida” gi qarorining 2-ILOVA sida qaysi nizom tasdiqlangan?
Javob: "Binolar va inshootlar davlat kadastrni yuritish tartibi to‘g‘risidagi nizom".
178. Vazirlar Mahkamasining “Kadastr sohasida ayrim davlat xizmatlari ko‘rsatishning ma’muriy reglamentlarini tasdiqlash to‘g‘risida” qarori qachon qabul qilingan?
Javob: 2020-yil 2-sentabrda (535-son qaror).
179. Vazirlar Mahkamasining 2020-yil 2-sentabrdagi 535-son qaroriga muvofiq Malaka imtihonida nechta savol va qancha vaqt beriladi?
Javob: 50 ta savol va 45 daqiqa beriladi.
180. Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish to‘g‘risidagi O‘RQ-803-sonli qonun ko‘chmas mulkning qaysi turlariga bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazishga nisbatan tatbiq etilmaydi?
Javob: Kosmik obyektlar, havo va dengiz kemalari hamda yer osti boyliklariga nisbatan.
181. Quyidagi javoblardan qaysi biri kompyuter tizimidagi axborot xavfsizligi tahdidlari hisoblanadi?
Javob: Troyanlar, josuslik dasturlari (spyware) va tizimdagi zaifliklar (vulnerabilities) orqali amalga oshiriladigan xakerlik hujumlari.
182. Kiberxavfsizlik to‘g‘risidagi qonun qachon qabul qilingan?
Javob: 2022-yil 15-aprelda (O‘RQ-764-son).
183. Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish sohasida maxsus vakolatli davlat organi-?
Javob: Kadastr agentligi hamda Davlat kadastrlari palatasi.
184. Kadastr pasporti bu-?
Javob: Ko‘chmas mulk obyektining shakllantirilgan texnik va kadastr ko‘rsatkichlari majmuidir.
185. Ko‘chmas mulkni texnik inventarizatsiyadan o‘tkazish -?
Javob: Obyekt parametrlarini joyida ashyoviy va texnik jihatdan o‘lchash va aniqlash jarayonidir.
186. Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazishning asosiy prinsiplari to‘g‘ri ko‘rsatilgan qatorni belgilang?
Javob: Qonuniylik, majburiylik, ishonchlilik, ochiqlik.
187. Ko‘chmas mulkdagi fazoviy obyektlar qaysi qadamda yaratiladi?
Javob: GIS tizimida xaritaga ma’lumot va kontur kiritish (Fazoviy shakllantirish) qadamida.
188. Vazirlar Mahkamasining 389-qaroriga asosan Ko‘chmas mulkning kadastr yig‘majildini shakllantirish uchun asoslar noto‘g‘ri keltirilgan javobni toping ?
Javob: Jismoniy shaxsning hech qanday hujjatsiz, og‘zaki asossiz talabi.
189. Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazishni rad etish asoslari noto‘g‘ri ko‘rsatilgan javobni toping.
Javob: Obyekt egasining doimiy yashash joyi respublikadan tashqarida ekanligi sababli rad etish (bu qonuniy asos emas).
190. Davlat yer kadastrining tarkibiy qismlari, davlat yer kadastrini yuritishning asosiy prinsiplari hamda davlat yer kadastrini yuritishda Davlat kadastrlari palatasi va uning hududiy boshqarmalarining vazifalarini nazarda tutuvchi Davlat yer kadastrini yuritish tartibi to‘g‘risidagi nizom qaysi ilovaga muvofiq tasdiqlangan?
Javob: Vazirlar Mahkamasining 389-sonli qarorining 1-ilovasiga muvofiq.
191. Ko‘chmas mulk obyektiga tayyorlangan kadastr yig‘majildi natijasi bo‘yicha mulkdorga yoki uning ishonchnomasi asosida harakat qiluvchi shaxsga, shuningdek, mulkdorning merosxo‘riga qanday hujjat taqdim etiladi?
Javob: QR-kodli rasmiy Kadastr pasporti.
192. Davlat yer kadastri ma’lumotlari qanday turlarga bo‘linadi?
Javob: Grafik va matnli (atributiv) ma’lumotlarga bo‘linadi.
193. Vazirlar Mahkamasining 2021-yil 22-iyundagi 389-son qaroriga 2-ilovasi nizomi qaysi tartibni belgilaydi?
Javob: "Binolar va inshootlar davlat kadastrini yuritish tartibi"ni belgilaydi.
194. Kadastr yig‘majildining muqovasi va tarkibidagi elektron axborot tizimida shakllanadigan ma’lumotlarning namunaviy jadvallari, qaydnomalari va blankalari shakllarini tasdiqlash haqida O‘zbekiston Respublikasi Davlat soliq qo‘mitasi huzuridagi Kadastr agentligi direktorining buyrug‘i Adliya vazirligi tomonidan ro‘yxatdan o‘tkazilgan sanasi va ro‘yxat raqami?
Javob: Kadastr agentligi direktorining buyrug‘i Adliya vazirligi tomonidan 2021-yil noyabr/dekabr oylarida tegishli maxsus reestr raqami bilan davlat ro‘yxatidan o‘tkazilgan (Yagona ichki me’yoriy hujjatlar tasniflagich raqami bilan).
`;

// Original 1 to 50 questions
const seedFileContent = fs.readFileSync('backend/src/prisma/seed.js', 'utf8');

// We will parse the raw new questions
const newFlashcards = [];
const linesOfRequest = rawNewQuestions.split('\n');
let currentNum = null;
let currentQuestion = '';
let currentAnswer = '';
let isParsingAnswer = false;

for (let line of linesOfRequest) {
  line = line.trim();
  if (!line) continue;

  const qMatch = line.match(/^(\d+)\.\s+(.+)$/);
  if (qMatch) {
    if (currentNum !== null && currentQuestion && currentAnswer) {
      newFlashcards.push({
        number: parseInt(currentNum),
        question: currentQuestion.trim(),
        answer: currentAnswer.trim()
      });
    }
    currentNum = qMatch[1];
    currentQuestion = qMatch[2];
    currentAnswer = '';
    isParsingAnswer = false;
    continue;
  }

  if (line.startsWith('Javob:')) {
    isParsingAnswer = true;
    currentAnswer = line.substring(6).trim();
    continue;
  }

  if (currentNum !== null) {
    if (isParsingAnswer) {
      currentAnswer += ' ' + line;
    } else {
      currentQuestion += ' ' + line;
    }
  }
}

if (currentNum !== null && currentQuestion && currentAnswer) {
  newFlashcards.push({
    number: parseInt(currentNum),
    question: currentQuestion.trim(),
    answer: currentAnswer.trim()
  });
}

console.log(`Parsed ${newFlashcards.length} new flashcards.`);

// Helper to determine category, difficulty and tags for 51-194
function categorize(card) {
  const q = card.question.toLowerCase();
  const a = card.answer.toLowerCase();
  let category = 'Kadastr tizimi';
  let tags = 'kadastr';
  let difficulty = 'medium';

  if (q.includes('terrasa') || q.includes('balkon') || q.includes('chordoq') || q.includes('mansarda') || q.includes('yerto‘la') || q.includes('yertola') || q.includes('tambur') || q.includes('veranda') || q.includes('bino') || q.includes('imorat') || q.includes('inshoot') || q.includes('devor') || q.includes('xona') || q.includes('plintus') || q.includes('zina')) {
    category = 'Bino va inshootlar';
    tags = 'bino,inshoot,qurilish';
    difficulty = q.includes('koeffitsient') || q.includes('balandlik') || q.includes('hajm') ? 'hard' : 'medium';
  } else if (q.includes('yer') || q.includes('gektar') || q.includes('toifa') || q.includes('sug‘oriladigan') || q.includes('sugoriladigan') || q.includes('fond')) {
    category = 'Yer munosabatlari';
    tags = 'yer,yer fondi,sug\'orish';
    difficulty = q.includes('gektar') || q.includes('km²') || q.includes('sm²') ? 'hard' : 'medium';
  } else if (q.includes('hisoblang') || q.includes('eng uzun tomoni') || q.includes('uchburchak') || q.includes('taxta') || q.includes('to‘siq') || q.includes('tosiq') || q.includes('maydoni kattaroq') || q.includes('kichikroq')) {
    category = 'Matematika';
    tags = 'matematika,hisob,geometriya';
    difficulty = 'easy';
  } else if (q.includes('axborot xavfsizligi') || q.includes('himoya') || q.includes('vpn') || q.includes('tahdid') || q.includes('virus') || q.includes('hujum') || q.includes('kiberxavfsizlik') || q.includes('fishing') || q.includes('ddos') || q.includes('mitm')) {
    category = 'Axborot xavfsizligi';
    tags = 'xavfsizlik,kiberxavfsizlik,vpn';
    difficulty = 'medium';
  } else if (q.includes('malaka') || q.includes('imtihon') || q.includes('savol') || q.includes('vaqt') || q.includes('daqiqa')) {
    category = 'Imtihon';
    tags = 'imtihon,savollar,vaqt';
    difficulty = 'easy';
  } else if (q.includes('qonun') || q.includes('qaror') || q.includes('nizom') || q.includes('reglament') || q.includes('kodeks') || q.includes('o‘rq') || q.includes('orq') || q.includes('prezident') || q.includes('vazirlar mahkamasi') || q.includes('adliya')) {
    category = 'Qonunchilik';
    tags = 'qonun,qaror,nizom';
    difficulty = 'hard';
  } else if (q.includes('kadastr pasporti') || q.includes('pasport') || q.includes('invoys') || q.includes('to‘lov') || q.includes('tolov') || q.includes('dublikat') || q.includes('yo‘qolganda') || q.includes('yoqolganda')) {
    category = 'Kadastr pasporti';
    tags = 'kadastr pasporti,invoys,to\'lov';
    difficulty = 'medium';
  } else if (q.includes('xizmat') || q.includes('portal') || q.includes('my.gov.uz') || q.includes('yaidxp') || q.includes('dxm') || q.includes('murojaat')) {
    category = 'Davlat xizmatlari';
    tags = 'davlat xizmatlari,portal,my.gov.uz';
    difficulty = 'easy';
  } else if (q.includes('yig‘majildi') || q.includes('yigmajildi') || q.includes('raqam') || q.includes('zona') || q.includes('massiv') || q.includes('mavze')) {
    category = 'Kadastr tizimi';
    tags = 'yig\'majildi,kadastr raqami,tizim';
    difficulty = 'medium';
  }

  return {
    question: card.question,
    answer: card.answer,
    category,
    difficulty,
    tags
  };
}

// Extract existing flashcards array from seed.js
// We can find where the flashcards array starts and ends using standard regex or searching.
const startIdx = seedFileContent.indexOf('const flashcards = [');
const endIdx = seedFileContent.indexOf('];', startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find flashcards array in existing seed.js');
  process.exit(1);
}

// Let's parse the existing 1-50 flashcards using eval or just getting the exact string content.
// Since we want to be safe, we can just extract the flashcards from lines 1 to 50 in seed.js.
// Or we can parse the content inside `const flashcards = [ ... ]` by using JS parsing.
const flashcardsString = seedFileContent.substring(startIdx + 19, endIdx + 1);

// We can compile the string of the array into a JS array
let existingFlashcards = [];
try {
  existingFlashcards = eval('[' + flashcardsString + ']');
  console.log(`Successfully parsed ${existingFlashcards.length} existing flashcards.`);
} catch (e) {
  console.error('Error evaluating existing flashcards:', e);
  process.exit(1);
}

// Convert new cards to database objects
const formattedNewCards = newFlashcards.map(categorize);

// Join existing and new cards
const allFlashcards = [...existingFlashcards, ...formattedNewCards];
console.log(`Total combined flashcards: ${allFlashcards.length}`);

// Write a clean, new seed.js
const newSeedContent = `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const flashcards = ${JSON.stringify(allFlashcards, null, 2)};

async function main() {
  console.log('Seeding database with default flashcards...');
  
  // Clear existing cards to prevent duplicates on re-run
  await prisma.flashcard.deleteMany({
    where: {
      userId: null // Only delete global cards
    }
  });

  for (const card of flashcards) {
    await prisma.flashcard.create({
      data: card
    });
  }

  console.log(\`Successfully seeded \${flashcards.length} flashcards!\`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

fs.writeFileSync('backend/src/prisma/seed.js', newSeedContent, 'utf8');
console.log('Successfully updated backend/src/prisma/seed.js!');
