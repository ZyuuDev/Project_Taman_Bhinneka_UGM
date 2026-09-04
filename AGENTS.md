# AI Coding Agent Rules & Guidelines (AGENTS.md)

> Dokumen ini adalah panduan kerja wajib untuk AI coding agent (**Antigravity, Cursor, Codex, Claude Code, GitHub Copilot**) yang bekerja pada repositori **Warisan Nusantara**.
> AI agent WAJIB membaca dan mematuhi dokumen ini sebelum menulis atau memodifikasi kode apapun.

---

## 0. Fase Aktif Saat Ini: Batik-First

Bagian ini adalah keputusan scope terbaru dan **menggantikan target keluasan konten lama** yang meminta banyak kategori aktif atau beberapa jenis budaya per provinsi. Seluruh aturan teknis, offline-first, kualitas, dan anti-scope lainnya tetap berlaku.

1. Seluruh **38 provinsi** tetap wajib terdaftar, dapat dipilih di peta, dan dapat membuka halaman provinsi.
2. Delapan kategori universal tetap didefinisikan di `categories.json` agar struktur siap diperluas pada pembaruan berikutnya.
3. Untuk fase aktif ini, `cultures.json` hanya diisi item **Batik yang terverifikasi**.
4. Batik **bukan kategori baru**. Semua item Batik menggunakan `categoryId: "kain-tradisional"`.
5. Kategori lain belum memiliki item budaya dan tidak boleh diisi dengan data dummy. UI wajib menyembunyikan kategori yang tidak memiliki item.
6. Jangan mengarang atau memaksakan Batik untuk memenuhi cakupan provinsi. Jika belum ditemukan Batik dengan sumber kredibel, provinsi tetap dapat dibuka dan menampilkan empty state dwibahasa yang ramah.
7. `Province.categories` hanya memuat `kain-tradisional` jika provinsi tersebut benar-benar memiliki minimal satu item Batik yang valid.
8. Setiap fakta Batik wajib dapat ditelusuri ke sumber kredibel. Setiap gambar harus disimpan lokal, memiliki izin/lisensi yang sesuai, dan dicatat atribusinya.
9. `shopUrl` tetap opsional dan hanya boleh diisi dengan URL produk atau mitra yang sah. Jangan membuat URL contoh untuk data produksi.
10. Penambahan konten selain Batik ditunda ke fase pembaruan berikutnya dan tidak boleh dikerjakan tanpa perubahan scope eksplisit.

Panduan pembagian kerja dua perangkat tersedia di [`docs/collaboration/`](docs/collaboration/).

---

## 1. Golden Rules (Non-Negotiable)

1. **JANGAN menambah fitur di luar MVP**: Tidak ada Search, tidak ada Keyboard virtual, tidak ada Audio/Voice, tidak ada Mini Game/Quiz, tidak ada Culture Passport, tidak ada User Account/Login, tidak ada Favorites/Comments, tidak ada Social features, tidak ada AI Chatbot.
2. **JANGAN menambah Backend / Database SQL / Online DB**: **TIDAK MENGGUNAKAN MYSQL, POSTGRESQL, SQLITE, SUPABASE**, Firebase, GraphQL, REST API online, atau online database apapun. Seluruh data disimpan lokal dalam format **JSON** (`src/data/*.json`).
3. **JANGAN menambah CMS**: Tidak ada WordPress, Strapi, Sanity, atau CMS eksternal. Data disimpan langsung dalam file JSON lokal di repo.
4. **JANGAN menggunakan Google Maps**: Gunakan file SVG lokal Indonesia 38 provinsi. Tidak ada ketergantungan API Maps eksternal.
5. **WAJIB Offline-First**: Aplikasi kiosk harus 100% berfungsi normal tanpa koneksi internet sama sekali. Koneksi internet hanya dibutuhkan oleh smartphone pengunjung saat scan QR Code menuju halaman toko eksternal.
6. **Prioritaskan Keandalan & Touch Usability**: Desain untuk layar sentuh vertikal (portrait). Hindari ketergantungan pada hover state.


---

## 2. Tech Stack Mandate

| Kategori | Teknologi Wajib | Catatan |
|---|---|---|
| **Core** | React 18+, Vite, TypeScript | Type-safety, no untyped `any` |
| **Database** | **Local JSON Database** | `provinces.json`, `categories.json`, `cultures.json` di `src/data/` |
| **Styling** | Tailwind CSS v4 | Gunakan design token semantic di `index.css` |
| **Animasi** | `motion` (Motion for React) | `import { motion, AnimatePresence } from "motion/react"` |
| **Routing** | `react-router-dom` (`HashRouter`) | Wajib `HashRouter` untuk kompatibilitas static file server kiosk |
| **Icons** | `lucide-react` | Ringan dan konsisten |
| **QR Code** | `react-qr-code` | Render SVG QR lokal beresolusi tinggi |
| **Map** | Local SVG Map (38 Provinsi) | `src/assets/maps/indonesia-provinces.svg` |
| **Typography** | Poppins | Simpan font lokal jika memungkinkan |

---

## 3. Scope MVP

### Fitur yang WAJIB Dibuat:
- [ ] **Attract Screen** (Animasi halus, tap to start, language selector)
- [ ] **Interactive Indonesia Map** (38 provinsi interaktif, highlight provinsi)
- [ ] **Province Detail** (Hero image, info wilayah, daftar kategori aktif)
- [ ] **Culture Categories** (Kategori universal budaya)
- [ ] **Culture Collection** (Grid item budaya per provinsi & kategori)
- [ ] **Culture Detail** (Foto besar, narasi dwibahasa ID/EN, fakta unik)
- [ ] **QR Code Modal** (Muncul jika ada `shopUrl`, discan via HP pengunjung)
- [ ] **Bilingual System** (Bahasa Indonesia & English via context)
- [ ] **Touch-Friendly Navigation** (Target sentuh minimal 56–72px, tombol Home/Back konsisten)
- [ ] **Idle Reset System** (Kembali ke Attract Screen otomatis setelah 90 detik hening)
- [ ] **Local JSON Database** (Query data via helper filter/find di `src/utils/contentHelpers.ts`)
- [ ] **Offline Local Deployment** (Bisa di-serve via `serve -s dist -l 4173`)

### Fitur yang TIDAK Boleh Dibuat (Anti-Scope):
- Database SQL (MySQL, PostgreSQL, SQLite, SQL Server)
- Backend API server (Express, PHP, FastAPI, dll.)
- Search bar / Virtual keyboard
- Audio narration / Background music
- Mini game / Kuis budaya
- Passport / Gamification
- Login / Register / User profile
- Supabase / Firebase / Cloud DB
- CMS / Admin dashboard
- Google Maps API

---

## 4. Coding Standards for Agents

1. **Modular & Reusable Components**: Pisahkan komponen besar menjadi komponen atomik yang terisolasi di `src/components/`.
2. **Hindari File Raksasa**: Komponen halaman (`pages/`) tidak boleh melebihi ~300-400 baris. Pecah bagian kompleks menjadi sub-komponen.
3. **Data Terpisah dari UI**: Dilarang melakukan hard-code data provinsi/budaya langsung di dalam JSX komponen halaman. Simpan data di `src/data/*.json`.
4. **TypeScript Strictness**: Definisikan tipe data dengan jelas (`Province`, `Category`, `CultureItem`, `LocalizedText` di `src/types/content.ts`). Hindari penggunaan `any`.
5. **Animasi Halus & Ringan**: Durasi transisi 0.2s - 0.45s. Jangan gunakan Three.js, WebGL, particle animation, atau video background berat.
6. **Touch Optimization**:
   - Berikan visual feedback saat tap (`whileTap={{ scale: 0.97 }}`).
   - Tambahkan CSS `touch-action: manipulation; -webkit-tap-highlight-color: transparent;`.
   - Pastikan area sentuh nyaman (minimal 56px untuk layar kiosk).
7. **Bilingual Support**: Semua teks yang terlihat oleh pengunjung wajib mendukung ID dan EN via helper/context.
8. **Graceful Handling**:
   - Jika data provinsi/budaya tidak ditemukan di file JSON, tampilkan error view yang ramah + tombol navigasi kembali.
   - Jika gambar gagal dimuat, gunakan fallback placeholder lokal (jangan biarkan broken image icon tampil).
   - Jika `shopUrl` tidak ada, sembunyikan tombol QR Code.

---

## 5. Development Workflow (Step-by-Step)

Ketika diminta mengimplementasikan fitur:
1. **Identifikasi Kebutuhan**: Rujuk dokumen spesifikasi yang relevan (`ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `UI_FLOW.md`, atau `DATA_SPEC.md`).
2. **Ajukan Solusi Terkecil & Terbersih**: Tulis kode tanpa over-engineering.
3. **Validasi Tipe & Build**: Jalankan `npm run build` / type checking untuk memastikan tidak ada error TypeScript.
4. **Perbaiki Error Seketika**: Jangan pindah ke fitur berikutnya jika masih ada error aktif.

---

## 6. Suggested First Coding Tasks

Daftar di bawah adalah milestone produk tingkat tinggi dari rencana awal, bukan pembagian file atau instruksi eksekusi untuk workflow dua perangkat.

Untuk fase aktif, AI wajib mengikuti satu ID dari `docs/collaboration/TASKS_FAIRUZ.md` atau `docs/collaboration/TASKS_FADIL.md`. Batas kepemilikan di prompt masing-masing berlaku: Fairuz tidak mengubah `src/data/**` atau aset budaya, sedangkan Fadil tidak mengubah kode aplikasi, tipe, helper, atau konfigurasi. Jangan menggabungkan beberapa milestone di bawah ke dalam satu tugas AI.

Bagi developer/agent, kerjakan milestone secara bertahap:

### Task 1: Architecture Foundation & JSON Data
- Inisialisasi React + Vite + TypeScript.
- Konfigurasi Tailwind CSS & design tokens (bone, forest, brown).
- Setup `HashRouter` & route skeleton.
- Setup `LanguageContext` (ID/EN).
- Siapkan skema tipe di `src/types/content.ts` dan file database awal di `src/data/categories.json`, `src/data/provinces.json`, `src/data/cultures.json`.
- Buat helper query di `src/utils/contentHelpers.ts`.
- Buat komponen navigasi dasar (`BackButton`, `HomeButton`, `LanguageToggle`, `AppButton`).
- Setup layout kiosk portrait (`min-h-[100dvh]`).

### Task 2: Attract Screen
- Implementasi `AttractPage`.
- Branding Warisan Nusantara + tagline.
- Tombol CTA besar "Sentuh untuk Menjelajah".
- Animasi ambient ringan menggunakan Motion.
- Toggle bahasa ID/EN.

### Task 3: Interactive Indonesia Map
- Siapkan komponen `IndonesiaMap.tsx` menggunakan file SVG lokal.
- Hubungkan ID path SVG ke data `provinces.json`.
- Interaksi sentuh: visual highlight dan province card pop-up/konfirmasi menuju detail provinsi.

### Task 4: Province & Culture Flow
- Implementasi `ProvincePage` (Hero, deskripsi, daftar kategori aktif dari JSON).
- Implementasi `CultureCard` & `CultureDetailPage`.
- Implementasi `QRModal` dengan `react-qr-code`.
- Hook idle reset (`useIdleReset.ts`, 90 detik).

---

## 7. Priority Rules (Jika Waktu/Deadline Mepet)

Urutan prioritas penyelamatan fitur:
1. Aplikasi dapat terbuka & berjalan stabil tanpa crash
2. Peta Indonesia dapat disentuh & dipilih
3. Seluruh 38 provinsi terdaftar di `provinces.json`
4. Halaman Province Detail dapat dibuka
5. Kategori budaya tampil
6. Halaman Culture Detail menampilkan gambar & deskripsi
7. Toggle bahasa ID/EN berfungsi
8. QR Code modal berfungsi
9. Polish animasi & transisi halus
10. Ornamen dekoratif tambahan

---

## 8. Definition of Done (DoD)

Aplikasi dianggap **SELESAI** jika skenario berikut terpenuhi:
1. Layar menampilkan Attract Screen menarik.
2. Pengunjung menyentuh layar -> masuk ke Peta Indonesia 38 provinsi.
3. Memilih provinsi -> membuka informasi budaya provinsi dari `provinces.json`.
4. Memilih kategori -> menampilkan koleksi budaya dari `cultures.json`.
5. Membuka detail budaya -> membaca penjelasan lengkap ID/EN.
6. Memindai QR Code (jika tersedia) -> link shop terbuka di smartphone pengunjung.
7. Pengunjung meninggalkan kiosk -> setelah 90 detik otomatis reset ke Attract Screen.
8. **Seluruh alur di atas berjalan lancar di komputer kiosk tanpa koneksi internet.**

---

## 9. Referensi Dokumen Spec Terkait

- [README.md](file:///c:/laragon/www/Project_Taman_Bhinneka_UGM/README.md) — Ringkasan produk & indeks spesifikasi.
- [ARCHITECTURE.md](file:///c:/laragon/www/Project_Taman_Bhinneka_UGM/ARCHITECTURE.md) — Arsitektur teknis, database lokal JSON, & folder structure.
- [DESIGN_SYSTEM.md](file:///c:/laragon/www/Project_Taman_Bhinneka_UGM/DESIGN_SYSTEM.md) — Warna, tipografi, prinsip touch & animasi.
- [UI_FLOW.md](file:///c:/laragon/www/Project_Taman_Bhinneka_UGM/UI_FLOW.md) — Alur layar, detail per halaman, peta, modal QR, & idle reset.
- [DATA_SPEC.md](file:///c:/laragon/www/Project_Taman_Bhinneka_UGM/DATA_SPEC.md) — Struktur data JSON, skema TypeScript, & helper query.
- [DEPLOYMENT.md](file:///c:/laragon/www/Project_Taman_Bhinneka_UGM/DEPLOYMENT.md) — Panduan build, static server, kiosk mode browser, & auto-start.
- [ROADMAP.md](file:///c:/laragon/www/Project_Taman_Bhinneka_UGM/ROADMAP.md) — Rencana kerja 7 hari, pembagian tim, & kriteria penerimaan.
