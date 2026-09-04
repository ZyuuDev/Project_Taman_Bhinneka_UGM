# Design System & UI/UX Guidelines (DESIGN_SYSTEM.md)

> Dokumen ini mengatur palet warna, tipografi, prinsip interaksi layar sentuh, aturan responsif portrait, serta standar animasi untuk **Warisan Nusantara**.

---

## 1. Palet Warna (Color Palette)

Palet warna dirancang dengan nuansa budaya nusantara yang hangat, elegan, dan berwibawa:

### 1.1 Bone / Putih Tulang (`#F8F0E5`)
- **Fungsi:** Warna latar belakang utama (main background), permukaan kartu konten ringan, dan canvas aplikasi.
- **Karakter:** Hangat, alami, nyaman di mata untuk layar besar, tidak menyilaukan pengunjung pameran seperti putih murni (`#FFFFFF`).

### 1.2 Forest / Hijau Tua (`#1A3C1A`)
- **Fungsi:** Tombol aksi utama (CTA), warna judul utama, status aktif pada peta SVG, header navigasi, aksen visual dominan.
- **Karakter:** Melambangkan kekayaan alam dan hutan nusantara, memberikan kontras tinggi di atas latar belakang Bone.

### 1.3 Brown / Cokelat Budaya (`#7A4E2D`)
- **Fungsi:** Aksen sekunder, border kartu budaya, garis ornamen dekoratif, highlight kategori.
- **Karakter:** Nuansa tanah, kayu, ukiran tradisional, dan batik.

### 1.4 Warna Netral Pendukung
```css
--text-primary: #1D1D1B;   /* Teks utama (hitam pekat bernuansa hangat) */
--text-muted:   #6F6A63;   /* Teks sekunder, label, keterangan sumber */
--surface:      #FFFDF9;   /* Permukaan kartu konten */
--border:       #D8CBBE;   /* Garis pemisah halus */
```

---

## 2. Konsep Tema Tailwind CSS

Gunakan semantic design token pada file styling (`src/index.css`):

```css
@theme {
  --color-bone: #F8F0E5;
  --color-forest: #1A3C1A;
  --color-brown: #7A4E2D;
  --color-text-main: #1D1D1B;
  --color-text-muted: #6F6A63;
  --color-surface: #FFFDF9;
  --color-border-subtle: #D8CBBE;
}
```

> **Aturan:** Hindari menuliskan nilai hex secara acak di puluhan komponen. Selalu gunakan utility class berbasis token seperti `bg-bone`, `text-forest`, `border-brown`, dll.

---

## 3. Tipografi (Typography)

Font Utama: **Poppins** (Google Fonts / Disimpan Lokal)

```text
Display (Judul Besar):      Poppins 700 (Bold)
Heading (Judul Halaman):    Poppins 600 (Semi-Bold)
Subheading / Button:        Poppins 500 / 600 (Medium/Semi-Bold)
Body Text (Narasi Budaya):  Poppins 400 (Regular)
```

### Pertimbangan Layar Kiosk:
- Pengunjung berdiri sekitar **0.5 – 1 meter** di depan layar sentuh.
- Ukuran font dasar (`body`) harus lebih besar daripada website desktop biasa:
  - Minimal ukuran body text: **16px – 18px** (di mobile biasa seringkali 14px).
  - Judul / Title: **28px – 48px**.
- Hindari paragraf narasi yang terlalu panjang dan padat. Pecah menjadi ringkasan yang enak dibaca dalam 30–60 detik.

---

## 4. Prinsip Desain Interaksi (Design Principles)

1. **Touch First, Always**:
   - Seluruh elemen dirancang untuk ujung jari manusia, bukan kursor mouse.
   - Tidak ada ketergantungan pada hover state untuk menampilkan informasi krusial.
2. **Visual First**:
   - Tampilkan foto karya budaya berkualitas tinggi sebagai pusat perhatian visual.
   - Informasi teks disajikan padat, menarik, dan mudah dipindai.
3. **Minimal Cognitive Load**:
   - Pengunjung harus langsung tahu langkah berikutnya dalam hitungan 2–3 detik tanpa membaca manual.
4. **Navigasi Konsisten**:
   - Letak tombol **Kembali (Back)**, **Beranda (Home)**, dan **Bahasa (ID / EN)** harus berada di posisi yang stabil dan terprediksi di setiap halaman.
5. **Instant Visual Feedback**:
   - Setiap sentuhan pada tombol atau kartu harus memberikan respon visual seketika (mikro-animasi kompresi atau perubahan warna).

---

## 5. Standar Touch UX

- **Ukuran Target Sentuh (Touch Target)**:
  - Rekomendasi Kiosk: **56px × 56px** hingga **72px × 72px**.
  - Target sentuh terkecil yang ditoleransi: **48px × 48px**.
- **CSS Utility Wajib pada Area Interaktif**:
  ```css
  /* Mencegah zoom tidak sengaja saat double tap & menghilangkan highlight biru browser */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  ```
- **Scrolling**:
  - Scrolling vertikal tetap diizinkan pada halaman narasi panjang (Culture Detail), namun pastikan scrollbar terlihat jelas atau area memiliki indikator visual bahwa halaman dapat digulir.

---

## 6. Strategi Responsif Vertical Kiosk

Layar pameran GIK UGM menggunakan orientasi **Portrait (Vertikal)** dengan rasio umum **9:16**:

```text
+-----------------------+
|  Header (Nav + Lang)  |
+-----------------------+
|                       |
|                       |
|    Area Konten Utama  |
|   (Peta / Foto / Card)|
|                       |
|                       |
+-----------------------+
|  Action Bar / Footer  |
+-----------------------+
```

### Panduan Layout:
- Gunakan unit tinggi viewport dinamis: `min-height: 100dvh` (hindari `100vh` kaku yang kerap bermasalah di browser Kiosk).
- Gunakan `max-w-2xl` atau `max-w-3xl` yang diletakkan di tengah (`mx-auto`) untuk menjaga baris teks tidak melebar berlebihan di layar kiosk yang sangat lebar.
- Jaga ritme vertikal (vertical spacing) yang lega dengan `gap-6` atau `gap-8`.

---

## 7. Aturan Animasi (Motion Guidelines)

Gunakan **Motion for React** (`motion`) untuk interaksi yang elegan dan tidak berlebihan:

### Feedback Sentuhan (Tap Feedback):
```tsx
<motion.button
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.1 }}
  className="bg-forest text-bone font-semibold py-4 px-8 rounded-2xl"
>
  Sentuh untuk Menjelajah
</motion.button>
```

### Transisi Antar Halaman:
- Efek: Fade In + pergeseran halus sumbu Y (`opacity: 0, y: 12` -> `opacity: 1, y: 0`).
- Durasi: **0.25s – 0.35s** (cepat dan tidak menahan pengunjung).

### Attract Screen Ambient Motion:
- Pulse halus pada tombol CTA utama (skala 1.0 ke 1.03 secara berulang dan perlahan).
- Floating halus pada elemen ornamen batik / visual latar belakang.
- **Dilarang:** Animasi berputar cepat, transisi kilat, atau efek partikel yang membuat pusing.

---

## 8. Aksesibilitas (Accessibility)

- **Kontras Warna:** Kombinasi Hijau Tua (`#1A3C1A`) di atas Putih Tulang (`#F8F0E5`) memiliki rasio kontras > 7:1 (memenuhi standar AAA WCAG).
- **Semantik HTML:** Gunakan tag `<button>`, `<header>`, `<main>`, `<article>` secara tepat.
- **Alt Text Gambar:** Semua gambar wajib memiliki atribut `alt` dwibahasa untuk keterbacaan yang baik.
- **Bilingual Toggle:** Tombol pemilih bahasa harus menampilkan status aktif dengan kontras tinggi (misal: tombol aktif berlatar Hijau Tua dengan teks Putih Tulang).
