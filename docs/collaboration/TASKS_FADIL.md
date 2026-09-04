# Daftar Tugas Fadil — Konten Batik-First

Dokumen ini membagi jalur konten menjadi unit yang dapat diberikan satu per satu kepada AI di perangkat Fadil. Setiap ID adalah satu paket kerja mandiri. Jangan mengerjakan dua ID sekaligus dan jangan memulai ID selanjutnya tanpa instruksi pengguna.

Semua tugas tunduk pada `AGENTS.md` dan `PROMPT_FADIL_CONTENT.md`.

## Ringkasan Urutan

| ID | Fokus | Dependensi | Boleh paralel dengan Fairuz? |
|---|---|---|---|
| `FADIL-01` | Matriks riset dan kandidat Batik 38 provinsi | Tidak ada | Ya, saat skema dikunci |
| `FADIL-02` | Data 38 provinsi dan kerangka budaya kosong | Gerbang skema + `FADIL-01` | Setelah kontrak data siap |
| `FADIL-03` | Delapan definisi kategori | Gerbang skema | Setelah kontrak data siap |
| `FADIL-04` | Batch Batik Sumatra | `FADIL-01`–`03` | Ya, dengan UI Fairuz |
| `FADIL-05` | Batch Batik Jawa | `FADIL-04` | Ya |
| `FADIL-06` | Batch Batik Bali dan Nusa Tenggara | `FADIL-05` | Ya |
| `FADIL-07` | Batch Batik Kalimantan | `FADIL-06` | Ya |
| `FADIL-08` | Batch Batik Sulawesi | `FADIL-07` | Ya |
| `FADIL-09` | Batch Batik Maluku dan Papua | `FADIL-08` | Ya |
| `FADIL-10` | Hero 38 provinsi dan audit seluruh atribusi | `FADIL-02`, `FADIL-09` | Ya |
| `FADIL-11` | QA final data, aset, sumber, dan handoff integrasi | `FADIL-01`–`10`, `FAIRUZ-10` | Setelah validator produksi tersedia |

Urutan batch menghindari dua AI mengedit `cultures.json` bersamaan. Jika pembagian ini nantinya dikerjakan lebih dari satu kurator, setiap kurator harus bekerja pada file staging terpisah dan integrasi tetap dilakukan satu pemilik.

---

## FADIL-01 — Matriks Sumber dan Kandidat Batik

### Tujuan

Membangun dasar riset yang dapat diaudit untuk seluruh 38 provinsi tanpa menyentuh skema atau data produksi. Tugas ini boleh langsung berjalan paralel saat Fairuz mengunci `src/types/content.ts`.

Karena cakupannya besar, ID ini boleh dilanjutkan dalam beberapa turn AI dengan checkpoint yang jelas. Seluruh turn tersebut tetap merupakan `FADIL-01`; jangan memulai ID lain dan jangan menandainya selesai sebelum status 38 provinsi benar-benar tercatat.

### File yang Boleh Disentuh

- `docs/content-research/batik-source-matrix.csv` saja.

Jangan mengubah `src/data/*.json`, mengunduh aset produksi, atau menyentuh file kode.

### Format Minimum CSV

Gunakan satu header konsisten dengan kolom berikut:

```text
province_id,province_name,candidate_id,batik_name_id,batik_name_en,relationship_claim,primary_source_title,primary_source_owner,primary_source_url,source_published_at,accessed_at,secondary_source_url,verification_status,image_candidate_url,image_creator,image_license,image_license_url,image_verification_status,notes
```

Gunakan CSV valid: escape koma, baris baru, dan tanda kutip sesuai aturan CSV. Gunakan tanggal ISO `YYYY-MM-DD`.

Nilai `verification_status`:

- `verified`: sumber otoritatif secara langsung mendukung nama dan kaitan wilayah;
- `needs_review`: ada sumber, tetapi klaim ambigu atau sumber kredibel saling bertentangan;
- `no_verified_candidate`: belum ditemukan dasar memadai setelah penelusuran wajar.

Nilai `image_verification_status`:

- `license_verified`;
- `permission_required`;
- `unusable`;
- `not_searched`.

### Cakupan Provinsi

Matriks harus mempunyai status untuk tepat 38 provinsi berikut. Slug dan kode final tetap harus dicocokkan dengan kontrak Fairuz sebelum masuk JSON.

**Sumatra (10):** Aceh, Sumatera Utara, Sumatera Barat, Riau, Kepulauan Riau, Jambi, Sumatera Selatan, Kepulauan Bangka Belitung, Bengkulu, Lampung.

**Jawa (6):** DKI Jakarta, Banten, Jawa Barat, Jawa Tengah, DI Yogyakarta, Jawa Timur.

**Bali dan Nusa Tenggara (3):** Bali, Nusa Tenggara Barat, Nusa Tenggara Timur.

**Kalimantan (5):** Kalimantan Barat, Kalimantan Tengah, Kalimantan Selatan, Kalimantan Timur, Kalimantan Utara.

**Sulawesi (6):** Sulawesi Utara, Gorontalo, Sulawesi Tengah, Sulawesi Barat, Sulawesi Selatan, Sulawesi Tenggara.

**Maluku (2):** Maluku, Maluku Utara.

**Papua (6):** Papua, Papua Barat, Papua Selatan, Papua Tengah, Papua Pegunungan, Papua Barat Daya.

Satu provinsi boleh mempunyai lebih dari satu kandidat. Provinsi tanpa kandidat terverifikasi tetap harus mempunyai satu baris status `no_verified_candidate` beserta catatan singkat sumber/tempat yang sudah diperiksa. Jangan menciptakan item agar tabel tampak penuh.

### Langkah Kerja

1. Verifikasi daftar 38 provinsi melalui sumber pemerintah terbaru.
2. Telusuri kandidat Batik menggunakan hierarki sumber dalam prompt induk.
3. Baca sumber asli; jangan mengandalkan cuplikan hasil pencarian.
4. Ringkas tepat klaim hubungan Batik dengan provinsi pada `relationship_claim`.
5. Cari kandidat gambar hanya untuk item yang layak dan cek halaman lisensinya.
6. Tandai keraguan secara eksplisit; jangan mempromosikan kandidat ambigu menjadi `verified`.
7. Tinjau ulang bahwa semua 38 provinsi memiliki status.

### Definition of Done

- CSV dapat diparse dan header tidak berubah antarbaris.
- Tepat 38 provinsi memiliki status cakupan; kandidat tambahan tidak dihitung sebagai provinsi baru.
- Setiap kandidat `verified` mempunyai paling sedikit satu sumber primer/otoritatif yang dapat dibuka.
- Tidak ada URL hasil pencarian, URL contoh, atau jawaban AI sebagai sumber.
- Setiap kandidat gambar mempunyai status izin yang jujur.
- Tidak ada perubahan di luar satu CSV tersebut.
- Handoff menyebut provinsi yang masih `needs_review` atau `no_verified_candidate`.

---

## FADIL-02 — Data 38 Provinsi dan Kerangka Budaya Kosong

### Gerbang

Mulai hanya setelah Fairuz secara eksplisit menyatakan skema data terkunci. Baca tipe aktual dan jangan mengubahnya.

### Tujuan

Mengisi `provinces.json` dengan tepat 38 provinsi resmi, data dwibahasa, dan relasi kategori yang jujur, sekaligus menyediakan `cultures.json` kosong agar kontrak tiga file JSON dapat digunakan frontend sebelum batch Batik masuk.

### File yang Boleh Disentuh

- `src/data/provinces.json`;
- `src/data/cultures.json`;
- `docs/content-research/content-sources.csv` untuk sumber narasi provinsi.

### Ketentuan

- Verifikasi nama resmi, kode wilayah yang dipakai kontrak, slug, dan pengelompokan pulau.
- Gunakan 38 provinsi pada checklist `FADIL-01`, tanpa entri duplikat atau provinsi historis yang sudah dipecah.
- `description.id` dan `description.en` harus ringkas, faktual, serta bersumber.
- `heroImage` menggunakan pola path yang telah disepakati Fairuz. File fisiknya akan diselesaikan pada `FADIL-10`; jangan mengaku batch siap produksi sebelum aset tersebut ada.
- Untuk baseline, gunakan `categories: []`. Pengisian `kain-tradisional` dilakukan hanya ketika batch Batik valid telah masuk.
- Buat `cultures.json` sebagai array JSON kosong (`[]`). Jangan memasukkan kandidat Batik pada tugas ini.
- Jangan menulis kategori lain pada provinsi.
- Catat sumber setiap narasi dalam CSV, termasuk URL, penerbit, tanggal akses, dan provinsi terkait.

### Definition of Done

- JSON valid dan tepat berisi 38 objek.
- Seluruh `id` dan `code` unik.
- Semua field wajib sesuai tipe aktual dan pasangan `id`/`en` tidak kosong.
- Seluruh `categories` masih kosong pada baseline.
- `cultures.json` tersedia, valid, dan masih berupa array kosong.
- Setiap narasi mempunyai rekam sumber.
- Tidak ada perubahan tipe atau kode aplikasi.
- Handoff menandai bahwa hero image masih menunggu `FADIL-10` bila file belum tersedia.

---

## FADIL-03 — Delapan Definisi Kategori Universal

### Gerbang

Mulai hanya setelah skema dikunci Fairuz.

### Tujuan

Menyiapkan definisi kategori universal agar aplikasi siap untuk pembaruan masa depan, tanpa menambahkan konten non-Batik.

### File yang Boleh Disentuh

- `src/data/categories.json` saja.

### Delapan ID Wajib

| ID | Nama ID | Nama EN |
|---|---|---|
| `seni-kriya` | Seni & Kriya | Arts & Crafts |
| `tari` | Seni Tari | Traditional Dance |
| `musik` | Musik & Alat Musik | Music & Instruments |
| `busana` | Pakaian Tradisional | Traditional Attire |
| `rumah-adat` | Arsitektur & Rumah Adat | Traditional Architecture |
| `kuliner` | Kuliner Tradisional | Traditional Cuisine |
| `tradisi` | Upacara & Tradisi | Ceremonies & Rituals |
| `kain-tradisional` | Kain & Tekstil Tradisional | Traditional Textiles |

### Ketentuan

- Tulis deskripsi ID/EN yang netral dan cukup luas untuk ekspansi berikutnya.
- Batik tetap berada di `kain-tradisional`.
- Jangan memasukkan item budaya ke kategori lain.
- Jika tipe memerlukan nama ikon, gunakan hanya nama ikon Lucide yang telah disepakati dengan Fairuz dan tersedia pada versi dependency proyek. Jangan mengubah kode pemetaan ikon.

### Definition of Done

- JSON valid dan tepat berisi delapan kategori di atas.
- Seluruh ID unik dan tidak ada kategori `batik`.
- Seluruh teks ID/EN nonkosong dan setara maknanya.
- Nilai ikon, jika diwajibkan kontrak, tervalidasi dengan implementasi Fairuz.
- Tidak ada perubahan di luar `categories.json`.

---

## Aturan Umum FADIL-04 sampai FADIL-09 — Batch Batik Regional

Setiap batch hanya memasukkan kandidat berstatus `verified` dari matriks. `needs_review` dan `no_verified_candidate` tidak boleh menjadi item produksi.

### File yang Boleh Disentuh pada Setiap Batch

- `src/data/cultures.json`;
- `src/data/provinces.json`, terbatas pada sinkronisasi `categories` untuk provinsi dalam batch;
- `public/assets/cultures/<province-id>/*.webp`, terbatas pada wilayah batch;
- `docs/content-research/batik-source-matrix.csv`, hanya untuk memperbarui status/verifikasi kandidat batch;
- `docs/content-research/asset-attributions.csv`, hanya untuk aset batch.

### Aturan Setiap Item

- Gunakan ID unik dan stabil.
- `provinceId` harus didukung sumber, bukan asumsi dari nama penjual.
- `categoryId` selalu `kain-tradisional`.
- Isi teks ID/EN sesuai tipe aktual dan kebijakan bahasa.
- `sourceUrl` mengarah ke sumber utama yang mendukung klaim inti.
- `imageSourceUrl` mengarah ke halaman sumber asli gambar.
- `image` mengarah ke WebP lokal yang benar-benar ada.
- `shopUrl` dihilangkan kecuali mitra/produk yang sah sudah dikonfirmasi.
- Tambahkan `kain-tradisional` ke `Province.categories` hanya setelah sedikitnya satu item valid untuk provinsi itu ada.
- Biarkan `categories: []` untuk provinsi tanpa item.
- Setiap aset harus memiliki satu baris atribusi lengkap.

### Pemeriksaan Setiap Batch

- Parse ketiga JSON.
- Pastikan tidak ada ID item duplikat.
- Pastikan seluruh item, termasuk item batch lama, tetap merujuk ke provinsi/kategori valid.
- Pastikan setiap path gambar batch ada dan berekstensi `.webp`.
- Cocokkan kategori aktif provinsi dengan keberadaan item.
- Jalankan `git diff --check` serta validasi proyek yang tersedia.
- Jalankan lint/build jika branch Fairuz sudah menyediakan aplikasi yang dapat dibangun.

Jangan menghapus item batch lama untuk mempermudah pekerjaan. Jika ditemukan masalah pada batch lama, laporkan dan minta instruksi sebelum mengubahnya.

---

## FADIL-04 — Batch Batik Sumatra

### Cakupan

Aceh, Sumatera Utara, Sumatera Barat, Riau, Kepulauan Riau, Jambi, Sumatera Selatan, Kepulauan Bangka Belitung, Bengkulu, dan Lampung.

### Definition of Done

- Hanya kandidat terverifikasi dari sepuluh provinsi cakupan yang dimasukkan.
- Provinsi tanpa bukti memadai tetap tanpa item dan disebut dalam handoff.
- Seluruh item dan aset memenuhi aturan batch regional.
- Tidak ada perubahan pada provinsi di luar cakupan kecuali format mekanis yang tidak dapat dihindari; jika terjadi, hentikan dan laporkan sebelum lanjut.

---

## FADIL-05 — Batch Batik Jawa

### Cakupan

DKI Jakarta, Banten, Jawa Barat, Jawa Tengah, DI Yogyakarta, dan Jawa Timur.

### Definition of Done

- Hanya kandidat terverifikasi dari enam provinsi cakupan yang dimasukkan.
- Klaim asal yang berpotensi tumpang tindih antardaerah ditulis setepat sumber; jangan mengklaim kepemilikan tunggal tanpa bukti.
- Seluruh item dan aset memenuhi aturan batch regional.
- Provinsi tanpa item dijelaskan dalam handoff.

---

## FADIL-06 — Batch Batik Bali dan Nusa Tenggara

### Cakupan

Bali, Nusa Tenggara Barat, dan Nusa Tenggara Timur.

### Definition of Done

- Hanya kandidat terverifikasi dari tiga provinsi cakupan yang dimasukkan.
- Jangan mengubah tenun, songket, atau tekstil tradisional non-Batik menjadi Batik agar memenuhi kuota.
- Seluruh item dan aset memenuhi aturan batch regional.
- Provinsi tanpa item dijelaskan dalam handoff.

---

## FADIL-07 — Batch Batik Kalimantan

### Cakupan

Kalimantan Barat, Kalimantan Tengah, Kalimantan Selatan, Kalimantan Timur, dan Kalimantan Utara.

### Definition of Done

- Hanya kandidat terverifikasi dari lima provinsi cakupan yang dimasukkan.
- Bedakan secara akurat antara Batik dan tekstil/kerajinan lokal lain berdasarkan sumber.
- Seluruh item dan aset memenuhi aturan batch regional.
- Provinsi tanpa item dijelaskan dalam handoff.

---

## FADIL-08 — Batch Batik Sulawesi

### Cakupan

Sulawesi Utara, Gorontalo, Sulawesi Tengah, Sulawesi Barat, Sulawesi Selatan, dan Sulawesi Tenggara.

### Definition of Done

- Hanya kandidat terverifikasi dari enam provinsi cakupan yang dimasukkan.
- Hubungan motif, komunitas, dan wilayah tidak digeneralisasi melampaui sumber.
- Seluruh item dan aset memenuhi aturan batch regional.
- Provinsi tanpa item dijelaskan dalam handoff.

---

## FADIL-09 — Batch Batik Maluku dan Papua

### Cakupan

Maluku, Maluku Utara, Papua, Papua Barat, Papua Selatan, Papua Tengah, Papua Pegunungan, dan Papua Barat Daya.

### Definition of Done

- Hanya kandidat terverifikasi dari delapan provinsi cakupan yang dimasukkan.
- Jangan melabeli kain tradisional, teknik hias, atau produk bermotif Papua/Maluku sebagai Batik tanpa sumber yang jelas menyebut teknik/produk tersebut Batik.
- Hindari mengatribusi satu tradisi kepada provinsi hasil pemekaran jika sumber hanya menyebut wilayah Papua/Maluku secara umum.
- Seluruh item dan aset memenuhi aturan batch regional.
- Provinsi tanpa item dijelaskan dalam handoff.

---

## FADIL-10 — Hero Provinsi dan Audit Atribusi Aset

### Tujuan

Memastikan seluruh path gambar produksi mempunyai file lokal yang layak dan rekam lisensi lengkap, termasuk hero untuk tepat 38 provinsi.

### File yang Boleh Disentuh

- `public/assets/provinces/<province-id>/*.webp`;
- `public/assets/cultures/<province-id>/*.webp`, hanya untuk memperbaiki kekurangan yang sudah teridentifikasi;
- `src/data/provinces.json`, terbatas pada koreksi `heroImage`;
- `src/data/cultures.json`, terbatas pada koreksi path gambar;
- `docs/content-research/asset-attributions.csv`;
- `docs/content-research/content-sources.csv`, jika sumber gambar juga menjadi sumber fakta provinsi.
- `docs/ATTRIBUTIONS.md`, sebagai daftar atribusi aset yang siap dibaca manusia;
- `docs/CONTENT_SOURCES.md`, sebagai indeks sumber konten produksi.

### Langkah Kerja

1. Buat daftar seluruh path `heroImage`, `image`, dan `images` dari JSON.
2. Pastikan setiap path mempunyai file lokal tunggal yang benar.
3. Verifikasi lisensi dari halaman asli setiap gambar.
4. Tolak dan ganti aset dengan status hak cipta tidak jelas.
5. Konversi/optimalkan ke WebP sesuai standar ukuran tanpa mengubah makna gambar.
6. Lengkapi satu baris atribusi per file lokal.
7. Sinkronkan catatan final ke `docs/ATTRIBUTIONS.md` dan `docs/CONTENT_SOURCES.md` tanpa menghilangkan detail audit dari CSV.
8. Periksa tidak ada URL gambar runtime, file sementara, duplikat tak terpakai, atau aset mentah besar.

### Definition of Done

- Tepat 38 provinsi memiliki hero lokal yang path-nya valid.
- Semua item Batik memiliki gambar utama lokal yang path-nya valid.
- Setiap aset produksi memiliki pencipta/sumber/lisensi/tanggal akses/transformasi/status izin yang lengkap.
- Dokumen atribusi dan indeks sumber manusiawi sesuai dengan CSV audit serta tidak memiliki entri yatim.
- Tidak ada aset `permission_required`, `unusable`, atau lisensi tidak jelas yang direferensikan JSON.
- Semua gambar produksi adalah WebP, proporsional, dan berada dalam target ukuran atau mempunyai alasan terdokumentasi.
- JSON tetap valid dan hanya path yang dibutuhkan yang berubah.

---

## FADIL-11 — QA Final dan Handoff Integrasi

### Tujuan

Menutup jalur konten dengan audit menyeluruh sebelum Fairuz mengintegrasikan atau merilis build kiosk.

### Dependency

`FADIL-01` sampai `FADIL-10` dan `FAIRUZ-10` telah direview serta tersedia di `main`, sehingga skrip validator produksi dapat dijalankan terhadap snapshot konten.

### File yang Boleh Disentuh

Pada awal tugas, lakukan audit baca-saja. Koreksi hanya file milik Fadil berikut jika audit menemukan masalah:

- `src/data/provinces.json`;
- `src/data/categories.json`;
- `src/data/cultures.json`;
- `public/assets/provinces/**`;
- `public/assets/cultures/**`;
- `docs/content-research/*.csv`.

Jangan memperbaiki kode UI, helper, tipe, atau konfigurasi.

### Checklist QA

- [ ] `provinces.json` tepat 38 entri; ID dan kode unik.
- [ ] `categories.json` tepat delapan entri; tidak ada kategori `batik`.
- [ ] `cultures.json` hanya berisi Batik terverifikasi dengan `categoryId: "kain-tradisional"`.
- [ ] Semua relasi `provinceId`/`categoryId` valid.
- [ ] Semua teks wajib ID/EN nonkosong dan terjemahan tidak menambah klaim.
- [ ] Setiap item mempunyai sumber fakta utama yang layak.
- [ ] Setiap path gambar menunjuk ke file WebP lokal yang ada.
- [ ] Setiap file produksi mempunyai atribusi dan lisensi lengkap.
- [ ] Tidak ada `shopUrl` contoh, tidak sah, atau belum dikonfirmasi.
- [ ] `Province.categories` sama persis dengan keberadaan item terverifikasi.
- [ ] Provinsi tanpa Batik tidak mempunyai item palsu dan tetap memiliki data dasar yang valid.
- [ ] Tidak ada konten budaya non-Batik pada fase ini.
- [ ] Tidak ada referensi gambar eksternal yang diperlukan saat runtime.
- [ ] Tidak ada file mentah besar, sementara, atau tidak terpakai dalam direktori aset milik Fadil.
- [ ] CSV sumber dapat diparse dan tidak kehilangan atribusi.
- [ ] `git diff --check` lulus.
- [ ] Script validasi data, lint, dan build lulus; kegagalan di luar jalur konten dicatat tanpa mengubah kode Fairuz.

### Handoff Akhir Tambahan

Selain format handoff induk, sertakan:

- jumlah tepat item Batik final;
- daftar provinsi yang memiliki item;
- daftar provinsi yang sengaja kosong karena belum ada bukti memadai;
- jumlah aset hero dan aset budaya;
- daftar seluruh lisensi yang digunakan;
- semua keputusan yang masih membutuhkan persetujuan manusia;
- commit yang harus diambil Fairuz dan urutan penerapannya.

### Definition of Done

- Semua checklist QA berstatus lulus atau kegagalan dinyatakan sebagai blocker secara eksplisit.
- Tidak ada klaim, gambar, atau tautan toko yang “diasumsikan benar”.
- Fairuz dapat mengintegrasikan hasil hanya dari handoff tanpa menebak relasi, urutan commit, atau status lisensi.
- AI berhenti setelah handoff dan tidak mulai mengubah UI atau mengisi kategori berikutnya.

---

## Prompt Singkat untuk Memberikan Tugas

Pemilik proyek dapat memberi AI Fadil instruksi berikut setelah kedua dokumen dibaca:

```text
Baca AGENTS.md, docs/collaboration/PROMPT_FADIL_CONTENT.md, dan docs/collaboration/TASKS_FADIL.md. Kerjakan hanya FADIL-XX. Patuhi batas file, gerbang dependensi, validasi, keselamatan Git, dan format handoff. Jangan mulai ID berikutnya.
```

Untuk pekerjaan pertama, ganti `FADIL-XX` dengan `FADIL-01`. Tugas tersebut aman berjalan paralel saat Fairuz menyelesaikan dan mengunci kontrak data.
