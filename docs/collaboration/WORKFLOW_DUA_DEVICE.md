# Workflow Kolaborasi Dua Device

Dokumen ini mengatur kerja Fairuz dan Fadil beserta AI masing-masing pada satu repository. Tujuannya adalah menjaga `main` stabil, menghindari tabrakan file, dan membuat setiap hasil mudah ditinjau serta digabungkan.

## 1. Prinsip repository bersama

- Kedua device harus menggunakan **remote repository yang sama**.
- `main` adalah branch stabil dan tidak digunakan untuk eksperimen atau pekerjaan langsung.
- Semua perubahan dibuat melalui branch tugas, commit kecil, lalu ditinjau sebelum masuk ke `main`.
- Secara default Fairuz menjadi penjaga integrasi `main`. Peran ini boleh dialihkan melalui kesepakatan eksplisit, tetapi hanya satu orang yang menggabungkan perubahan pada satu waktu.
- Jangan menganggap perubahan lokal di device lain sudah tersedia; perubahan baru dapat dipakai setelah di-commit, di-push, dan diambil dari remote.

## 2. Penamaan branch

Gunakan pola berikut:

- Fairuz/frontend: `fairuz/frontend-<nomor-tugas>-<ringkas>`
- Fadil/konten: `fadil/content-batik-<nomor-tugas>-<ringkas>`

Contoh:

```text
fairuz/frontend-01-foundation
fadil/content-batik-01-research
```

Satu branch hanya memuat satu tugas atau satu hasil yang dapat ditinjau secara mandiri. Jangan memakai ulang branch yang sudah digabungkan untuk tugas baru.

Untuk memasukkan paket aturan dan prompt ini pertama kali, gunakan branch bootstrap satu kali bernama `chore/collaboration-bootstrap`. Branch tersebut hanya boleh memuat dokumentasi kolaborasi dan perubahan pelacakan dokumen, bukan kode aplikasi atau perubahan lokal lain.

## 3. Kepemilikan area kerja

| Pemilik | Area utama | Contoh |
|---|---|---|
| Fairuz + AI frontend | Arsitektur, UI, perilaku aplikasi, tipe, helper, dan konfigurasi | `src/app/`, `src/pages/`, `src/components/`, `src/context/`, `src/hooks/`, `src/layouts/`, `src/types/`, `src/utils/`, konfigurasi build/lint |
| Fadil + AI konten | Data terkurasi dan aset lokal | `src/data/`, direktori aset konten lokal di `public/assets/`, serta catatan sumber/atribusi yang ditentukan tugas |
| Bersama, melalui handoff | Kontrak lintas-area | skema data, konvensi ID, struktur path aset, validator, dan perubahan yang memengaruhi kedua area |

Aturan kepemilikan:

- AI hanya boleh mengubah file yang dinyatakan dalam tugasnya.
- Jangan merapikan, memformat, memindahkan, atau memperbaiki file milik pihak lain tanpa handoff.
- Fairuz menetapkan kontrak TypeScript/skema dan validator awal. Fadil mengisi data sesuai kontrak tersebut.
- Fadil tidak mengubah tipe, helper, atau konfigurasi untuk menyesuaikan data. Jika kontraknya tidak memadai, ajukan perubahan melalui protokol konflik/handoff.
- Fairuz tidak mengubah fakta, terjemahan, sumber, lisensi, atau aset Batik secara sepihak. Masalah konten dikembalikan kepada Fadil.
- File yang tidak tercantum jelas sebagai milik salah satu pihak dianggap **shared** dan tidak boleh diedit tanpa persetujuan.

## 4. Urutan kerja dan dependensi

Pekerjaan awal boleh dimulai paralel:

1. **FAIRUZ-01 — Fondasi tipe:** mengaudit starter, mengaktifkan TypeScript strict, mendefinisikan tipe konten, dan membuat helper lokalisasi. Gateway JSON dan validator dikerjakan pada ID Fairuz berikutnya sesuai `TASKS_FAIRUZ.md`.
2. **FADIL-01 — Riset Batik:** mengumpulkan kandidat Batik, sumber, terjemahan, status lisensi gambar, dan asal provinsi. Pada tahap ini Fadil belum mengubah kontrak atau memasukkan data final ke `cultures.json`.
3. FAIRUZ-01 dan FADIL-01 masing-masing ditinjau, di-commit, serta digabungkan ke `main`. Kontrak FAIRUZ-01 menjadi acuan data, sedangkan matriks FADIL-01 menjadi jejak riset bersama.
4. Fadil membuat branch tugas berikutnya dari `main` yang sudah memuat kedua hasil tersebut, lalu menormalisasi kandidat terverifikasi sesuai kontrak.
5. Setelah kontrak stabil, tugas frontend dan konten berikutnya dapat berjalan paralel selama batas file tetap dipatuhi.
6. Integrasi akhir menjalankan seluruh pemeriksaan aplikasi, data, aset, bilingual, dan offline.

Dalam seluruh dokumen kolaborasi, sebuah dependency dinyatakan **selesai** hanya jika hasilnya telah direview, di-commit, digabungkan ke `main`, dan device penerima sudah mengambil baseline terbaru. Pekerjaan bertumpuk di atas branch yang belum masuk `main` hanya boleh dilakukan jika manusia secara eksplisit menyetujui stacked branch beserta urutan integrasinya.

Jika pekerjaan frontend membutuhkan contoh data sebelum data final tersedia, gunakan fixture minimal yang secara eksplisit ditandai sebagai data pengembangan dan berada dalam area yang disepakati. Fixture tidak boleh tersamar sebagai fakta budaya atau ikut masuk rilis.

## 5. Serah-terima kontrak bersama

Perubahan kontrak mencakup tipe/interface, field wajib/opsional, format ID, relasi province/category, path aset, aturan lokalisasi, dan validator.

Prosedurnya:

1. Pemilik kebutuhan menjelaskan perubahan dan alasannya melalui handoff tertulis.
2. Fairuz mengusulkan perubahan kontrak terkecil beserta contoh data valid.
3. Fadil memeriksa apakah data riset dapat dipetakan tanpa kehilangan informasi penting.
4. Setelah disepakati, perubahan kontrak digabungkan ke `main` sebagai commit/PR tersendiri.
5. Kedua branch aktif mengambil `main` terbaru sebelum melanjutkan pekerjaan yang bergantung pada kontrak.
6. Jangan mengubah kontrak dan melakukan migrasi data besar secara diam-diam dalam satu commit.

Kontrak yang sudah berada di `main` dianggap stabil sampai perubahan berikutnya disetujui melalui prosedur ini.

## 6. Siklus kerja setiap tugas

### Memulai

Pastikan worktree bersih atau seluruh perubahan yang ada sudah dikenali dan dipisahkan. Perintah sinkronisasi jaringan seperti `git pull` hanya dijalankan setelah izin eksplisit manusia.

```powershell
git status --short
git switch main
git pull --ff-only
git switch -c <nama-branch>
```

Jika branch tugas sudah ada, gunakan `git switch <nama-branch>` dan jangan menjalankan `git switch -c` lagi.

Sebelum menulis kode/data, AI wajib membaca `AGENTS.md`, scope aktif, deskripsi tugas, dan spesifikasi yang relevan. Prompt tugas harus menyebut tujuan, file yang boleh disentuh, file yang dilarang disentuh, serta Definition of Done.

### Selama bekerja

- Buat perubahan sekecil mungkin sesuai satu tujuan.
- Periksa `git status` dan `git diff` sebelum commit.
- Jangan memasukkan perubahan yang dibuat orang lain atau file tidak terkait.
- Gunakan pesan commit yang menjelaskan hasil, misalnya `feat(frontend): add language context` atau `content(batik): add verified Yogyakarta entries`.
- Secara default satu ID tugas menghasilkan satu commit koheren setelah review. Commit koreksi tambahan hanya dibuat bila manusia memintanya; jangan mencampurkan ID lain.

### Sebelum menyerahkan

Hanya setelah manusia memberi izin eksplisit untuk menyinkronkan branch, ambil perkembangan `main` terbaru tanpa menulis ulang riwayat remote milik orang lain:

```powershell
git fetch origin
git merge origin/main
```

Jika merge memunculkan konflik atau branch sedang digunakan bersama, hentikan dan koordinasikan strategi integrasi. Jangan menyelesaikan konflik secara otomatis.

Setelah pemeriksaan lulus dan manusia memberi izin eksplisit, push branch lalu buat permintaan review/merge. `main` hanya diperbarui setelah hasil ditinjau.

## 7. Pemeriksaan wajib

Pemeriksaan disesuaikan dengan jenis tugas, tetapi handoff harus mencatat perintah dan hasil aktual—bukan hanya menulis “sudah dites”.

### Tugas frontend atau kontrak

```powershell
npm.cmd run lint
npm.cmd run build
```

Tambahkan test/typecheck khusus jika tersedia di `package.json`. Perbaiki semua error sebelum menyerahkan tugas.

### Tugas data dan aset

- Pastikan seluruh JSON dapat di-parse.
- Jalankan skrip validasi data proyek setelah validator tersedia.
- Pastikan tepat 38 ID provinsi unik.
- Pastikan delapan ID kategori unik dan semua referensi mengarah ke ID yang tersedia.
- Pastikan seluruh item fase ini merupakan Batik dan memakai `categoryId: "kain-tradisional"`.
- Periksa field ID/EN, duplikasi ID, path aset lokal, keberadaan file, atribusi/lisensi, dan `shopUrl` opsional yang sah.
- Jalankan `npm.cmd run lint` dan `npm.cmd run build` setelah data diintegrasikan untuk memastikan import JSON dan aplikasi tetap valid.

Jika nama skrip validator belum ada, handoff harus menyatakan pemeriksaan manual yang dilakukan dan menunggu validator kontrak—bukan mengarang nama perintah yang dianggap lulus.

### Pemeriksaan integrasi

- Uji alur attract → peta → provinsi → kategori → detail.
- Uji provinsi dengan Batik dan provinsi tanpa Batik.
- Uji pergantian ID/EN, fallback gambar, visibilitas QR, idle reset, dan mode offline.
- Pastikan kategori kosong tidak tampil dan tidak ada permintaan jaringan untuk aset aplikasi.

## 8. Larangan operasi berisiko

- Jangan `push --force` atau `push --force-with-lease`.
- Jangan memakai `git reset --hard`, checkout/restore destruktif, atau menghapus branch/file untuk menyelesaikan konflik.
- Jangan menghapus, menimpa, atau memasukkan perubahan lokal milik orang lain.
- Jangan menggabungkan branch sendiri ke `main` tanpa review.
- Jangan menyimpan token, kredensial, atau rahasia di repository.
- Jangan melakukan commit massal yang mencampurkan frontend, konten, aset, dan dokumentasi tanpa alasan integrasi yang disepakati.

Jika langkah pemulihan berpotensi menghilangkan data, berhenti dan minta persetujuan kedua pemilik terlebih dahulu.

## 9. Protokol konflik

Jika terjadi konflik file, kontrak, atau fakta:

1. Hentikan edit pada file yang konflik; jangan memilih versi secara otomatis.
2. Catat branch, commit, file/baris, pemilik area, serta maksud kedua perubahan.
3. Beri tahu pemilik file dan penjaga integrasi `main` menggunakan template handoff.
4. Tentukan hasil yang benar berdasarkan scope aktif dan kontrak di `main`, bukan berdasarkan perubahan yang paling baru.
5. Pemilik area membuat commit resolusi kecil atau memberi persetujuan eksplisit kepada integrator.
6. Jalankan ulang semua pemeriksaan terdampak setelah resolusi.

Untuk konflik fakta budaya atau lisensi, entri dikeluarkan sementara dari data rilis sampai Fadil menyelesaikan verifikasi. Untuk konflik teknis, data tidak boleh dipaksa menyesuaikan dengan menghapus informasi secara sepihak.

## 10. Template handoff AI

Untuk tugas Fairuz atau Fadil, gunakan format handoff khusus pada prompt peran masing-masing karena format tersebut memiliki prioritas. Template di bawah hanya menjadi fallback untuk tugas integrasi/shared yang tidak memiliki format khusus:

```markdown
# HANDOFF <ID-TUGAS>

- Pemilik:
- AI/device:
- Branch:
- Commit terakhir:
- Tujuan tugas:
- Scope/rujukan:
- File yang boleh disentuh:
- File yang dilarang disentuh:

## Hasil
- Perubahan yang selesai:
- Keputusan penting dan alasannya:
- Hal yang sengaja tidak dikerjakan:

## Verifikasi aktual
- Perintah/check:
- Hasil:
- Pemeriksaan manual:

## Data, sumber, dan aset (jika relevan)
- Sumber fakta:
- Sumber/lisensi aset:
- Item yang ditahan dan alasan:

## Risiko atau blocker
- Konflik yang diketahui:
- Dependensi yang belum tersedia:

## Langkah berikutnya
- Penerima handoff:
- Tindakan yang diminta:
- Urutan merge yang disarankan:
```

Handoff yang tidak menyebut hasil verifikasi atau file yang berubah belum siap digabungkan.
