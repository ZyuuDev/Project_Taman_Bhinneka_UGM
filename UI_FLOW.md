# User Interface Flow & Screen Specifications (UI_FLOW.md)

> Dokumen ini memuat alur interaksi pengguna, spesifikasi teknis tiap layar (Screen 1 hingga 5), implementasi peta interaktif SVG, sistem modal QR handoff, rute navigasi, dan logika idle reset otomatis.

---

## 1. Diagram Alur Layar (Screen Flow)

```text
+-----------------------+
|  Screen 1: Attract    | <------------------------------------+
+-----------------------+                                      |
            |                                                  |
            | (Sentuh Layar)                                   |
            v                                                  |
+-----------------------+                                      |
|  Screen 2: Map        | (Peta Interaktif 38 Provinsi)        |
+-----------------------+                                      |
            |                                                  | Idle Reset
            | (Pilih Provinsi -> Tap "Jelajahi")               | (90 Detik Inaktif)
            v                                                  |
+-----------------------+                                      |
|  Screen 3: Province   | (Info Provinsi & Kategori Budaya)    |
+-----------------------+                                      |
            |                                                  |
            | (Pilih Kategori)                                 |
            v                                                  |
+-----------------------+                                      |
|  Screen 4: Collection | (Daftar Kartu Budaya)                |
+-----------------------+                                      |
            |                                                  |
            | (Pilih Kartu Budaya)                             |
            v                                                  |
+-----------------------+                                      |
|  Screen 5: Detail     | (Foto Besar, Narasi ID/EN, Fakta)    |
+-----------------------+                                      |
            |                                                  |
            +-----> [ Modal QR Code: Lihat Produk ] -----------+
```

---

## 2. Screen 1: Attract Screen (`AttractPage.tsx`)

- **Tujuan:** Menarik perhatian pengunjung dari kejauhan dan memperjelas bahwa layar dapat disentuh.
- **Rute:** `/#/`
- **Elemen Antarmuka:**
  1. Logo dan Tipografi identitas **"WARISAN NUSANTARA"**.
  2. Subtitle: *"Jelajahi Kekayaan Budaya Indonesia"* / *"Explore Indonesia's Cultural Heritage"*.
  3. Visual ilustrasi ornamen tradisional atau motif nusantara yang elegan.
  4. Tombol CTA Utama yang besar dan kontras:
     ```text
     [ SENTUH UNTUK MENJELAJAH ] / [ TOUCH TO EXPLORE ]
     ```
  5. Pengalih bahasa awal (**ID | EN**).
- **Animasi:**
  - Efek denyut (pulse) halus pada tombol CTA (`scale: 1.0` ke `1.03` berulang).
  - Floating lambat pada ornamen latar belakang.
  - Bebas dari video berat dan efek grafis yang menguras memori.

---

## 3. Screen 2: Indonesia Interactive Map (`ExploreMapPage.tsx`)

- **Tujuan:** Pintu gerbang geografis bagi pengunjung untuk memilih satu dari 38 provinsi di Indonesia.
- **Rute:** `/#/explore`
- **Elemen Antarmuka:**
  1. **Header Konsisten:** Judul *"Jelajahi Nusantara"*, instruksi singkat, dan tombol pemilih bahasa.
  2. **Area Peta SVG Interaktif:** Menampilkan seluruh kepulauan Indonesia dengan batas 38 provinsi.
  3. **Province Selection Card (Pop-up Konfirmasi):**
     Ketika sebuah provinsi disentuh pada peta:
     - Bentuk wilayah provinsi berubah warna menjadi warna highlight (Hijau Forest / Kuning Emas).
     - Sebuah kartu preview kecil muncul menampilkan:
       - Nama Provinsi (contoh: *DI Yogyakarta*)
       - Tombol aksi: `[ Jelajahi Provinsi / Explore Province ]`
     - Pengunjung menyentuh tombol tersebut untuk berpindah ke Screen 3.
     *(Alur dua langkah ini mencegah salah sentuh / accidental tap pada layar sentuh besar).*

### Spesifikasi Peta SVG:
- **Sumber Vektor:** Berkas SVG berbasis *Wikimedia Commons — Provinces of Indonesia.svg* (Lisensi CC BY-SA 4.0).
- **Optimasi Touch Target untuk Provinsi Kecil:**
  Wilayah kepulauan kecil seperti DKI Jakarta, DI Yogyakarta, dan Bali harus dilengkapi dengan padding area sentuh transparan atau pin/marker sentuh bantuan agar jari pengunjung dapat memilihnya dengan mudah.

---

## 4. Screen 3: Province Detail (`ProvincePage.tsx`)

- **Tujuan:** Memberikan gambaran umum tentang provinsi yang dipilih serta menampilkan pintu masuk ke berbagai kategori budaya.
- **Rute:** `/#/province/:provinceId` (contoh: `/#/province/di-yogyakarta`)
- **Elemen Antarmuka:**
  1. **Header Navigasi:** Tombol Kembali (`< Back`), Tombol Beranda (`Home`), dan Toggle Bahasa.
  2. **Hero Image Provinsi:** Foto lanskap budaya atau ikon khas provinsi tersebut.
  3. **Metadata Provinsi:**
     - Nama Provinsi (ID & EN)
     - Gugus Kepulauan / Wilayah (Jawa, Sumatera, Kalimantan, Sulawesi, Bali-Nusa Tenggara, Maluku-Papua)
     - Deskripsi Pengantar singkat (2–3 kalimat yang padat dan menarik)
  4. **Grid Kategori Budaya:**
     Menampilkan daftar kategori yang memiliki konten pada provinsi tersebut. Kategori yang kosong **tidak boleh ditampilkan**.

---

## 5. Kategori Budaya Rekomendasi (Universal Categories)

Kategori dirancang universal dan adil untuk mencakup keragaman tradisi seluruh Indonesia:

| Slug ID | Nama (ID) | Name (EN) |
|---|---|---|
| `seni-kriya` | Seni & Kriya | Arts & Crafts |
| `tari` | Seni Tari | Traditional Dance |
| `musik` | Musik & Alat Musik | Music & Instruments |
| `busana` | Pakaian Tradisional | Traditional Attire |
| `rumah-adat` | Arsitektur & Rumah Adat | Traditional Architecture |
| `kuliner` | Kuliner Tradisional | Traditional Cuisine |
| `tradisi` | Upacara & Tradisi | Ceremonies & Rituals |
| `kain-tradisional` | Kain & Tekstil Tradisional | Traditional Textiles |

> 💡 **Prinsip Hormat Budaya:** Gunakan kategori payung seperti `kain-tradisional`, bukan membuat kategori "Batik" secara global, agar daerah yang memiliki songket, ulos, tenun ikat, atau sasirangan tetap terwakili secara tepat.

---

## 6. Screen 4: Culture Collection (`CategoryPage.tsx`)

- **Tujuan:** Menampilkan koleksi karya budaya dari provinsi dan kategori yang dipilih.
- **Rute:** `/#/province/:provinceId/:categoryId` (contoh: `/#/province/di-yogyakarta/kain-tradisional`)
- **Elemen Antarmuka:**
  1. **Breadcrumb / Header:** Nama Provinsi + Nama Kategori yang aktif.
  2. **Grid Kartu Budaya (Culture Cards):**
     - Setiap kartu memuat foto karya budaya berkualitas tinggi.
     - Nama karya budaya (contoh: *Batik Kawung*, *Batik Parang*).
     - Label singkat / sub-kategori jika relevan.
  3. **Touch Feedback:** Efek mikro-kompresi saat disentuh, mengarahkan pengunjung ke Screen 5.

---

## 7. Screen 5: Culture Detail (`CultureDetailPage.tsx`)

- **Tujuan:** Tempat pengunjung membaca kisah mendalam, filosofi, dan sejarah karya budaya tersebut.
- **Rute:** `/#/culture/:cultureId` (contoh: `/#/culture/batik-kawung`)
- **Elemen Antarmuka:**
  1. **Navigasi Atas:** Tombol Kembali, Beranda, dan Pengubah Bahasa.
  2. **Foto Utama (Large Hero Image):** Tampilan visual detail dengan pencahayaan yang baik.
  3. **Judul & Klasifikasi:** Nama budaya, provinsi asal, dan kategori.
  4. **Ringkasan Singkat:** Paragraf pengantar yang mudah dipahami dalam 10 detik.
  5. **Narasi Utama (Story / Description):** Penjelasan sejarah, makna filosofis motif/gerakan/bahan, dan cara pembuatan.
  6. **Fakta Menarik (Did You Know / Fact):** Kotak highlight fakta unik budaya tersebut (opsional).
  7. **Tombol Call-to-Action QR Code:**
     ```text
     [ 📱 Lihat Produk / View Product ]
     ```
     *(Tombol ini hanya muncul jika data budaya memiliki properti `shopUrl`)*.

---

## 8. QR Code Handoff System & Modal (`QRModal.tsx`)

Kiosk pameran tidak digunakan untuk browsing toko online. QR Code berfungsi sebagai **jembatan mulus (handoff)** dari pameran fisik ke gawai pribadi pengunjung:

```text
Kiosk Screen
  |
  +--> Pengunjung tap tombol "Lihat Produk"
  |
  +--> Muncul Pop-up Modal QR Code
  |
  +--> Pengunjung mengarahkan kamera smartphone ke layar
  |
  +--> Smartphone membuka URL toko/produk
  |
  +--> Pengunjung tap "Tutup" pada Kiosk
```

### Spesifikasi Tampilan Modal:
- Judul: *"Pindai QR untuk Melihat Produk"* / *"Scan QR to View Product"*.
- QR Code beresolusi tinggi dengan kontras tajam (hitam di atas latar putih bersih) menggunakan `react-qr-code`.
- Teks petunjuk: *"Arahkan kamera ponsel Anda ke kode ini"*.
- Tombol **Tutup** yang besar dan mudah ditekan.
- Hindari menampilkan URL mentah yang panjang sebagai fokus tampilan.

---

## 9. Aturan Navigasi & Pola Rute (Routing)

Menggunakan **HashRouter** dari `react-router-dom`:

| Pola URL | Halaman Komponen | Keterangan |
|---|---|---|
| `/#/` | `AttractPage` | Layar awal / Standby |
| `/#/explore` | `ExploreMapPage` | Peta interaktif 38 provinsi |
| `/#/province/:provinceId` | `ProvincePage` | Halaman utama provinsi |
| `/#/province/:provinceId/:categoryId` | `CategoryPage` | Daftar karya budaya per kategori |
| `/#/culture/:cultureId` | `CultureDetailPage` | Narasi detail karya budaya |

### Aturan Tombol Navigasi:
- **Tombol Kembali (Back):** Memanggil `navigate(-1)` untuk kembali ke langkah sebelumnya secara alami.
- **Tombol Beranda (Home):** Membawa pengunjung langsung ke `/#/explore` (Peta) agar mereka dapat memilih provinsi lain tanpa harus menekan tombol kembali berkali-kali.

---

## 10. Sistem Idle Reset (`useIdleReset.ts`)

Karena perangkat kiosk berada di ruang publik pameran, layar tidak boleh tertinggal di halaman pengunjung sebelumnya jika ditinggalkan:

- **Batas Waktu (Timeout):** **90 Detik** tanpa interaksi apapun.
- **Aksi saat Timeout:**
  1. Menutup semua modal yang sedang terbuka (misal: modal QR Code).
  2. Mereset pilihan filter atau provinsi aktif.
  3. Mengembalikan bahasa ke Bahasa Indonesia secara default.
  4. Melakukan redirect otomatis ke layar awal: `navigate("/")`.
- **Daftar Event Pemantau Aktivitas:**
  `pointerdown`, `touchstart`, `click`, `keydown`.
  Setiap kali ada sentuhan terdeteksi, timer 90 detik akan di-reset dari nol.

---

## 11. Penanganan Kondisi Error (Error Handling)

1. **Provinsi Tidak Ditemukan:**
   Tampilkan layar bersih bertuliskan *"Data provinsi tidak ditemukan"* + tombol `[ Kembali ke Peta ]`.
2. **Budaya Tidak Ditemukan:**
   Tampilkan *"Konten budaya tidak ditemukan"* + tombol `[ Kembali ]`.
3. **Aset Gambar Tidak Ditemukan / Rusak:**
   Gunakan gambar placeholder lokal berornamen batik elegan. Dilarang membiarkan ikon broken-image bawaan browser tampil di hadapan pengunjung.
