# Daftar Tugas Fairuz — Frontend & Aplikasi

Semua tugas berstatus **belum dimulai** saat dokumen ini dibuat. Jalankan tepat satu ID per sesi menggunakan aturan pada `PROMPT_FAIRUZ_FRONTEND.md`. Jangan melompat ke tugas berikutnya hanya karena masih ada waktu.

## Ringkasan urutan

| ID | Tahap | Dependency utama |
|---|---|---|
| `FAIRUZ-01` | Fondasi teknis dan kontrak data | Tidak ada |
| `FAIRUZ-02` | App shell, routing, bahasa, dan navigasi | `FAIRUZ-01` |
| `FAIRUZ-03` | Akses data, validasi, dan state tangguh | `FAIRUZ-01`, `FADIL-02`, `FADIL-03` |
| `FAIRUZ-04` | Attract Screen | `FAIRUZ-02` |
| `FAIRUZ-05` | Peta Indonesia interaktif | `FAIRUZ-02`, `FAIRUZ-03`, data 38 provinsi |
| `FAIRUZ-06` | Province dan Culture Collection | `FAIRUZ-03`, `FAIRUZ-05`, sampel Batik valid |
| `FAIRUZ-07` | Culture Detail dan QR modal | `FAIRUZ-06`, sampel Batik valid |
| `FAIRUZ-08` | Idle reset dan lifecycle sesi kiosk | `FAIRUZ-02`, `FAIRUZ-07` |
| `FAIRUZ-09` | Polish touch, aksesibilitas, dan performa | `FAIRUZ-04`–`FAIRUZ-08` |
| `FAIRUZ-10` | Validasi produksi dan operasi offline | `FAIRUZ-03`, `FAIRUZ-09`, kandidat konten |
| `FAIRUZ-11` | Integrasi konten dan QA end-to-end | `FAIRUZ-10`, `FADIL-11` |
| `FAIRUZ-12` | QA perangkat kiosk dan release | `FAIRUZ-11`, akses perangkat fisik |

## FAIRUZ-01 — Fondasi teknis dan kontrak data

**Tujuan:** Menyiapkan fondasi TypeScript yang menjadi kontrak stabil bagi dua jalur kerja.

**Dependency:** Tidak ada.

**Deliverable:**

- Audit starter Vite, dependency wajib, strictness TypeScript, Tailwind v4, dan script yang sudah tersedia; ubah hanya yang memang kurang.
- Definisikan `Language`, `LocalizedText`, `Province`, `Category`, dan `CultureItem` di `src/types/content.ts` sesuai `DATA_SPEC.md` dan scope Batik-only.
- Buat helper lokalisasi kecil yang type-safe tanpa memasukkan teks budaya.
- Bersihkan artefak demo Vite yang berada di area Fairuz apabila tidak lagi digunakan.
- Serahkan ringkasan kontrak field kepada Fadil melalui format handoff; jangan mengedit JSON milik Fadil.

**Definition of Done:**

- TypeScript strict aktif dan tidak ada untyped `any` baru.
- Kontrak memuat seluruh field wajib/opsional dari `DATA_SPEC.md`, tanpa field khusus Batik yang mengunci ekspansi mendatang.
- `categoryId` tetap generik; catatan handoff menegaskan Batik memakai `kain-tradisional`.
- `npm.cmd run lint`, `npm.cmd run build`, dan `git diff --check` lulus.
- Tidak ada file `src/data/**` atau aset konten yang berubah.

## FAIRUZ-02 — App shell, HashRouter, bahasa, dan navigasi dasar

**Tujuan:** Membuat kerangka aplikasi kiosk yang dapat dinavigasi dan seluruhnya bilingual.

**Dependency:** `FAIRUZ-01` selesai.

**Deliverable:**

- Pasang `HashRouter` dengan lima pola rute dari `UI_FLOW.md` dan fallback rute tidak dikenal.
- Buat `LanguageContext` dengan default Bahasa Indonesia dan API reset bahasa.
- Buat `KioskLayout` portrait berbasis `min-height: 100dvh`.
- Buat komponen dasar `AppButton`, `BackButton`, `HomeButton`, `LanguageToggle`, dan header konsisten.
- Terapkan token tema bone, forest, brown, surface, text, dan border pada `src/index.css`.
- Siapkan Poppins lokal bila berkas font berlisensi sudah tersedia; jangan memakai Google Fonts/CDN. Jika belum tersedia, gunakan fallback aman dan buat permintaan aset.

**Definition of Done:**

- Kelima rute dapat dibuka melalui hash tanpa server rewrite dan tanpa blank screen.
- Tombol Back menggunakan histori, Home menuju `/explore`, dan toggle bahasa memiliki status aktif yang jelas.
- Semua kontrol memiliki target sentuh minimal 56 × 56 px dan feedback sentuh.
- Tidak ada remote font, remote image, atau request API.
- Lint, build, dan diff check lulus.

## FAIRUZ-03 — Gateway data, validasi integritas, dan state tangguh

**Tujuan:** Menghubungkan UI ke JSON lokal tanpa membuat komponen bergantung pada bentuk data mentah.

**Dependency:** `FAIRUZ-01`, `FADIL-02`, dan `FADIL-03` selesai sehingga tiga JSON kerangka telah tersedia dan mengikuti kontrak; `cultures.json` masih boleh berupa array kosong.

**Deliverable:**

- Buat `src/utils/contentHelpers.ts` sebagai satu-satunya gateway query provinsi, kategori, dan budaya.
- Sediakan query by ID, by province, by province + category, dan kategori aktif.
- Hitung kategori aktif dari item budaya yang benar-benar ada; jangan menampilkan kategori kosong hanya karena terdaftar pada metadata.
- Buat pemeriksaan integritas type-safe untuk ID unik, referensi relasi, pasangan teks ID/EN, dan path aset lokal. Pada fase Batik-first, setiap item produksi wajib memiliki `sourceUrl` dan `imageSourceUrl` yang valid; hanya `shopUrl` yang benar-benar opsional.
- Selama staging sebelum `FADIL-10`, path hero yang belum tersedia dilaporkan sebagai warning yang jelas dan ditangani fallback. Validasi release pada `FAIRUZ-10` tetap harus menggagalkannya.
- Buat komponen reusable untuk empty state, not-found/error state, dan gambar dengan fallback lokal.
- Jangan memperbaiki JSON yang gagal validasi; laporkan error spesifik kepada Fadil.

**Definition of Done:**

- Array kosong dan provinsi tanpa Batik tidak menyebabkan crash.
- Dalam scope saat ini, UI hanya dapat mengaktifkan `kain-tradisional` ketika item Batik aktual tersedia.
- Parameter ID yang tidak valid menghasilkan tampilan ramah dwibahasa dengan jalur kembali.
- Broken image tidak pernah menampilkan ikon broken-image browser.
- Pemeriksaan staging membedakan warning aset yang memang menunggu `FADIL-10` dari error relasi atau data yang tidak valid.
- Fixture teknis, bila diperlukan, tidak masuk ke data produksi.
- Lint, build, dan diff check lulus.

## FAIRUZ-04 — Attract Screen

**Tujuan:** Menyelesaikan layar standby yang jelas, menarik, dan ringan.

**Dependency:** `FAIRUZ-02` selesai.

**Deliverable:**

- Implementasikan branding Warisan Nusantara, tagline ID/EN, CTA besar, dan pengalih bahasa.
- CTA mengarah ke `/explore`.
- Tambahkan Motion ambient yang halus serta feedback tap tanpa video/WebGL/partikel.
- Gunakan hanya aset lokal yang telah disetujui atau ornamen CSS non-kultural; jangan membuat klaim/motif budaya baru.

**Definition of Done:**

- Pengunjung memahami bahwa layar harus disentuh dalam 2–3 detik.
- CTA dan bahasa bekerja dengan sentuhan, keyboard dasar, serta ukuran target yang sesuai.
- Layout terbaca pada portrait 9:16 dan tetap aman di ukuran portrait lain.
- Animasi tidak menghambat navigasi dan menghormati `prefers-reduced-motion`.
- Tidak ada request runtime eksternal; lint, build, dan diff check lulus.

## FAIRUZ-05 — Peta Indonesia 38 provinsi interaktif

**Tujuan:** Membuat gerbang geografis dua langkah yang nyaman disentuh.

**Dependency:** `FAIRUZ-02` dan `FAIRUZ-03` selesai; data 38 provinsi dari Fadil tersedia dan lolos kontrak.

**Deliverable:**

- Integrasikan satu SVG peta Indonesia lokal di `src/assets/maps/indonesia-provinces.svg`.
- Petakan setiap path/region SVG ke `Province.id` atau `Province.code` tanpa hard-code konten provinsi di JSX.
- Implementasikan highlight pilihan, kartu konfirmasi nama provinsi, dan tombol “Jelajahi Provinsi”.
- Tambahkan target bantuan/marker untuk wilayah kecil seperti DKI Jakarta, DI Yogyakarta, Bali, dan wilayah lain yang sulit disentuh.
- Sediakan state ramah bila metadata suatu region belum cocok.
- Serahkan URL sumber dan lisensi peta kepada Fadil untuk dicatat pada atribusi.

**Definition of Done:**

- Tepat 38 provinsi dapat dipilih dan menuju ID yang benar.
- Pemilihan memakai alur dua langkah sehingga tap pertama tidak langsung berpindah halaman.
- Nama dan instruksi mengikuti bahasa aktif.
- Tidak ada Google Maps, Geo API, CDN, atau network request.
- Touch test untuk wilayah kecil lulus pada viewport target.
- Lint, build, diff check, dan pemeriksaan console lulus.

## FAIRUZ-06 — Province Detail dan Culture Collection

**Tujuan:** Menyelesaikan alur dari provinsi menuju daftar Batik tanpa menampilkan kategori kosong.

**Dependency:** `FAIRUZ-03` dan `FAIRUZ-05` selesai; minimal satu record Batik valid beserta aset dari Fadil tersedia untuk integrasi.

**Deliverable:**

- Implementasikan `ProvincePage` dengan hero, metadata wilayah, narasi, dan kategori aktif dari helper.
- Implementasikan `CategoryCard`, `CategoryPage`, dan `CultureCard`.
- Gunakan gambar lokal; kartu koleksi memakai `loading="lazy"`.
- Tampilkan empty state dwibahasa bila provinsi belum memiliki item Batik.
- Tangani `provinceId`/`categoryId` yang tidak dikenal dan kombinasi rute yang tidak valid.

**Definition of Done:**

- Provinsi dengan Batik hanya menampilkan kategori `kain-tradisional`.
- Kategori lain dan kategori tanpa item tidak terlihat.
- Provinsi tanpa Batik tetap dapat dibuka, tidak blank/crash, dan tidak berisi data rekaan.
- Kartu membuka rute detail item yang benar.
- Back, Home, serta toggle bahasa konsisten.
- Lint, build, diff check, dan uji rute manual lulus.

## FAIRUZ-07 — Culture Detail dan QR modal

**Tujuan:** Menyajikan narasi Batik dan handoff produk ke ponsel secara aman.

**Dependency:** `FAIRUZ-06` selesai dan tersedia minimal satu record Batik valid.

**Deliverable:**

- Implementasikan `CultureDetailPage` dengan foto, klasifikasi, ringkasan, deskripsi, dan fakta opsional.
- Semua konten berasal dari JSON dan mengikuti bahasa aktif; jangan mengubah atau menambah narasi.
- Implementasikan `QRModal` menggunakan `react-qr-code`, overlay, tombol tutup besar, serta fokus/semantik dialog yang layak.
- Tampilkan CTA QR hanya ketika `shopUrl` tersedia dan valid.
- Tangani culture ID tidak dikenal dan gambar gagal.

**Definition of Done:**

- Pergantian ID/EN memperbarui semua teks pada detail dan modal.
- Item tanpa `fact` tetap rapi; item tanpa `shopUrl` tidak memiliki tombol/ruang QR kosong.
- Kiosk tidak menavigasi ke toko dan tidak melakukan fetch ke `shopUrl`.
- Modal dapat dibuka/ditutup lewat sentuhan dan Escape untuk QA keyboard.
- QR berbentuk SVG, kontras tinggi, dan siap diuji dengan ponsel pada tahap QA.
- Lint, build, diff check, dan uji manual lulus.

## FAIRUZ-08 — Idle reset dan lifecycle sesi kiosk

**Tujuan:** Memastikan setiap sesi pengunjung berakhir bersih setelah 90 detik inaktif.

**Dependency:** `FAIRUZ-02` dan `FAIRUZ-07` selesai.

**Deliverable:**

- Buat `useIdleReset` dengan timeout tepat 90 detik.
- Pantau `pointerdown`, `touchstart`, `click`, dan `keydown` tanpa menggandakan listener/timer.
- Saat timeout: tutup modal, bersihkan pilihan sementara, ubah bahasa ke Indonesia, dan navigasi ke `/`.
- Bersihkan seluruh listener dan timer saat unmount.
- Pastikan aktivitas nyata mereset hitung mundur.

**Definition of Done:**

- Uji diam 90 detik dari halaman detail dan modal menghasilkan Attract Screen dengan bahasa Indonesia serta modal tertutup.
- Aktivitas sebelum timeout menunda reset selama 90 detik berikutnya.
- Tidak ada timer/listener ganda setelah perpindahan rute berulang.
- Tidak ada reload penuh yang tidak perlu.
- Lint, build, diff check, dan pemeriksaan console lulus.

## FAIRUZ-09 — Polish touch, aksesibilitas, responsif, dan performa

**Tujuan:** Menjadikan seluruh alur layak digunakan di layar sentuh portrait seharian.

**Dependency:** `FAIRUZ-04` sampai `FAIRUZ-08` selesai.

**Deliverable:**

- Audit semua target sentuh, feedback tap, focus state, semantik, alt text, kontras, dan navigasi konsisten.
- Uji serta rapikan layout pada rasio 9:16 dan beberapa ukuran portrait tanpa pixel-lock berlebihan.
- Pastikan halaman detail panjang dapat di-scroll dan memberi petunjuk visual yang wajar.
- Terapkan page transition ringan 0,2–0,45 detik dan dukungan reduced motion.
- Audit lazy loading, ukuran render gambar, loop animasi, dan cleanup lifecycle.
- Pastikan tidak ada informasi penting yang hanya muncul saat hover.

**Definition of Done:**

- Semua target interaktif minimal 56 × 56 px sesuai aturan kiosk proyek.
- Semua layar bisa digunakan dengan sentuhan tanpa zoom/gesture browser yang mengganggu.
- Tidak ada overflow horizontal, teks terpotong, atau kontrol tertutup pada viewport portrait yang diuji.
- Tidak ada error/warning kritis di console selama alur berulang.
- Lint, build, dan diff check lulus.

## FAIRUZ-10 — Validasi produksi, build, dan operasi offline

**Tujuan:** Membuat build dapat diperiksa secara konsisten sebelum integrasi akhir.

**Dependency:** `FAIRUZ-03` dan `FAIRUZ-09` selesai; kandidat data/aset Fadil tersedia.

**Deliverable:**

- Tambahkan script validasi data non-destruktif yang memeriksa 38 ID provinsi unik, relasi category/province, teks ID/EN, dan seluruh path aset lokal. Wajibkan `sourceUrl` serta `imageSourceUrl` valid pada setiap item Batik produksi; validasi `shopUrl` hanya bila properti tersebut tersedia.
- Tambahkan script npm yang jelas untuk validasi data dan `kiosk:serve` bila belum tersedia.
- Pastikan build produksi menghasilkan `dist/` dan berjalan melalui static server port 4173.
- Uji refresh langsung pada seluruh pola hash route.
- Lakukan audit runtime offline; catat request eksternal apa pun sebagai kegagalan.
- Jangan mengubah data/aset untuk memaksa validasi lulus; kirim daftar error terstruktur kepada Fadil.

**Definition of Done:**

- Perintah validasi memberi exit code gagal pada masalah integritas dan pesan yang menunjuk record/field terkait.
- Mode release gagal jika hero provinsi atau gambar budaya yang direferensikan belum tersedia, sekalipun fallback UI bekerja.
- `npm.cmd run lint`, validasi data, `npm.cmd run build`, dan `npm.cmd run kiosk:serve` berhasil untuk kandidat yang valid.
- Aplikasi tetap menjalankan alur lokal ketika koneksi jaringan dimatikan.
- Tidak ada dependency runtime backend, CMS, database, font CDN, atau remote image.
- Hasil validasi dan permintaan koreksi konten tercantum pada handoff.

## FAIRUZ-11 — Integrasi content freeze dan QA end-to-end

**Tujuan:** Membuktikan aplikasi bekerja dengan snapshot konten Batik final tanpa mengedit milik Fadil.

**Dependency:** `FAIRUZ-10` dan `FADIL-11` telah direview serta tersedia di `main`; manusia mengonfirmasi hash content freeze Fadil yang akan diuji.

**Deliverable:**

- Jalankan validasi penuh terhadap snapshot konten final.
- Uji alur Attract → Map → Province → `kain-tradisional` → Batik Detail → QR (bila tersedia).
- Uji seluruh 38 provinsi: semua selectable, provinsi tanpa Batik menampilkan empty state, dan tidak ada kategori kosong.
- Uji ID/EN, rute invalid, gambar gagal, `fact` kosong, dan `shopUrl` kosong.
- Uji idle reset serta sesi navigasi berulang.
- Perbaiki hanya bug di area Fairuz; laporkan masalah fakta/data/aset kepada Fadil.

**Definition of Done:**

- Semua 38 provinsi dapat dipilih dan tidak menghasilkan blank screen.
- Semua record Batik final dapat dibuka melalui relasi yang benar.
- Hanya kategori dengan item aktual yang tampil; tidak ada kategori `batik`.
- Semua fallback dan error state bekerja dalam ID/EN.
- Lint, validasi data, build, diff check, console check, dan uji offline lulus.
- Daftar issue tersisa kosong atau setiap issue memiliki pemilik dan status yang jelas.

## FAIRUZ-12 — QA perangkat kiosk dan release candidate

**Tujuan:** Memastikan hasil akhir stabil pada perangkat pameran yang sebenarnya.

**Dependency:** `FAIRUZ-11` selesai dan tersedia akses ke komputer serta layar sentuh kiosk.

**Deliverable:**

- Jalankan build final melalui static server lokal port 4173 pada komputer target.
- Uji Chrome/Edge kiosk mode, portrait fullscreen, sentuhan, wilayah peta kecil, scroll, dan pencegahan gesture yang mengganggu.
- Dengan bantuan manusia, matikan Wi-Fi/LAN lalu ulangi alur lengkap.
- Verifikasi idle reset 90 detik pada detail dan saat QR modal terbuka.
- Dengan bantuan manusia, pindai setiap QR nyata menggunakan minimal Android dan iPhone; lewati item tanpa `shopUrl`.
- Jalankan soak test minimal 4 jam dan periksa crash, memory growth yang tidak wajar, serta error console.
- Siapkan launcher/auto-start hanya setelah path browser dan repo dikonfirmasi manusia; jangan menebak path sistem.
- Serahkan release candidate `dist/` untuk disalin/di-backup oleh manusia.

**Definition of Done:**

- Seluruh alur inti lulus saat komputer kiosk offline.
- Semua target sentuh penting nyaman digunakan pada hardware nyata, termasuk provinsi kecil.
- Idle reset, QR, fullscreen, static server, dan startup recovery telah diuji, bukan diasumsikan.
- Soak test 4 jam selesai tanpa crash/freeze atau kebocoran memori yang material.
- Build final dapat dipulihkan dari backup yang diverifikasi manusia.
- QA fisik tidak boleh diberi status selesai jika hardware, Android, iPhone, atau durasi soak test belum tersedia; tulis blocker secara eksplisit.

## Aturan perubahan urutan

- Tugas boleh dihentikan bila dependency belum siap, tetapi tidak boleh “diselesaikan” menggunakan data palsu.
- Pekerjaan independen hanya boleh didahulukan jika manusia mengganti ID tugas secara eksplisit.
- Bug kritis dari tugas sebelumnya dibuat sebagai instruksi ID tersendiri atau ditangani sebelum task berikutnya dengan persetujuan manusia.
- Setelah setiap ID, gunakan format handoff dari `PROMPT_FAIRUZ_FRONTEND.md` dan tunggu instruksi berikutnya.
