# WARISAN NUSANTARA
## Product Requirements Document + Technical Specification + Implementation Plan

> Dokumen ini adalah sumber kebenaran utama (single source of truth) untuk pengembangan **Warisan Nusantara**, sebuah website interaktif untuk layar sentuh vertikal di GIK UGM.
>
> Dokumen ini ditulis agar dapat langsung digunakan sebagai konteks kerja di **Cursor, Codex, Antigravity, atau AI coding agent lain**.
>
> **Status:** MVP Specification  
> **Tim:** Fairuz & Fadil  
> **Target platform:** Vertical touchscreen kiosk di GIK UGM  
> **Target waktu:** sekitar 1 minggu  
> **Bahasa aplikasi:** Bahasa Indonesia + English  
> **Mode aplikasi:** Offline-first, tanpa backend wajib

---

# 1. Ringkasan Produk

**Warisan Nusantara** adalah website interaktif berbasis touchscreen yang memungkinkan pengunjung GIK UGM menjelajahi kekayaan budaya dari **38 provinsi Indonesia**.

Website bukan sekadar halaman informasi biasa, tetapi dirancang seperti **interactive digital exhibition / kiosk application**.

Pengunjung dapat:

1. Melihat attract screen.
2. Menyentuh layar untuk mulai.
3. Melihat peta Indonesia.
4. Memilih salah satu dari 38 provinsi.
5. Melihat informasi provinsi.
6. Memilih kategori budaya.
7. Membuka koleksi budaya.
8. Membuka detail budaya.
9. Mengganti bahasa Indonesia / English.
10. Memindai QR Code jika tersedia untuk menuju halaman shop dari perangkat pribadi.

Aplikasi tidak menggunakan audio, video interaktif, mini game, culture passport, pencarian, keyboard virtual, login, akun pengguna, maupun fitur AI.

---

# 2. Tujuan Produk

Tujuan utama:

- Memperkenalkan kekayaan budaya Indonesia dengan cara yang visual dan interaktif.
- Memanfaatkan layar sentuh vertikal sebagai media pameran.
- Membuat navigasi yang dapat dimengerti dalam beberapa detik.
- Menampilkan informasi 38 provinsi secara konsisten.
- Tetap dapat digunakan ketika kiosk tidak memiliki koneksi internet.
- Memberikan jalur dari pengalaman pameran menuju halaman shop melalui QR Code.
- Memberikan pengalaman yang nyaman untuk pengguna Bahasa Indonesia dan pengunjung berbahasa Inggris.

---

# 3. Batasan dan Keputusan Utama

## 3.1 Yang WAJIB dibuat

MVP:

- [x] Attract Screen
- [x] Indonesia Interactive Map
- [x] 38 Provinces
- [x] Province Detail
- [x] Categories
- [x] Culture Collection
- [x] Culture Detail
- [x] QR Code menuju shop
- [x] Bahasa Indonesia
- [x] English
- [x] Touch-friendly navigation
- [x] Idle reset ke Attract Screen
- [x] Offline-first/local kiosk deployment

## 3.2 Yang TIDAK dibuat

Jangan implementasikan fitur berikut kecuali requirement berubah:

- Search
- Custom keyboard
- Audio
- Voice narration
- Mini game
- Quiz
- Tebak gambar
- Culture Passport
- User account
- Login/Register
- Favorites
- Comments
- Social features
- AI chatbot
- Supabase
- CMS
- Admin dashboard
- Online database wajib
- Real-time API

Scope harus dijaga. Deadline singkat membuat fitur tambahan menjadi cara yang sangat efisien untuk menghasilkan banyak bug sekaligus.

---

# 4. Target Pengguna

Pengguna utama:

- Pengunjung GIK UGM
- Mahasiswa
- Pelajar
- Masyarakat umum
- Wisatawan
- Pengunjung internasional

Karakteristik penggunaan:

- Pengguna berdiri di depan layar.
- Interaksi menggunakan sentuhan, bukan mouse.
- Sesi penggunaan relatif singkat.
- Pengguna baru tidak boleh membutuhkan tutorial panjang.
- Pengguna dapat meninggalkan aplikasi kapan saja.
- Pengguna berikutnya harus mendapatkan kondisi aplikasi yang bersih.

---

# 5. Platform dan Hardware

Sebelum finalisasi desain, cari dan catat spesifikasi kiosk GIK UGM:

- Resolusi layar
- Ukuran fisik layar
- Orientasi layar
- Sistem operasi
- Browser
- Single-touch atau multi-touch
- CPU
- RAM
- GPU
- Dukungan fullscreen/kiosk mode
- Ketersediaan internet
- Apakah komputer kiosk dapat menjalankan local HTTP server
- Jam penggunaan per hari

## Asumsi sementara

Sampai data sebenarnya didapatkan:

- Orientation: portrait
- Browser: Chromium / Chrome / Edge
- Input utama: touch
- Website harus tetap berjalan tanpa internet
- Resolusi desain awal boleh menggunakan rasio 9:16
- Layout harus responsive terhadap beberapa resolusi portrait

Jangan mengunci aplikasi hanya pada satu resolusi menggunakan pixel absolut.

---

# 6. Arsitektur yang Dipilih

## 6.1 Keputusan

Untuk MVP ini **tidak menggunakan Supabase**.

Arsitektur:

```text
Local Content
     |
     |-- JSON / TypeScript data
     |-- Images WebP / AVIF
     |-- Indonesia SVG Map
     |
     v
React + Vite Application
     |
     v
Vite Production Build
     |
     v
Local Static HTTP Server
     |
     v
Chrome / Edge Kiosk Mode
```

Aplikasi kiosk dapat berjalan tanpa internet.

Internet hanya diperlukan oleh **HP pengguna** setelah mereka memindai QR Code dan membuka halaman shop.

---

# 7. Alasan Tidak Menggunakan Supabase

Supabase sebenarnya dapat digunakan, tetapi tidak dibutuhkan untuk kebutuhan MVP ini.

Alasannya:

1. Konten bersifat dominan read-only.
2. Tidak ada login.
3. Tidak ada akun pengguna.
4. Tidak ada fitur real-time.
5. Tidak ada admin dashboard dalam scope.
6. Website harus tetap bisa digunakan offline.
7. Aset gambar akan jauh lebih besar daripada data teks.
8. Mengambil semua konten dari internet membuat kiosk memiliki dependency terhadap koneksi.
9. Deadline pendek.
10. Dua orang anggota tim lebih baik fokus pada pengalaman pengguna dan kelengkapan konten.

Pada Free Plan Supabase saat dokumen ini dibuat tersedia sekitar:

- 500 MB database
- 1 GB file storage
- 5 GB egress
- Free project dapat dipause setelah periode tidak aktif

Karena itu menyimpan ratusan gambar pameran pada Supabase Free bukan pilihan terbaik untuk kiosk offline-first.

Database teks sendiri sebenarnya tidak akan cepat penuh. Yang lebih berpotensi menjadi masalah adalah file storage dan egress gambar.

---

# 8. Bagaimana Kiosk Mengambil Data Tanpa Database?

Data disimpan bersama source code aplikasi.

Contoh:

```text
src/
└── data/
    ├── provinces.ts
    └── cultures/
        ├── aceh.ts
        ├── bali.ts
        ├── di-yogyakarta.ts
        └── ...
```

atau menggunakan JSON:

```text
src/
└── data/
    ├── provinces.json
    └── cultures.json
```

Gambar:

```text
public/
└── assets/
    └── cultures/
        ├── aceh/
        ├── bali/
        ├── di-yogyakarta/
        └── ...
```

Saat menjalankan:

```bash
npm run build
```

Vite menghasilkan aplikasi production di:

```text
dist/
```

Folder `dist` dibawa ke komputer kiosk.

Kiosk menjalankan aplikasi dari local HTTP server.

Tidak ada request database untuk membuka halaman budaya.

---

# 9. Strategi Offline

## Recommended

Gunakan **local production build** sebagai sumber utama kiosk.

Jangan bergantung pada PWA cache sebagai satu-satunya mekanisme offline.

Deployment:

```text
Project
   |
npm run build
   |
   v
dist/
   |
Local static server
   |
http://localhost:4173
   |
Chrome --kiosk
```

Keuntungan:

- Tidak tergantung internet.
- Tidak tergantung Supabase.
- Tidak tergantung Vercel.
- Semua gambar tersedia lokal.
- Waktu loading lebih konsisten.
- Tidak ada risiko API down saat pameran.

## Online copy

Versi yang sama boleh tetap di-deploy ke:

- Vercel
- Cloudflare Pages
- Netlify

Namun versi online adalah salinan/deployment tambahan, bukan dependency kiosk.

---

# 10. QR Handoff

QR Code tidak membutuhkan Supabase.

Setiap culture item dapat memiliki:

```ts
shopUrl?: string
```

Contoh:

```ts
{
  id: "batik-kawung",
  name: {
    id: "Batik Kawung",
    en: "Kawung Batik"
  },
  shopUrl: "https://example.com/shop/batik-kawung"
}
```

Aplikasi membuat QR dari URL tersebut.

Alurnya:

```text
Kiosk
  |
User membuka Culture Detail
  |
Tap "Lihat Produk"
  |
QR muncul
  |
Pengunjung scan menggunakan HP
  |
HP membuka halaman shop
```

Kiosk sendiri tidak perlu membuka shop.

Jika `shopUrl` kosong, tombol QR harus disembunyikan.

---

# 11. CMS: Apa Itu dan Apakah Dibutuhkan?

CMS = **Content Management System**.

WordPress adalah salah satu CMS, tetapi CMS tidak selalu berarti WordPress.

Contoh CMS:

- WordPress
- Strapi
- Sanity
- Directus
- Contentful

Headless CMS menyediakan dashboard untuk mengelola konten, sedangkan frontend React mengambil konten melalui API.

Untuk proyek ini:

**JANGAN menggunakan CMS pada MVP.**

Alasan:

- Deadline singkat.
- Hanya dua developer.
- Tidak ada kebutuhan admin rutin.
- Konten dapat disimpan sebagai JSON/TypeScript.
- CMS menambah backend, API, authentication, deployment dan potensi error.

Jika proyek dilanjutkan setelah pameran dan konten perlu sering diperbarui oleh non-programmer, CMS dapat ditambahkan pada fase selanjutnya.

---

# 12. Tech Stack Final

## Core

```text
React
Vite
TypeScript
```

## Styling

```text
Tailwind CSS
```

## Animation

Gunakan **Motion for React**, penerus resmi Framer Motion.

Package:

```bash
npm install motion
```

Import:

```ts
import { motion, AnimatePresence } from "motion/react";
```

## Routing

```text
react-router-dom
```

Untuk kiosk offline/local deployment, direkomendasikan memakai:

```text
HashRouter
```

Contoh route:

```text
/#/
/#/explore
/#/province/di-yogyakarta
/#/province/di-yogyakarta/batik
/#/culture/batik-kawung
```

HashRouter dipilih karena lebih tahan terhadap konfigurasi static server sederhana.

## Icon

```text
lucide-react
```

## QR

Recommended:

```text
react-qr-code
```

## Map

Custom local SVG Indonesia map.

Tidak menggunakan Google Maps.

## Font

```text
Poppins
```

Sebaiknya font disimpan secara lokal jika lisensi memungkinkan, sehingga aplikasi kiosk tidak bergantung pada Google Fonts ketika offline.

---

# 13. Dependency Minimal

Contoh:

```bash
npm create vite@latest warisan-nusantara -- --template react-ts

cd warisan-nusantara

npm install

npm install react-router-dom
npm install motion
npm install lucide-react
npm install react-qr-code
```

Ikuti setup Tailwind CSS untuk versi yang dipakai di project.

Jangan menambahkan library baru jika fitur dapat dibuat sederhana dengan React/CSS bawaan.

---

# 14. Interactive Indonesia Map

## Rekomendasi utama

Gunakan SVG:

**Wikimedia Commons — Provinces of Indonesia.svg**

Sumber:

https://commons.wikimedia.org/wiki/File:Provinces_of_Indonesia.svg

Kelebihan:

- SVG.
- Memiliki provincial boundaries.
- Setiap path provinsi memiliki ID/class.
- Dapat dimanipulasi menggunakan JavaScript/CSS.
- Ukuran file sekitar 229 KB sebelum optimasi.
- Cocok dijadikan interactive map.
- Dapat disimpan lokal.

Lisensi:

```text
CC BY-SA 4.0
```

Wajib memberikan attribution sesuai lisensinya.

## Alternatif

Dataset GeoJSON / TopoJSON 38 provinsi:

https://github.com/denyherianto/indonesia-geojson-topojson-maps-with-38-provinces

Repository tersebut menyediakan:

```text
GeoJSON ≈ 254 KB
TopoJSON ≈ 49 KB
38 provinsi
```

Untuk MVP ini tetap direkomendasikan **SVG**, karena lebih mudah membuat interaksi tap per provinsi tanpa menambahkan Leaflet/D3.

---

# 15. Implementasi Map

Simpan:

```text
src/assets/maps/indonesia-provinces.svg
```

Idealnya SVG diproses menjadi component:

```text
src/components/map/IndonesiaMap.tsx
```

Konsep:

```tsx
<svg viewBox="...">
  <path
    id="ID-AC"
    onClick={() => navigate("/province/aceh")}
  />

  <path
    id="ID-YO"
    onClick={() => navigate("/province/di-yogyakarta")}
  />
</svg>
```

Jangan bergantung pada hover.

State:

```ts
selectedProvince
pressedProvince
```

Interaction:

```text
Tap
→ visual feedback
→ province highlight
→ navigate / open province card
```

Touch target pulau/provinsi kecil harus dipikirkan.

Untuk provinsi yang terlalu kecil secara visual, boleh dibuat:

- enlarged invisible hit area,
- marker,
- label,
- atau offset button,

tanpa mengubah bentuk peta utamanya secara menyesatkan.

---

# 16. Warna

Design palette utama:

## Bone / Putih Tulang

```css
#F8F0E5
```

Digunakan untuk:

- main background
- card surface ringan
- content background

## Dark Green / Hijau Tua

```css
#1A3C1A
```

Digunakan untuk:

- primary button
- title
- map active state
- navigation
- strong accents

## Brown / Cokelat

Recommended:

```css
#7A4E2D
```

Digunakan untuk:

- secondary accent
- border
- cultural decorative elements
- icon highlight

## Neutral tambahan

```css
--text-primary: #1D1D1B;
--text-muted: #6F6A63;
--surface: #FFFDF9;
--border: #D8CBBE;
```

Brown dapat diganti jika tim sudah memiliki kode warna resmi.

---

# 17. Tailwind Theme Concept

Gunakan token warna, jangan menyebarkan hex value di puluhan component.

Konsep:

```css
@theme {
  --color-bone: #F8F0E5;
  --color-forest: #1A3C1A;
  --color-brown: #7A4E2D;
}
```

Component memakai semantic naming bila memungkinkan.

---

# 18. Typography

Font utama:

```text
Poppins
```

Hierarchy contoh:

```text
Display:
Poppins 700

Heading:
Poppins 600

Body:
Poppins 400

Button:
Poppins 500 / 600
```

Jangan menggunakan terlalu banyak weight.

Untuk touchscreen:

- teks harus dapat dibaca dari jarak sedikit lebih jauh dibanding mobile biasa,
- hindari body text terlalu kecil,
- hindari paragraf terlalu panjang.

---

# 19. Design Principles

## 19.1 Touch first

Website didesain untuk jari, bukan cursor mouse.

## 19.2 Visual first

Gunakan gambar besar dan informasi ringkas.

## 19.3 Minimal cognitive load

Pengguna harus tahu tindakan selanjutnya tanpa penjelasan.

## 19.4 Consistent navigation

Posisi tombol Back/Home/Language jangan berubah secara liar antarhalaman.

## 19.5 No hover dependency

Hover boleh menjadi enhancement pada desktop development, tetapi tidak boleh menjadi satu-satunya cara mendapatkan informasi.

## 19.6 Fast feedback

Setiap tap harus memberi feedback visual.

Contoh:

```text
scale 1 -> 0.97 -> 1
```

---

# 20. Recommended Screen Flow

```text
Attract Screen
      |
      v
Indonesia Map
      |
      v
Province Detail
      |
      v
Category
      |
      v
Culture Collection
      |
      v
Culture Detail
      |
      +----> QR Modal
```

Language toggle tersedia pada screen utama yang relevan.

---

# 21. Screen 1: Attract Screen

Tujuan:

Menarik perhatian dan menjelaskan dalam satu pandangan bahwa layar dapat disentuh.

Elemen:

- Logo / branding Warisan Nusantara
- Visual Indonesia
- Judul
- Subtitle
- CTA besar
- Language selector

Contoh:

```text
WARISAN NUSANTARA

Jelajahi Kekayaan Budaya Indonesia

[ SENTUH UNTUK MENJELAJAH ]

ID | EN
```

Animation:

- subtle floating decorative element
- slow background movement
- gentle CTA pulse

Jangan gunakan animasi agresif.

Tap area CTA harus besar.

---

# 22. Screen 2: Indonesia Map

Elemen:

- Header
- Home
- Language toggle
- Heading
- Instruction text
- Interactive SVG Indonesia map
- Optional selected province label

Contoh:

```text
Jelajahi Nusantara

Sentuh provinsi yang ingin kamu jelajahi.

[ INTERACTIVE MAP ]

DI YOGYAKARTA
[ Jelajahi ]
```

Flow yang direkomendasikan:

```text
tap province
→ province diberi highlight
→ panel/card provinsi muncul
→ tap Jelajahi
→ Province Detail
```

Alternatif:

langsung membuka Province Detail saat provinsi disentuh.

Untuk menghindari accidental tap pada peta, versi dua langkah lebih aman.

---

# 23. Screen 3: Province Detail

Data utama:

- Nama provinsi
- Hero image
- Pulau/wilayah
- Deskripsi singkat
- Category cards

Contoh:

```text
DI YOGYAKARTA

[ HERO ]

Provinsi dengan kekayaan seni, tradisi,
kuliner, kriya dan warisan budaya...

Jelajahi Budaya

[ Seni & Kriya ]
[ Tari         ]
[ Musik        ]
[ Busana       ]
[ Rumah Adat   ]
[ Kuliner      ]
[ Tradisi      ]
```

Tidak semua provinsi harus memiliki jumlah item sama.

Category yang kosong tidak ditampilkan.

---

# 24. Recommended Culture Categories

Gunakan kategori yang cukup universal terhadap 38 provinsi.

Recommended:

```text
seni-kriya
tari
musik
busana
rumah-adat
kuliner
tradisi
kain-tradisional
```

Label:

```ts
{
  id: "kain-tradisional",
  name: {
    id: "Kain & Tekstil Tradisional",
    en: "Traditional Textiles"
  }
}
```

Jika ada kebutuhan khusus, kategori dapat disesuaikan.

Jangan membuat kategori "Batik" sebagai kategori global jika daerah tersebut lebih tepat memiliki songket, ulos, tenun, sasirangan, dan sebagainya.

Gunakan kategori yang menghormati keragaman tradisi lokal.

---

# 25. Screen 4: Culture Collection

Menampilkan culture item sesuai provinsi + kategori.

Contoh:

```text
DI YOGYAKARTA
Kain & Tekstil Tradisional

[ Kawung ] [ Parang  ]
[ Truntum] [ Tambal  ]
```

Card:

- image
- item name
- optional short label

Interaksi:

```text
tap card
→ tap feedback
→ Culture Detail
```

---

# 26. Screen 5: Culture Detail

Elemen:

- Back
- Home
- Language
- Hero image
- Culture name
- Province
- Category
- Short description
- Main description
- Optional fact
- QR CTA jika shopUrl tersedia

Contoh:

```text
BATIK KAWUNG

[ LARGE IMAGE ]

DI Yogyakarta
Kain & Tekstil Tradisional

Batik Kawung adalah...

[ Lihat Produk / View Product ]
```

Tap CTA:

```text
QR Modal
```

---

# 27. QR Modal

Elemen:

```text
Pindai QR untuk melihat produk

[ QR CODE ]

Batik Kawung

Gunakan kamera pada ponsel Anda.

[ Tutup ]
```

Jangan menampilkan URL panjang sebagai fokus utama.

QR harus memiliki contrast tinggi.

Test QR menggunakan beberapa jenis HP.

---

# 28. Language System

Supported languages:

```ts
type Language = "id" | "en";
```

Global state sederhana:

```ts
const [language, setLanguage] = useState<Language>("id");
```

Bisa menggunakan Context:

```text
LanguageContext
```

Tidak perlu Redux.

Contoh data:

```ts
type LocalizedText = {
  id: string;
  en: string;
};
```

---

# 29. Data Model

## Province

```ts
export interface Province {
  id: string;
  code: string;

  name: LocalizedText;

  island: LocalizedText;

  description: LocalizedText;

  heroImage: string;

  categories: string[];
}
```

Contoh:

```ts
{
  id: "di-yogyakarta",
  code: "ID-YO",

  name: {
    id: "DI Yogyakarta",
    en: "Special Region of Yogyakarta"
  },

  island: {
    id: "Jawa",
    en: "Java"
  },

  description: {
    id: "Daerah Istimewa Yogyakarta...",
    en: "The Special Region of Yogyakarta..."
  },

  heroImage: "/assets/provinces/di-yogyakarta/hero.webp",

  categories: [
    "seni-kriya",
    "tari",
    "musik",
    "kuliner",
    "kain-tradisional"
  ]
}
```

---

# 30. Culture Data Model

```ts
export interface CultureItem {
  id: string;

  provinceId: string;

  categoryId: string;

  name: LocalizedText;

  shortDescription: LocalizedText;

  description: LocalizedText;

  fact?: LocalizedText;

  image: string;

  images?: string[];

  imageAlt: LocalizedText;

  shopUrl?: string;

  sourceUrl?: string;

  imageSourceUrl?: string;
}
```

---

# 31. Source Tracking

Walaupun source tidak harus memenuhi layar utama, tetap simpan provenance.

Setiap culture item idealnya mempunyai:

```text
sourceUrl
imageSourceUrl
```

Tujuan:

- verifikasi informasi,
- mempermudah koreksi,
- dokumentasi,
- copyright checking.

Prioritas sumber:

1. Website pemerintah
2. Kemendikbud / kementerian terkait
3. Pemerintah daerah
4. Museum
5. Institusi budaya
6. UNESCO
7. Jurnal
8. Wikimedia Commons untuk media berlisensi
9. Sumber kredibel lain

Hindari copy-paste artikel random tanpa sumber.

---

# 32. Data yang Harus Dicari untuk 38 Provinsi

Untuk setiap provinsi cari:

## Province level

- Nama provinsi
- English name
- Pulau/wilayah
- Deskripsi singkat ID
- Deskripsi singkat EN
- Hero image
- Image source

## Culture level

Untuk setiap item:

- Nama
- English name jika diperlukan
- Category
- Deskripsi singkat ID
- Deskripsi singkat EN
- Deskripsi utama ID
- Deskripsi utama EN
- Gambar
- Alt text ID
- Alt text EN
- Source informasi
- Source gambar
- Shop URL jika tersedia

---

# 33. Content Quantity Strategy

Deadline pendek berarti jangan memaksa terlalu banyak culture item.

Prioritaskan:

```text
2-4 item berkualitas per kategori yang tersedia
```

daripada:

```text
10 item per kategori tetapi data dan gambar berantakan
```

Target awal realistis:

- semua 38 provinsi tersedia,
- tiap provinsi memiliki beberapa culture item utama,
- struktur konsisten,
- dapat diperluas setelah MVP.

---

# 34. Image Strategy

Jangan menyimpan gambar raw berukuran besar.

Recommended:

```text
Format: WebP
Fallback: JPEG/PNG hanya bila diperlukan
```

Ukuran:

- Card image: sekitar 600-1000 px
- Detail image: sekitar 1200-1920 px
- Hero image: sesuaikan dengan resolusi kiosk

Compression:

usahakan sebagian besar image berada sekitar:

```text
150 KB - 500 KB
```

tergantung resolusi dan detail.

Jangan memasukkan foto 10-30 MB ke production.

---

# 35. Local Storage Size

Local kiosk tidak memiliki kuota seperti Supabase Free.

Contoh kasar:

```text
400 gambar × 250 KB ≈ 100 MB
```

atau:

```text
800 gambar × 250 KB ≈ 200 MB
```

Ini masih masuk akal untuk komputer kiosk modern.

Masalah utama bukan kapasitas disk, tetapi:

- loading,
- decoding image,
- memory,
- terlalu banyak asset dimuat sekaligus.

Karena itu gunakan lazy loading.

---

# 36. Image Loading

Gunakan:

```html
loading="lazy"
```

untuk collection/card.

Hero utama dapat memakai eager loading jika diperlukan.

Jangan preload seluruh gambar 38 provinsi sekaligus.

Load hanya asset yang relevan dengan halaman aktif.

---

# 37. Recommended Folder Structure

```text
warisan-nusantara/
│
├── public/
│   ├── assets/
│   │   ├── branding/
│   │   ├── provinces/
│   │   │   ├── aceh/
│   │   │   ├── bali/
│   │   │   ├── di-yogyakarta/
│   │   │   └── ...
│   │   └── cultures/
│   │       ├── aceh/
│   │       ├── bali/
│   │       └── ...
│   │
│   └── favicon.svg
│
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── routes.tsx
│   │
│   ├── assets/
│   │   └── maps/
│   │       └── indonesia-provinces.svg
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppButton.tsx
│   │   │   ├── BackButton.tsx
│   │   │   ├── HomeButton.tsx
│   │   │   ├── LanguageToggle.tsx
│   │   │   └── PageHeader.tsx
│   │   │
│   │   ├── culture/
│   │   │   ├── CultureCard.tsx
│   │   │   ├── CategoryCard.tsx
│   │   │   └── QRModal.tsx
│   │   │
│   │   └── map/
│   │       ├── IndonesiaMap.tsx
│   │       └── ProvinceMapLabel.tsx
│   │
│   ├── context/
│   │   └── LanguageContext.tsx
│   │
│   ├── data/
│   │   ├── categories.ts
│   │   ├── provinces.ts
│   │   └── cultures/
│   │       ├── aceh.ts
│   │       ├── bali.ts
│   │       ├── di-yogyakarta.ts
│   │       └── ...
│   │
│   ├── layouts/
│   │   └── KioskLayout.tsx
│   │
│   ├── pages/
│   │   ├── AttractPage.tsx
│   │   ├── ExploreMapPage.tsx
│   │   ├── ProvincePage.tsx
│   │   ├── CategoryPage.tsx
│   │   └── CultureDetailPage.tsx
│   │
│   ├── hooks/
│   │   └── useIdleReset.ts
│   │
│   ├── types/
│   │   └── content.ts
│   │
│   ├── utils/
│   │   ├── getLocalizedText.ts
│   │   └── contentHelpers.ts
│   │
│   ├── index.css
│   └── main.tsx
│
├── docs/
│   ├── ATTRIBUTIONS.md
│   └── CONTENT_SOURCES.md
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

# 38. Routing

Recommended:

```text
/                       attract
/explore                map
/province/:provinceId   province detail
/province/:provinceId/:categoryId
/culture/:cultureId
```

Dengan `HashRouter`, visual URL akan menjadi:

```text
/#/
/#/explore
/#/province/bali
/#/province/di-yogyakarta/kain-tradisional
/#/culture/batik-kawung
```

---

# 39. Navigation Rules

Selalu sediakan:

- Home
- Back
- Language

Kecuali:

Attract screen cukup memiliki language + start.

Rules:

```text
Home → /explore atau attract sesuai UX final
Back → history back
Idle reset → /
```

Jangan membuat bottom navigation seperti mobile jika layar kiosk lebih nyaman dengan top navigation atau floating navigation besar.

Layout ditentukan berdasarkan spesifikasi layar sebenarnya.

---

# 40. Idle Reset

Karena kiosk digunakan banyak orang, aplikasi harus kembali ke awal setelah tidak digunakan.

Recommended:

```text
90 detik tanpa interaksi
→ reset language jika perlu
→ reset selected province
→ navigate("/")
```

Events yang mereset idle timer:

```text
pointerdown
touchstart
click
keydown
```

Keyboard event hanya untuk development/accessibility, bukan search.

Optional:

10 detik sebelum reset, tampilkan modal:

```text
Masih menjelajah?
```

Namun untuk deadline pendek, langsung reset juga boleh.

---

# 41. Touch UX

Minimum touch target:

```text
48 × 48 px
```

Recommended kiosk:

```text
56-72 px
```

Gunakan:

```css
touch-action: manipulation;
-webkit-tap-highlight-color: transparent;
```

Pada area tertentu:

```css
user-select: none;
```

Jangan mencegah scrolling secara global jika halaman memang membutuhkan scrolling.

---

# 42. Vertical Kiosk Responsive Strategy

Gunakan portrait-first layout.

Contoh breakpoints berdasarkan WIDTH, bukan asumsi device:

```text
small portrait
medium portrait
large portrait / kiosk
```

Gunakan:

```css
min-height: 100dvh;
```

Hindari:

```css
height: 100vh;
```

jika browser environment menghasilkan masalah viewport.

Layout utama:

```text
max-width secukupnya
centered
large vertical rhythm
```

---

# 43. Animation Rules

Gunakan Motion untuk:

- page enter/exit
- card tap feedback
- selected province
- modal
- subtle attract screen movement

Jangan menggunakan animasi berat untuk semua elemen.

Recommended:

```text
duration: 0.2 - 0.45 s
```

Tap:

```tsx
whileTap={{ scale: 0.97 }}
```

Page:

```text
opacity + small y translation
```

Map:

```text
fill transition
small scale/highlight
```

---

# 44. Performance Rules

Target:

- initial UI cepat muncul,
- interaksi tap terasa langsung,
- tidak ada stutter,
- tidak reload saat berpindah halaman,
- gambar besar tidak memblok UI.

Avoid:

- video backgrounds,
- WebGL,
- Three.js,
- large 3D scenes,
- massive particle effects,
- loading seluruh media sekaligus.

Project ini pameran budaya, bukan benchmark GPU.

---

# 45. Accessibility

Walaupun kiosk memiliki konteks khusus, tetap lakukan:

- semantic button
- alt text image
- readable contrast
- font besar
- clear labels
- focus states tetap ada
- jangan menggunakan warna sebagai satu-satunya indikator

Language button:

```text
ID
EN
```

harus jelas.

---

# 46. Error Handling

Karena data lokal, error seharusnya minimal.

Tetap sediakan:

## Province not found

```text
Data provinsi tidak ditemukan.
[Kembali ke Peta]
```

## Culture not found

```text
Konten budaya tidak ditemukan.
[Kembali]
```

## Missing image

Gunakan local placeholder.

Jangan biarkan broken-image icon browser tampil.

---

# 47. Data Validation

Sebelum build production, buat utility sederhana untuk mengecek:

- semua province ID unik,
- tepat 38 province,
- semua culture punya provinceId valid,
- semua culture punya categoryId valid,
- semua local image path valid,
- semua ID/EN strings yang wajib terisi,
- semua `shopUrl` valid jika tersedia.

Boleh menggunakan script Node kecil.

---

# 48. Attribution

Karena map dan gambar dapat menggunakan lisensi tertentu, buat:

```text
docs/ATTRIBUTIONS.md
```

Isi:

```text
Asset
Author
Source
License
Changes
```

Untuk Wikimedia SVG map:

- Author sesuai halaman sumber
- Source URL
- CC BY-SA 4.0
- catat jika SVG dimodifikasi

---

# 49. Deployment Kiosk

## Build

```bash
npm run build
```

Output:

```text
dist/
```

## Local server

Jalankan folder `dist` dengan static server.

Contoh dependency:

```bash
npm install serve
```

Package script:

```json
{
  "scripts": {
    "build": "vite build",
    "kiosk:serve": "serve -s dist -l 4173"
  }
}
```

Lalu:

```bash
npm run kiosk:serve
```

Browser:

```text
http://localhost:4173
```

---

# 50. Chrome Kiosk Mode

Contoh Windows:

```text
chrome.exe --kiosk http://localhost:4173
```

Atau Edge:

```text
msedge.exe --kiosk http://localhost:4173
```

Parameter sebenarnya perlu dites pada PC GIK UGM.

Checklist:

- browser benar-benar fullscreen,
- tab/address bar tidak terlihat,
- app tidak keluar karena accidental gesture,
- app dapat restart setelah PC reboot,
- server lokal ikut otomatis berjalan.

---

# 51. Startup Recovery

Ideal production kiosk:

```text
PC hidup
  |
local static server auto start
  |
browser kiosk auto start
  |
Warisan Nusantara terbuka
```

Jika browser crash:

- browser dapat dibuka ulang,
- data tidak rusak,
- tidak ada session penting yang hilang karena memang tidak ada user data.

---

# 52. Update Content Setelah Build

Tanpa CMS, proses update:

```text
ubah data/image
→ git commit
→ npm run build
→ copy dist baru ke kiosk
```

Untuk proyek satu minggu, ini jauh lebih sederhana dan dapat diprediksi daripada membuat CMS.

---

# 53. Tim

Tim:

```text
Fairuz
Fadil
```

Recommended division:

## Fairuz

Primary focus:

- React architecture
- Routing
- Touch UI
- Interactive SVG map
- Motion animations
- Language system
- QR UI
- Kiosk deployment
- Performance

## Fadil

Primary focus:

- 38 province research
- Culture item research
- Image sourcing
- Translation ID/EN
- Source tracking
- Local asset organization
- Content entry
- QA content

## Shared

Keduanya:

- final UI review
- bug testing
- touchscreen test
- fact checking
- final deployment

Pembagian ini dibuat agar developer tidak menghabiskan 70% waktu coding sambil berburu foto rumah adat pukul dua pagi.

---

# 54. One Week Execution Plan

## Day 1 — Foundation

Fairuz:

- init React + Vite + TypeScript
- Tailwind setup
- router
- global theme
- typography
- base layout
- component primitives
- download + prepare Indonesia SVG map

Fadil:

- finalisasi 38 province list
- finalisasi categories
- buat content template
- mulai research provinsi
- buat folder gambar
- catat sources

Deliverable:

- project berjalan
- design system aktif
- skeleton route tersedia
- map source tersedia
- content schema final

---

## Day 2 — Core Navigation

Fairuz:

- Attract Screen
- Map Page
- interactive province SVG
- selected province state
- navigation

Fadil:

- populate province metadata
- hero images
- mulai culture data

Deliverable:

```text
Attract
→ Map
→ Province
```

sudah bekerja.

---

## Day 3 — Culture Flow

Fairuz:

- Province Detail
- Category cards
- Culture Collection
- Culture Detail

Fadil:

- isi culture items
- deskripsi
- image
- source

Deliverable:

```text
Province
→ Category
→ Collection
→ Culture Detail
```

bekerja.

---

## Day 4 — Language + QR + Polish

Fairuz:

- ID/EN system
- QR modal
- Motion transitions
- touch feedback
- idle reset

Fadil:

- English content
- shop URL mapping
- fact check
- image attribution

Deliverable:

MVP feature complete.

---

## Day 5 — Content Completion

Fairuz:

- responsive portrait refinement
- map hit target refinement
- performance fixes
- missing states

Fadil:

- complete province coverage
- optimize media
- fill missing translation
- source review

Deliverable:

38 provinces dapat dibuka.

---

## Day 6 — Kiosk Test

Bersama:

- production build
- local static server
- Chrome/Edge kiosk test
- test tanpa internet
- touchscreen test
- QR test
- idle reset test
- language switching test
- inspect memory/performance
- fix bugs

Deliverable:

release candidate.

---

## Day 7 — Final

- final content review
- replace placeholder
- fix broken image
- verify 38 provinces
- verify all buttons
- verify all QR
- verify attribution
- backup `dist`
- backup repository
- deploy GIK UGM
- rehearsal

---

# 55. Priority Rules Saat Deadline Melejit Mendekat

Urutan yang harus diselamatkan:

```text
1. App dapat dibuka
2. Peta dapat digunakan
3. Semua 38 provinsi tersedia
4. Province Detail
5. Category
6. Culture Detail
7. Bahasa ID/EN
8. QR
9. Animation polish
10. Decorative extras
```

Jika waktu tidak cukup:

potong dekorasi, bukan fitur inti.

---

# 56. Acceptance Criteria

Project dianggap siap jika:

## Application

- [ ] App production dapat start tanpa internet.
- [ ] Tidak ada critical console error.
- [ ] Tidak ada broken navigation.
- [ ] Tidak ada blank screen.

## Map

- [ ] 38 provinsi tersedia.
- [ ] Setiap provinsi dapat dipilih.
- [ ] Selected state terlihat.
- [ ] Provinsi kecil masih dapat disentuh.

## Province

- [ ] Province page memuat data yang benar.
- [ ] Hero image benar.
- [ ] Category hanya menampilkan data tersedia.

## Culture

- [ ] Culture card membuka detail benar.
- [ ] Description ID tampil.
- [ ] Description EN tampil.
- [ ] Image tampil.
- [ ] Source telah dicatat.

## QR

- [ ] QR hanya muncul jika `shopUrl` tersedia.
- [ ] QR dapat discan dari beberapa ponsel.
- [ ] QR menuju URL benar.

## Touch

- [ ] Semua action utama dapat dilakukan dengan tap.
- [ ] Tidak membutuhkan hover.
- [ ] Button cukup besar.
- [ ] Tidak ada double-tap accidental issue signifikan.

## Kiosk

- [ ] Fullscreen.
- [ ] Offline.
- [ ] Idle reset bekerja.
- [ ] Browser dapat dibuka kembali.
- [ ] Build dapat berjalan lama tanpa crash.

---

# 57. AI Coding Agent Rules

Bagian ini WAJIB dipatuhi Cursor/Codex/Antigravity.

## Product rules

1. Jangan menambahkan fitur di luar MVP.
2. Jangan menambahkan Supabase.
3. Jangan menambahkan backend.
4. Jangan menambahkan login.
5. Jangan menambahkan search.
6. Jangan menambahkan audio.
7. Jangan menambahkan mini game.
8. Jangan menambahkan CMS.
9. Jangan menambahkan AI chatbot.
10. Jangan menggunakan Google Maps.

## Tech rules

1. React.
2. Vite.
3. TypeScript.
4. Tailwind CSS.
5. Motion for React.
6. React Router.
7. Lucide React.
8. react-qr-code.
9. Local SVG map.
10. Local content and local assets.

## Coding rules

1. Use reusable components.
2. Avoid unnecessary abstraction.
3. No `any` unless unavoidable.
4. Keep data separate from UI.
5. Do not hard-code province content inside page components.
6. Use semantic component naming.
7. Avoid giant 500+ line page components.
8. Keep animations subtle.
9. Optimize for touch.
10. Preserve offline operation.

## Data rules

1. Province ID must be stable slug.
2. Culture ID must be unique.
3. All user-visible text should support ID/EN.
4. Images must have alt text.
5. Source information must remain traceable.
6. Shop URL optional.
7. Missing shop URL means no QR CTA.

---

# 58. AI Agent Initial Prompt

Gunakan prompt berikut ketika memulai development dengan coding agent:

```text
Read WARISAN_NUSANTARA_PROJECT_SPEC.md completely before changing any code.

Treat the document as the project's source of truth.

Build the application incrementally.

Do not introduce Supabase, CMS, authentication, search, audio, mini-games,
AI features, or any backend unless the specification is explicitly updated.

The application is a portrait touchscreen kiosk and must remain functional
without internet access.

Use:
- React
- Vite
- TypeScript
- Tailwind CSS
- Motion for React
- React Router
- Lucide React
- react-qr-code
- local SVG map
- local content/assets

Before implementing a feature:
1. identify the relevant requirement,
2. propose the smallest clean implementation,
3. implement it,
4. run type checking/build,
5. fix errors before moving to the next feature.

Prioritize reliability, touch usability, performance, and maintainability
over decorative complexity.
```

---

# 59. Suggested First Coding Tasks

Berikan agent task satu per satu.

## Task 1

```text
Initialize the application architecture according to
WARISAN_NUSANTARA_PROJECT_SPEC.md.

Create:
- folder structure
- routing
- kiosk layout
- theme tokens
- Poppins typography
- LanguageContext
- basic reusable navigation components

Do not implement province content yet.

Run the production build and fix all TypeScript errors.
```

## Task 2

```text
Implement the Attract Screen based on the project specification.

Requirements:
- portrait-first
- touch CTA
- ID/EN toggle
- bone/forest/brown color palette
- subtle Motion animation
- no audio
- no search

Keep it reusable and responsive.
```

## Task 3

```text
Implement IndonesiaMap using the prepared local SVG map.

Requirements:
- all 38 provinces represented
- every province has a stable ID
- tap interaction
- visible selected state
- accessible buttons/hit targets
- no external map API
- no network dependency
```

Dan lanjutkan per fitur.

Jangan meminta coding agent membuat seluruh aplikasi dari satu prompt raksasa. Agent juga bisa kehilangan arah ketika diberi kehidupan satu semester dalam satu message.

---

# 60. Definition of Done

Warisan Nusantara selesai ketika:

```text
Pengunjung datang
↓
melihat attract screen
↓
menyentuh layar
↓
memilih provinsi di peta
↓
melihat budaya provinsi
↓
memilih kategori
↓
melihat culture item
↓
membaca detail ID/EN
↓
memindai QR bila tersedia
↓
meninggalkan kiosk
↓
app reset otomatis
↓
pengunjung berikutnya dapat mulai dari awal
```

Dan seluruh alur tersebut tetap bekerja walaupun komputer kiosk tidak memiliki koneksi internet.

---

# 61. Referensi Teknis

Supabase pricing:

https://supabase.com/pricing

Supabase billing limits:

https://supabase.com/docs/guides/platform/billing-on-supabase

Motion for React:

https://motion.dev/docs/react

Motion installation:

https://motion.dev/docs/react-installation

Wikimedia Indonesia province SVG:

https://commons.wikimedia.org/wiki/File:Provinces_of_Indonesia.svg

38 province GeoJSON/TopoJSON alternative:

https://github.com/denyherianto/indonesia-geojson-topojson-maps-with-38-provinces

---

# 62. Final Technical Decision

Untuk versi GIK UGM:

```text
React + Vite + TypeScript
Tailwind CSS
Motion for React
React Router / HashRouter
Lucide React
react-qr-code
Poppins
Local 38-province SVG
Local TypeScript/JSON content
Local optimized WebP images
Local production build
Local static HTTP server
Chrome / Edge kiosk mode
No Supabase
No CMS
No backend
Offline-first
```

Ini adalah arsitektur yang paling sederhana, stabil, dan realistis untuk scope, deadline, jumlah tim, serta lingkungan kiosk proyek ini.
