# Project Roadmap & Execution Plan (ROADMAP.md)

> Dokumen ini mengatur pembagian tugas antara Fairuz dan Fadil, rencana kerja harian 7 hari (Day 1 - Day 7), kriteria penerimaan (Acceptance Criteria), dan aturan prioritas untuk **Warisan Nusantara**.

---

## 1. Pembagian Peran Tim (Team Division)

| Developer | Fokus Utama | Tanggung Jawab Harian |
|---|---|---|
| **Fairuz** | **Frontend Architecture & Interactivity** | - Arsitektur React + Vite + TypeScript<br>- Sistem Routing & Layout Kiosk Portrait<br>- Implementasi Peta Interaktif SVG<br>- Animasi Motion & Transisi Halaman<br>- Sistem Bahasa & QR Code Modal<br>- Helper Query Data JSON (`contentHelpers.ts`)<br>- Script Build & Kiosk Mode Server |
| **Fadil** | **Content Research & JSON Database** | - Riset metadata 38 Provinsi Indonesia<br>- Kurasi 2–4 karya budaya per kategori<br>- Penerjemahan dwibahasa ID & EN<br>- Penelusuran lisensi & optimasi gambar WebP<br>- Entri database lokal JSON (`provinces.json`, `cultures.json`, `categories.json`)<br>- Verifikasi sumber dan URL referensi |
| **Bersama** | **Quality Assurance & Deployment** | - Uji coba layar sentuh langsung di GIK UGM<br>- Validasi fakta budaya & penulisan istilah lokal<br>- Rehearsal pameran & backup offline |

---

## 2. Rencana Kerja 7 Hari (One-Week Execution Plan)

### Hari 1 (Day 1) — Pondasi Arsitektur & Riset Awal
- **Fairuz:** Inisialisasi React + Vite + TypeScript, setup Tailwind CSS token tema (bone, forest, brown), konfigurasi HashRouter, struktur folder, siapkan file SVG peta Indonesia, definisikan skema tipe di `src/types/content.ts`.
- **Fadil:** Finalisasi daftar 38 provinsi, finalisasi 8 kategori budaya universal, susun template berkas database JSON (`categories.json`, `provinces.json`, `cultures.json`), mulai mengumpulkan folder gambar dan mencatat link sumber.
- **Hasil (Deliverable):** Repo berjalan, desain tema aktif, routing kerangka siap, skema data & database JSON dasar siap.

### Hari 2 (Day 2) — Navigasi Inti & Peta Interaktif
- **Fairuz:** Selesaikan Screen 1 (Attract Screen) dengan animasi pulse ringan. Buat Screen 2 (Peta Interaktif) dengan penanganan tap per provinsi dan visual feedback.
- **Fadil:** Lengkapi metadata 38 provinsi di `src/data/provinces.json` (nama ID/EN, pulau, deskripsi pengantar, foto hero).
- **Hasil (Deliverable):** Alur `Attract Screen -> Peta Interaktif -> Pop-up Provinsi` sudah berfungsi dengan data provinsi nyata.

### Hari 3 (Day 3) — Alur Budaya Lengkap
- **Fairuz:** Bangun Screen 3 (Province Detail) dengan daftar kategori aktif, Screen 4 (Culture Collection Grid), dan Screen 5 (Culture Detail Page) menggunakan helper query data `contentHelpers.ts`.
- **Fadil:** Mulai memasukkan data karya budaya ke `src/data/cultures.json` (nama, narasi filosofis, fakta unik, foto teroptimasi WebP) untuk provinsi-provinsi prioritas.
- **Hasil (Deliverable):** Pengunjung dapat menelusuri dari peta hingga detail cerita budaya secara mulus dari database JSON lokal.

### Hari 4 (Day 4) — Bahasa, QR Code, & Polish Sentuhan
- **Fairuz:** Integrasikan sistem dwibahasa ID/EN (LanguageContext), bangun modal QR Code pop-up, tambahkan mikro-animasi tap sentuh, dan pasang hook timer idle reset (90 detik).
- **Fadil:** Terjemahkan narasi budaya ke bahasa Inggris, hubungkan URL toko UMKM mitra ke properti `shopUrl`, dan lengkapi catatan atribusi foto.
- **Hasil (Deliverable):** MVP selesai secara fungsional (Feature Complete).

### Hari 5 (Day 5) — Kelengkapan Konten 38 Provinsi
- **Fairuz:** Sempurnakan area sentuh pulau-pulau kecil di peta SVG, perbaiki glitch responsif portrait, pastikan fallback gambar rusak berfungsi.
- **Fadil:** Pastikan seluruh 38 provinsi di `provinces.json` telah memiliki konten budaya yang valid di `cultures.json`, periksa kompresi foto agar tidak ada file di atas 500 KB.
- **Hasil (Deliverable):** Seluruh 38 provinsi di Indonesia dapat dibuka tanpa data kosong.

### Hari 6 (Day 6) — Pengujian Lapangan di Kiosk GIK UGM
- **Bersama:**
  - Kompilasi build produksi (`npm run build`).
  - Jalankan di server statis lokal (`serve -s dist -l 4173`).
  - Uji coba Chrome/Edge Kiosk Mode pada PC pameran GIK UGM.
  - Uji tanpa koneksi internet (kabel LAN dicabut, WiFi dimatikan).
  - Uji coba respon layar sentuh dan kestabilan timer idle reset.
  - Perbaiki bug dan kejanggalan visual yang ditemukan.
- **Hasil (Deliverable):** Release Candidate (RC) siap pameran.

### Hari 7 (Day 7) — Finalisasi & Rehearsal
- **Bersama:**
  - Verifikasi akhir seluruh tombol dan modal QR Code.
  - Backup file `dist/` dan repository ke flashdisk/drive eksternal.
  - Konfigurasi script auto-start pada Windows Kiosk GIK UGM.
  - Gladi bersih dan serah terima ke panitia pameran.
- **Hasil (Deliverable):** Aplikasi live dan pameran dibuka untuk publik!

---

## 3. Aturan Prioritas Darurat (Triage Rules)

Jika terjadi kendala teknis atau waktu menjelang pameran semakin menipis, potong fitur ornamen/dekorasi, jangan pernah memotong kestabilan aplikasi inti.

### Urutan Prioritas Penyelamatan:
1. **Aplikasi dapat dibuka & berjalan stabil tanpa crash**
2. **Peta Indonesia dapat disentuh & memilih provinsi**
3. **Seluruh 38 provinsi terdaftar di `provinces.json`**
4. **Halaman Province Detail dapat dibuka**
5. **Kategori budaya tampil**
6. **Halaman Culture Detail menampilkan narasi & foto**
7. **Sistem dwibahasa ID / EN berfungsi**
8. **QR Code modal dapat discan**
9. **Penghalusan animasi transisi**
10. **Aksen dekoratif ornamen latar belakang**

---

## 4. Kriteria Penerimaan (Acceptance Criteria)

Aplikasi dinyatakan **LULUS & SIAP PAMERAN** jika memenuhi checklist:

### Aplikasi & Sistem:
- [ ] Berjalan mulus 100% tanpa internet.
- [ ] Bebas dari critical error di console browser.
- [ ] Navigasi tidak ada yang buntu atau menghasilkan layar putih (blank screen).
- [ ] Kembali ke Attract Screen otomatis setelah 90 detik tanpa sentuhan.

### Peta Indonesia:
- [ ] Seluruh 38 provinsi dapat dipilih.
- [ ] Wilayah yang disentuh memberikan highlight warna jelas.
- [ ] Provinsi berukuran kecil (DKI Jakarta, Bali, DIY) mudah disentuh jari.

### Konten & Database JSON:
- [ ] Data tersimpan rapi di `provinces.json`, `categories.json`, dan `cultures.json`.
- [ ] Setiap provinsi menampilkan nama, pulau, deskripsi, dan hero image yang benar.
- [ ] Halaman kategori hanya memunculkan kategori yang memiliki item.
- [ ] Narasi budaya tersedia dalam Bahasa Indonesia dan English.
- [ ] Seluruh foto tampil tajam dan tidak pecah.

### QR Code:
- [ ] Tombol QR hanya tampil jika item budaya memiliki `shopUrl`.
- [ ] QR Code mudah terbaca oleh kamera smartphone Android maupun iPhone.
- [ ] QR mengarah ke URL produk yang benar.

### Operasional Kiosk:
- [ ] Browser mengunci layar penuh tanpa taskbar atau URL bar Windows.
- [ ] Aplikasi otomatis menyala ketika komputer kiosk dinyalakan.
- [ ] Memori komputer stabil setelah dijalankan berjam-jam.

---

## 5. Definition of Done (DoD)

Warisan Nusantara dinyatakan selesai ketika alur berikut berjalan sempurna:

```text
Pengunjung datang ke pameran
      ↓
Melihat Attract Screen yang elegan
      ↓
Menyentuh layar untuk memulai
      ↓
Memilih provinsi di Peta Interaktif Indonesia
      ↓
Melihat pengantar budaya provinsi (dari provinces.json)
      ↓
Memilih kategori tradisi (Seni, Tari, Tekstil, Kuliner, dll)
      ↓
Membuka karya budaya dan membaca filosofinya (dari cultures.json)
      ↓
Memindai QR Code menggunakan HP untuk katalog produk
      ↓
Meninggalkan layar sentuh
      ↓
Sistem otomatis reset ke Attract Screen dalam 90 detik
```

**Dan seluruh alur ini tetap berfungsi sempurna meskipun internet GIK UGM dalam kondisi mati.**
