# Mulai Kolaborasi Dua Device di Sini

Dokumen ini adalah petunjuk singkat untuk Fairuz dan Fadil. Detail aturan tetap berada di prompt serta daftar tugas masing-masing.

## 1. Siapkan baseline bersama satu kali

Sebelum kedua AI mulai mengerjakan aplikasi atau konten:

1. Review paket dokumentasi kolaborasi ini.
2. Pastikan perubahan lokal lain sudah dipisahkan; jangan ikut memasukkan perubahan aplikasi yang tidak berkaitan.
3. Dari baseline yang aman, masukkan paket melalui branch satu kali `chore/collaboration-bootstrap`.
4. Commit dan push branch tersebut hanya setelah manusia menyetujuinya, lalu review sebelum merge ke `main`.
5. Pastikan kedua device memakai remote repository yang sama.
6. Pada device Fadil, ambil `main` terbaru setelah paket benar-benar selesai di-merge.
7. Jangan mulai pekerjaan jika worktree berisi perubahan yang tidak dikenali.

Jika `node_modules` belum tersedia pada sebuah device, minta izin manusia sebelum menjalankan instalasi deterministik dari lockfile:

```powershell
npm.cmd ci
```

Perintah tersebut tidak boleh disertai perubahan versi dependency, `package.json`, atau `package-lock.json` oleh jalur Fadil.

AI tidak boleh melakukan commit, push, merge, atau pull request tanpa instruksi eksplisit manusia.

## 2. Mulai dua tugas pertama secara paralel

### Pesan pertama untuk AI Fairuz

Salin pesan berikut pada device Fairuz:

```text
Baca seluruh AGENTS.md, docs/collaboration/CURRENT_SCOPE.md,
docs/collaboration/WORKFLOW_DUA_DEVICE.md,
docs/collaboration/PROMPT_FAIRUZ_FRONTEND.md, dan
docs/collaboration/TASKS_FAIRUZ.md.

Kerjakan hanya FAIRUZ-01.
Gunakan branch fairuz/frontend-01-foundation. Jika branch belum ada,
buat hanya setelah memastikan worktree bersih.
COMMIT: tidak. Jangan push, merge, atau lanjut ke FAIRUZ-02.
Ikuti Definition of Done dan akhiri dengan format handoff wajib.
```

### Pesan pertama untuk AI Fadil

Salin pesan berikut pada device Fadil:

```text
Baca seluruh AGENTS.md, docs/collaboration/CURRENT_SCOPE.md,
docs/collaboration/WORKFLOW_DUA_DEVICE.md,
docs/collaboration/PROMPT_FADIL_CONTENT.md, dan
docs/collaboration/TASKS_FADIL.md.

Kerjakan hanya FADIL-01.
Gunakan branch fadil/content-batik-01-research. Jika branch belum ada,
buat hanya setelah memastikan worktree bersih.
COMMIT: tidak. Jangan push, merge, atau lanjut ke FADIL-02.
Ikuti Definition of Done dan akhiri dengan format handoff wajib.
```

`FAIRUZ-01` dan `FADIL-01` memang dirancang untuk berjalan bersamaan. Fadil hanya membuat matriks riset pada tahap pertama sehingga belum bergantung pada skema final.

## 3. Review sebelum commit

Setelah AI mengirim handoff:

1. Baca ringkasan hasil dan daftar file yang berubah.
2. Pastikan tidak ada file milik jalur lain yang ikut berubah.
3. Pastikan semua pemeriksaan pada handoff benar-benar dijalankan.
4. Jika hasilnya benar, berikan instruksi baru yang eksplisit untuk membuat commit tugas tersebut.
5. Push atau merge hanya setelah commit direview manusia.

Contoh instruksi commit:

```text
Review ulang diff FAIRUZ-01. Jika seluruh Definition of Done masih lulus,
commit hanya file milik FAIRUZ-01 dengan pesan yang sesuai.
Jangan push, merge, atau mulai tugas berikutnya.
```

Ganti ID dengan `FADIL-01` pada device Fadil.

Setelah commit tersebut kembali diperiksa manusia, push dapat diberikan sebagai instruksi terpisah:

```text
Pastikan branch dan commit aktif hanya berisi hasil <ID-TUGAS> yang sudah direview.
Jika benar, push branch aktif ke origin dan laporkan nama branch serta hash commit.
Jangan membuat atau merge pull request dan jangan memulai tugas berikutnya.
```

## 4. Gerbang setelah tugas pertama

- `FAIRUZ-01` dan `FADIL-01` harus sama-sama direview, di-commit, dan digabungkan ke `main` sebelum Fadil mulai menulis data produksi.
- Setelah `main` memuat kontrak data dan matriks riset tersebut, Fadil mengambil baseline terbaru dan baru boleh menerima `FADIL-02`.
- Fairuz dapat menerima `FAIRUZ-02` setelah `FAIRUZ-01` direview dan tersedia di `main`.
- `FAIRUZ-03` menunggu JSON kerangka yang sesuai kontrak dari jalur Fadil.
- Jangan membuka gerbang hanya karena AI menyatakan selesai; gunakan hasil verifikasi dan handoff sebagai bukti.

Pesan pembuka gerbang Fadil:

```text
Kontrak FAIRUZ-01 tersedia di main pada commit <hash-fairuz> dan matriks
FADIL-01 tersedia pada commit <hash-fadil>.
Ambil baseline terbaru hanya setelah memastikan worktree bersih dan setelah
mendapat izin untuk melakukan pull. Kemudian kerjakan hanya FADIL-02 pada
branch fadil/content-batik-02-provinces. COMMIT: tidak. Jangan lanjut ke
FADIL-03 dan akhiri dengan handoff wajib.
```

## 5. Aturan paling penting

- Satu sesi AI hanya mengerjakan satu ID tugas.
- Batik tetap menggunakan kategori `kain-tradisional`; tidak ada kategori `batik`.
- Jangan membuat fakta, gambar, URL toko, atau konten dummy untuk menutup kekosongan.
- Fairuz tidak mengedit data budaya. Fadil tidak mengedit kode aplikasi.
- Provinsi tanpa Batik terverifikasi tetap boleh kosong dan harus ditangani UI dengan ramah.
- Ketika ada konflik atau perubahan tak dikenal, berhenti dan koordinasikan; jangan memilih versi otomatis.
