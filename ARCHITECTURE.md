# Technical Architecture & Stack Specification (ARCHITECTURE.md)

> Dokumen ini menjelaskan keputusan arsitektur perangkat lunak, teknologi yang dipilih, strategi operasional offline, dan struktur proyek untuk **Warisan Nusantara**.

---

## 1. Ringkasan Keputusan Arsitektur

Aplikasi dirancang dengan pola **100% Offline-First Client Application**:

```text
Local Content & Database
     |
     |-- Database Lokal JSON (provinces.json, cultures.json, categories.json)
     |-- Gambar Teroptimasi (WebP, max 500 KB)
     |-- Peta Vektor SVG Indonesia (Lokal)
     |
     v
React + Vite + TypeScript Application
     |
     v
Vite Production Build (Folder: dist/)
     |
     v
Local Static HTTP Server (e.g. `serve` port 4173)
     |
     v
Chromium / Edge Kiosk Mode (Fullscreen, portrait)
```

- **Database Berjalan Lokal (JSON):** Data 38 provinsi, kategori, dan karya budaya disimpan murni dalam format `.json` lokal di repository (`src/data/`).
- **Tidak ada ketergantungan internet** pada komputer kiosk.
- **Tidak ada query database online / backend service** saat navigasi antar halaman.
- Akses internet hanya terjadi di perangkat HP pengunjung setelah memindai QR Code.

---

## 2. Alasan Menggunakan Database JSON (Tanpa SQL / Supabase / CMS)

### Mengapa Memilih Database JSON Lokal?
1. **Zero Latency & Instan:** Vite dan browser dapat langsung membaca file JSON ke memori secara instan tanpa jeda koneksi jaringan atau loading spinner.
2. **100% Anti-Crash:** Tidak ada risiko *database connection timeout*, service crash, atau kegagalan port saat pameran berlangsung.
3. **Type-Safe di TypeScript:** File JSON dapat di-import langsung dengan type casting ke interface TypeScript (`as Province[]`), memberikan keamanan tipe penuh.
4. **Dominan Read-Only:** Pameran pameran interaktif ini hanya menampilkan informasi budaya (tidak ada transaksi atau form input pengunjung), sehingga file JSON sangat ideal dan efisien.
5. **Mudah Dikelola & Diperbarui:** Data JSON dapat diedit langsung menggunakan teks editor, di-generate dari export SQL Laragon jika diperlukan, atau dilacak versinya via Git.

### Mengapa Tanpa Supabase / Headless CMS?
- Kuota free plan Supabase berisiko terlampaui dan project dapat di-pause jika tidak aktif.
- Menghilangkan ketergantungan koneksi WiFi pameran GIK UGM yang rawan fluktuatif.
- Menghilangkan kerumitan konfigurasi backend, autentikasi, dan maintenance server terpisah.

---

## 3. Cara Kiosk Mengambil Data (Arsitektur Database JSON)

Data disimpan di folder `src/data/` dalam format JSON murni:

```text
src/
└── data/
    ├── categories.json        # Koleksi 8 kategori budaya universal
    ├── provinces.json         # Database 38 provinsi Indonesia
    └── cultures.json          # Database seluruh item karya budaya nusantara
```

*(Alternatif: file budaya dapat dipecah per provinsi di dalam `src/data/cultures/aceh.json`, `bali.json`, dll., jika ingin memisahkan berkas lebih teratur).*

Aset visual disimpan secara lokal di `public/`:

```text
public/
└── assets/
    ├── provinces/
    └── cultures/
        ├── aceh/
        ├── bali/
        ├── di-yogyakarta/
        └── ...
```

### Cara Query Data di React:
Cukup import file JSON langsung ke komponen atau helper function:

```ts
import provincesData from '@/data/provinces.json';
import culturesData from '@/data/cultures.json';
import type { Province, CultureItem } from '@/types/content';

export const provinces = provincesData as Province[];
export const cultures = culturesData as CultureItem[];

// Query analogi: SELECT * FROM cultures WHERE province_id = ?
export const getCulturesByProvince = (provinceId: string): CultureItem[] =>
  cultures.filter(item => item.provinceId === provinceId);
```

Saat proses build dijalankan (`npm run build`), Vite membundel semua data JSON dan aset ke dalam folder `dist/`. Folder ini kemudian dijalankan melalui static server lokal di komputer kiosk tanpa perlu koneksi internet.

---

## 4. Strategi Offline

1. **Local Production Build**: Folder `dist/` menjadi sumber utama yang disalin langsung ke komputer kiosk.
2. **Static HTTP Server**: Dijalankan via localhost (contoh: `http://localhost:4173`).
3. **Online Copy (Opsional)**: Versi yang sama dapat di-deploy ke Vercel / Netlify / Cloudflare Pages sebagai cadangan atau preview portofolio, namun kiosk fisik tetap independen dan berjalan lokal.

---

## 5. Spesifikasi Platform & Hardware Kiosk (GIK UGM)

Karakteristik target hardware kiosk pameran di GIK UGM:

| Parameter | Target / Asumsi Spesifikasi |
|---|---|
| **Orientasi Layar** | Portrait (Vertikal) |
| **Rasio Desain** | 9:16 (Responsive layout) |
| **Input Utama** | Touchscreen (Single / Multi-touch) |
| **Lingkungan Browser** | Chrome / Edge Chromium dalam Kiosk Mode |
| **Koneksi Internet** | Dianggap **TIDAK ADA** (Offline-first) |
| **Waktu Operasional** | Seharian penuh (butuh memory leak prevention & auto-reset) |

> ⚠️ **Peringatan Desain**: Jangan mengunci layout dengan ukuran pixel absolut (`px`). Gunakan Tailwind container, viewport units (`100dvh`), dan flex/grid fleksibel agar adaptif terhadap berbagai resolusi layar portrait.

---

## 6. Tech Stack Final

### Core Engine
- **React 18+**: Framework komponen UI.
- **Vite**: Build tool modern, cepat, dan efisien.
- **TypeScript**: Type safety untuk model provinsi dan item budaya.

### Database & Penyimpanan
- **Local JSON Database**: `provinces.json`, `cultures.json`, `categories.json` (disimpan lokal di `src/data/`).

### Styling & Tampilan
- **Tailwind CSS v4**: Utility-first CSS dengan konfigurasi token warna semantic.
- **Poppins Font**: Tipografi modern berkarakter ramah yang disimpan secara lokal.

### Animasi & Gerakan
- **Motion for React** (`motion`): Pengganti resmi Framer Motion untuk transisi halaman dan feedback sentuhan:
  ```bash
  npm install motion
  ```
  Import:
  ```ts
  import { motion, AnimatePresence } from "motion/react";
  ```

### Routing
- **React Router DOM** dengan **`HashRouter`**:
  Dipilih karena rute berbasis hash (`/#/explore`, `/#/province/bali`) berjalan sempurna di atas web server statis lokal sederhana tanpa perlu konfigurasi rewrite URL/fallback index.html yang rumit.

### Komponen Pendukung
- **`lucide-react`**: Kumpulan ikon SVG modern dan konsisten.
- **`react-qr-code`**: Generator SVG QR Code lokal (tanpa request ke API eksternal).
- **Interactive SVG Map**: File SVG peta Indonesia 38 provinsi lokal (Wikimedia Commons).

---

## 7. Dependency Minimal & Instalasi

Perintah inisialisasi proyek:

```bash
# Inisialisasi Vite React TypeScript
npm create vite@latest . -- --template react-ts
npm install

# Instalasi dependency utama
npm install react-router-dom motion lucide-react react-qr-code

# Setup Tailwind CSS & Server Statis Kiosk
npm install -D tailwindcss @tailwindcss/vite serve
```

---

## 8. Struktur Folder Rekomendasi

```text
warisan-nusantara/
│
├── public/
│   ├── assets/
│   │   ├── branding/              # Logo Warisan Nusantara, ornamen
│   │   ├── provinces/             # Hero banner per provinsi
│   │   │   ├── aceh/
│   │   │   ├── bali/
│   │   │   ├── di-yogyakarta/
│   │   │   └── ...
│   │   └── cultures/              # Foto karya/budaya
│   │       ├── aceh/
│   │       ├── bali/
│   │       ├── di-yogyakarta/
│   │       └── ...
│   └── favicon.svg
│
├── src/
│   ├── app/
│   │   ├── App.tsx                # App wrapper, Context provider
│   │   └── routes.tsx             # Definisi rute HashRouter
│   │
│   ├── assets/
│   │   └── maps/
│   │       └── indonesia-provinces.svg  # File SVG Peta Indonesia
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppButton.tsx      # Tombol dengan touch feedback
│   │   │   ├── BackButton.tsx     # Tombol kembali standar
│   │   │   ├── HomeButton.tsx     # Tombol kembali ke peta/awal
│   │   │   ├── LanguageToggle.tsx # Pemilih ID / EN
│   │   │   └── PageHeader.tsx     # Header konsisten antar halaman
│   │   │
│   │   ├── culture/
│   │   │   ├── CultureCard.tsx    # Kartu item budaya
│   │   │   ├── CategoryCard.tsx   # Kartu kategori budaya
│   │   │   └── QRModal.tsx        # Modal pop-up QR Code
│   │   │
│   │   └── map/
│   │       ├── IndonesiaMap.tsx   # Komponen peta interaktif SVG
│   │       └── ProvinceMapLabel.tsx
│   │
│   ├── context/
│   │   └── LanguageContext.tsx    # State bahasa global (id / en)
│   │
│   ├── data/
│   │   ├── categories.json        # Database lokal daftar kategori
│   │   ├── provinces.json         # Database lokal 38 provinsi
│   │   └── cultures.json          # Database lokal karya budaya
│   │
│   ├── hooks/
│   │   └── useIdleReset.ts        # Hook pendeteksi 90s idle timeout
│   │
│   ├── layouts/
│   │   └── KioskLayout.tsx        # Template wrapper layar portrait
│   │
│   ├── pages/
│   │   ├── AttractPage.tsx        # Screen 1: Layar sentuh pembuka
│   │   ├── ExploreMapPage.tsx     # Screen 2: Peta Indonesia
│   │   ├── ProvincePage.tsx       # Screen 3: Detail Provinsi
│   │   ├── CategoryPage.tsx       # Screen 4: Koleksi per kategori
│   │   └── CultureDetailPage.tsx  # Screen 5: Detail Item Budaya
│   │
│   ├── types/
│   │   └── content.ts             # Definisi interface TypeScript
│   │
│   ├── utils/
│   │   ├── getLocalizedText.ts    # Helper ekstraksi string ID/EN
│   │   └── contentHelpers.ts      # Fungsi query data JSON (filter, find)
│   │
│   ├── index.css                  # Token tema Tailwind & styling global
│   └── main.tsx                   # Entry point aplikasi
│
├── docs/
│   ├── ATTRIBUTIONS.md            # Catatan lisensi aset gambar & peta
│   └── CONTENT_SOURCES.md         # Sumber referensi riset budaya
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 9. Aturan Kinerja (Performance Rules)

Aplikasi kiosk pameran harus dapat beroperasi seharian tanpa degradasi memori atau freeze:

1. **Hindari Beban Grafis Berat**:
   - Dilarang memakai video background.
   - Tidak menggunakan WebGL, Three.js, atau partikel canvas berlebihan.
2. **Optimasi Gambar**:
   - Format wajib: **WebP**.
   - Ukuran per gambar dibatasi pada kisaran **150 KB – 500 KB**.
   - Gunakan `loading="lazy"` pada kartu koleksi budaya.
   - Jangan melakukan preload untuk seluruh aset foto 38 provinsi di awal aplikasi.
3. **Pembersihan Memori**:
   - Bersihkan event listener saat komponen unmount (terutama pada hook `useIdleReset`).
   - Hindari memory leak pada animasi loop berkelanjutan.

---

## 10. Referensi Teknis Resmi

- [Motion for React Docs](https://motion.dev/docs/react)
- [Wikimedia Commons - Provinces of Indonesia SVG](https://commons.wikimedia.org/wiki/File:Provinces_of_Indonesia.svg)
- [Alternative GeoJSON 38 Provinsi](https://github.com/denyherianto/indonesia-geojson-topojson-maps-with-38-provinces)
- [Tailwind CSS Configuration](https://tailwindcss.com/docs)
- [React Router HashRouter Guide](https://reactrouter.com/en/main/router-components/hash-router)
