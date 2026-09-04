# Data Models & Content Guidelines (DATA_SPEC.md)

> Dokumen ini menjelaskan skema data TypeScript, database lokal dalam format JSON (`provinces.json`, `categories.json`, `cultures.json`), sistem dwibahasa (ID/EN), helper query data, panduan kurasi konten, standar kompresi gambar, dan validasi data untuk **Warisan Nusantara**.

---

## 1. Sistem Dwibahasa (Bilingual Architecture)

Semua teks yang ditampilkan kepada pengunjung wajib menggunakan struktur dwibahasa:

```ts
// src/types/content.ts

export type Language = "id" | "en";

export interface LocalizedText {
  id: string;
  en: string;
}
```

Format JSON untuk teks dwibahasa:
```json
{
  "id": "Teks dalam Bahasa Indonesia",
  "en": "Text in English"
}
```

---

## 2. Skema TypeScript & Database JSON Provinsi

### 2.1 Interface TypeScript (`src/types/content.ts`)
```ts
export interface Province {
  id: string;              // Slug unik URL (e.g. "di-yogyakarta", "bali", "aceh")
  code: string;            // Kode ISO wilayah (e.g. "ID-YO", "ID-BA", "ID-AC")
  name: LocalizedText;     // Nama provinsi dalam ID dan EN
  island: LocalizedText;   // Gugus kepulauan (Jawa, Sumatera, Kalimantan, Sulawesi, dll)
  description: LocalizedText; // Narasi pengantar singkat provinsi
  heroImage: string;       // Jalur aset gambar lokal (e.g. "/assets/provinces/di-yogyakarta/hero.webp")
  categories: string[];    // Daftar ID kategori budaya yang aktif di provinsi ini
}
```

### 2.2 Berkas Database JSON (`src/data/provinces.json`)
Data seluruh 38 provinsi disimpan sebagai array JSON:

```json
[
  {
    "id": "di-yogyakarta",
    "code": "ID-YO",
    "name": {
      "id": "DI Yogyakarta",
      "en": "Special Region of Yogyakarta"
    },
    "island": {
      "id": "Jawa",
      "en": "Java"
    },
    "description": {
      "id": "Daerah Istimewa Yogyakarta adalah pusat kebudayaan Jawa yang termasyhur dengan keraton, seni pertunjukan, dan tradisi membatik berabad-abad lamanya.",
      "en": "The Special Region of Yogyakarta is a celebrated center of Javanese culture, renowned for its royal court, classical arts, and centuries-old batik tradition."
    },
    "heroImage": "/assets/provinces/di-yogyakarta/hero.webp",
    "categories": [
      "kain-tradisional",
      "seni-kriya",
      "tari",
      "musik",
      "kuliner"
    ]
  }
]
```

---

## 3. Skema TypeScript & Database JSON Kategori

### 3.1 Interface TypeScript (`src/types/content.ts`)
```ts
export interface Category {
  id: string;              // Slug kategori (e.g. "kain-tradisional", "tari")
  name: LocalizedText;     // Label kategori ID / EN
  description: LocalizedText; // Deskripsi singkat kategori
  icon: string;            // Nama icon Lucide (e.g. "Sparkles", "Music", "Utensils")
}
```

### 3.2 Berkas Database JSON (`src/data/categories.json`)
```json
[
  {
    "id": "kain-tradisional",
    "name": {
      "id": "Kain & Tekstil Tradisional",
      "en": "Traditional Textiles"
    },
    "description": {
      "id": "Batik, tenun ikat, songket, dan ulos warisan leluhur nusantara.",
      "en": "Batik, ikat weaves, songket, and traditional textiles of the archipelago."
    },
    "icon": "Scroll"
  },
  {
    "id": "tari",
    "name": {
      "id": "Seni Tari",
      "en": "Traditional Dance"
    },
    "description": {
      "id": "Gerak ritmis penuh filosofi dan makna sakral daerah.",
      "en": "Rhythmic dances rich in philosophy and sacred cultural heritage."
    },
    "icon": "Activity"
  }
]
```

---

## 4. Skema TypeScript & Database JSON Karya Budaya

### 4.1 Interface TypeScript (`src/types/content.ts`)
```ts
export interface CultureItem {
  id: string;                 // Slug unik karya budaya (e.g. "batik-kawung")
  provinceId: string;         // Relasi ForeignKey ke ID Provinsi (e.g. "di-yogyakarta")
  categoryId: string;         // Relasi ForeignKey ke Kategori (e.g. "kain-tradisional")
  name: LocalizedText;        // Nama karya budaya
  shortDescription: LocalizedText; // Ringkasan 1-2 kalimat untuk kartu preview
  description: LocalizedText; // Narasi lengkap mengenai sejarah dan filosofi
  fact?: LocalizedText;       // Fakta unik menarik (opsional)
  image: string;              // Foto utama beresolusi tinggi (format WebP)
  images?: string[];          // Galeri foto tambahan (opsional)
  imageAlt: LocalizedText;    // Deskripsi teks alternatif untuk aksesibilitas
  shopUrl?: string;           // Tautan pembelian/katalog eksternal untuk QR Code (opsional)
  sourceUrl?: string;         // Tautan sumber literatur/sejarah untuk verifikasi
  imageSourceUrl?: string;    // Sumber kredit dan lisensi foto
}
```

### 4.2 Berkas Database JSON (`src/data/cultures.json`)
```json
[
  {
    "id": "batik-kawung",
    "provinceId": "di-yogyakarta",
    "categoryId": "kain-tradisional",
    "name": {
      "id": "Batik Kawung",
      "en": "Kawung Batik"
    },
    "shortDescription": {
      "id": "Motif batik geometris klasik berbentuk irisan buah aren yang melambangkan keadilan dan kesucian hati.",
      "en": "A classic geometric batik motif depicting palm fruit slices, symbolizing justice and purity of heart."
    },
    "description": {
      "id": "Batik Kawung adalah salah satu motif batik tertua di Jawa yang berasal dari Kesultanan Ngayogyakarta Hadiningrat. Pola empat elips yang bertemu di satu titik menggambarkan kiblat papat lima pancer, yakni keseimbangan empat arah mata angin dengan Tuhan sebagai pusat kehidupan.",
      "en": "Kawung Batik is one of the oldest batik patterns in Java, originating from the Yogyakarta Sultanate. Its pattern of four ellipses arranged around a central point represents the cardinal directions with the divine at the center of existence."
    },
    "fact": {
      "id": "Pada zaman dahulu di lingkungan Keraton, motif Kawung hanya boleh dikenakan oleh kalangan bangsawan dan pejabat istana berhati bersih.",
      "en": "Historically within the Royal Court, the Kawung pattern was strictly reserved for nobility and royal officials of upright character."
    },
    "image": "/assets/cultures/di-yogyakarta/batik-kawung.webp",
    "imageAlt": {
      "id": "Kain batik tradisional bermotif Kawung dengan warna soga alami",
      "en": "Traditional batik fabric featuring the Kawung motif with natural soga dye"
    },
    "shopUrl": "https://example.com/shop/batik-kawung",
    "sourceUrl": "https://kebudayaan.kemdikbud.go.id/batik-kawung",
    "imageSourceUrl": "https://commons.wikimedia.org/wiki/File:Batik_Kawung.jpg"
  }
]
```

---

## 5. Fungsi Helper Query Data JSON (`src/utils/contentHelpers.ts`)

File helper ini menggantikan kebutuhan query SQL dengan fungsi pencarian array JavaScript/TypeScript berkecepatan tinggi:

```ts
import provincesJson from '../data/provinces.json';
import categoriesJson from '../data/categories.json';
import culturesJson from '../data/cultures.json';
import type { Province, Category, CultureItem } from '../types/content';

// Cast data JSON ke interface TypeScript
export const provinces: Province[] = provincesJson as Province[];
export const categories: Category[] = categoriesJson as Category[];
export const cultures: CultureItem[] = culturesJson as CultureItem[];

// 1. Dapatkan provinsi berdasarkan ID
// (Mirip: SELECT * FROM provinces WHERE id = ?)
export const getProvinceById = (id: string): Province | undefined => {
  return provinces.find((p) => p.id === id);
};

// 2. Dapatkan seluruh item budaya dari suatu provinsi
// (Mirip: SELECT * FROM cultures WHERE province_id = ?)
export const getCulturesByProvince = (provinceId: string): CultureItem[] => {
  return cultures.filter((c) => c.provinceId === provinceId);
};

// 3. Dapatkan budaya berdasarkan provinsi DAN kategori
// (Mirip: SELECT * FROM cultures WHERE province_id = ? AND category_id = ?)
export const getCulturesByProvinceAndCategory = (
  provinceId: string,
  categoryId: string
): CultureItem[] => {
  return cultures.filter(
    (c) => c.provinceId === provinceId && c.categoryId === categoryId
  );
};

// 4. Dapatkan item budaya spesifik berdasarkan ID
// (Mirip: SELECT * FROM cultures WHERE id = ?)
export const getCultureById = (id: string): CultureItem | undefined => {
  return cultures.find((c) => c.id === id);
};

// 5. Dapatkan kategori aktif yang dimiliki suatu provinsi
export const getActiveCategoriesByProvince = (provinceId: string): Category[] => {
  const province = getProvinceById(provinceId);
  if (!province) return [];
  return categories.filter((cat) => province.categories.includes(cat.id));
};
```

---

## 6. Standar Strategi Gambar (Image Optimization)

Aset foto adalah beban terbesar dalam aplikasi pameran lokal. Terapkan standar ketat:

- **Format Wajib:** **WebP** (Memberikan rasio kompresi tinggi tanpa kehilangan kualitas visual).
- **Resolusi / Dimensi:**
  - Card Image (Koleksi): lebar sekitar **600 – 800 px**.
  - Detail Image (Hero): lebar sekitar **1200 – 1600 px**.
- **Batas Ukuran File:**
  - Target rata-rata per gambar: **150 KB – 500 KB**.
  - **Dilarang keras** memasukkan foto mentah (raw/uncompressed) berukuran 5 MB – 20 MB ke dalam folder project.
- **Kapasitas Penyimpanan Lokal:**
  - 400 gambar × 250 KB ≈ **100 MB** total.
  - Sangat aman bagi komputer kiosk modern.
- **Strategi Pemuatan (Loading):**
  - Gunakan `loading="lazy"` pada semua kartu koleksi.
  - Hanya foto hero halaman yang aktif yang dimuat secara langsung.

---

## 7. Strategi Kuantitas Konten (Content Quantity)

Dalam kurun waktu pembuatan 7 hari, **kualitas jauh lebih penting daripada kuantitas mentah**:

```text
Lebih baik:
2 - 4 karya budaya terpilih berkualitas tinggi per kategori

Daripada:
10 item per kategori tetapi foto pecah, deskripsi copas asal, dan tanpa sumber jelas
```

### Target Realistis MVP:
- Seluruh **38 provinsi** wajib terdaftar dan dapat dibuka.
- Setiap provinsi memiliki minimal 1 foto hero yang representatif.
- Setiap provinsi memiliki minimal 1–3 kategori aktif dengan item budaya yang terkurasi baik.

---

## 8. Daftar Kelengkapan Riset Konten (38 Provinsi)

Bagi kurator konten (Fadil), pastikan data per provinsi memenuhi checklist:

### Level Provinsi:
- [ ] Nama provinsi (ID & EN)
- [ ] Gugus wilayah kepulauan
- [ ] Narasi pengantar 2–3 kalimat (ID & EN)
- [ ] Foto hero berkualitas (WebP, landscape atau portrait)
- [ ] Lisensi & sumber foto hero dicatat

### Level Item Budaya:
- [ ] Nama karya budaya (ID & EN)
- [ ] Kategori budaya yang sesuai
- [ ] Deskripsi ringkas (ID & EN)
- [ ] Deskripsi narasi filosofis (ID & EN)
- [ ] Fakta unik (ID & EN)
- [ ] Foto utama teroptimasi (WebP)
- [ ] URL sumber bacaan (Kemendikbud, Pemda, Museum, UNESCO)
- [ ] URL toko/katalog UMKM mitra (jika ada)

---

## 9. Penelusuran Sumber & Atribusi (Source Tracking)

Prioritaskan sumber informasi yang kredibel:
1. Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek)
2. Portal Resmi Pemerintah Provinsi / Dinas Kebudayaan Daerah
3. Arsip Museum Nasional & Balai Pelestarian Kebudayaan
4. UNESCO World Heritage / Intangible Cultural Heritage
5. Jurnal ilmiah sejarah & antropologi nusantara
6. Wikimedia Commons (untuk foto berlisensi CC BY / CC BY-SA)

Dokumentasikan seluruh lisensi gambar pada berkas `docs/ATTRIBUTIONS.md`.

---

## 10. Validasi Integritas Data JSON

Sebelum build production dijalankan, lakukan validasi data otomatis atau manual:
1. Pastikan seluruh 38 provinsi di `provinces.json` memiliki `id` slug yang unik.
2. Pastikan setiap item di `cultures.json` merujuk ke `provinceId` dan `categoryId` yang valid.
3. Pastikan string dwibahasa `id` dan `en` tidak kosong.
4. Pastikan path file gambar benar-benar ada di folder `public/assets/`.
5. Pastikan properti `shopUrl` berformat URL valid jika diisi.
