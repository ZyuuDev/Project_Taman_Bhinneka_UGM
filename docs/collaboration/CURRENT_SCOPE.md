# Scope Aktif — Fase Batik-First

**Status:** berlaku sebagai acuan konten fase saat ini  
**Tanggal berlaku:** 3 September 2026

## 1. Tujuan fase

Fase ini memprioritaskan alur aplikasi yang lengkap dan konten Batik yang dapat dipertanggungjawabkan. Struktur aplikasi tetap disiapkan untuk seluruh kategori budaya, tetapi pengisian konten kategori lain ditunda ke pembaruan berikutnya.

Dokumen ini adalah penjelas scope konten yang otoritatif untuk fase Batik-first. Jika dokumen spesifikasi lama meminta jumlah konten yang lebih luas—misalnya minimal beberapa kategori aktif di setiap provinsi atau beberapa item pada setiap kategori—target kuantitas tersebut ditangguhkan dan dokumen ini yang berlaku. Seluruh persyaratan teknis, keamanan, aksesibilitas sentuh, bilingual, offline-first, dan larangan fitur di luar MVP tetap berlaku.

## 2. Cakupan data wajib

### Provinsi

- `provinces.json` harus memuat **tepat 38 provinsi Indonesia** dengan ID unik dan relasi yang valid.
- Semua provinsi harus dapat dipilih dan halaman detailnya harus dapat dibuka tanpa crash.
- Keberadaan provinsi tidak boleh bergantung pada ketersediaan item Batik.

### Delapan kategori universal

`categories.json` tetap menyimpan tepat delapan definisi kategori universal berikut agar kontrak data siap digunakan pada pembaruan selanjutnya:

| ID | Nama Indonesia | Nama Inggris |
|---|---|---|
| `seni-kriya` | Seni & Kriya | Arts & Crafts |
| `tari` | Seni Tari | Traditional Dance |
| `musik` | Musik & Alat Musik | Music & Instruments |
| `busana` | Pakaian Tradisional | Traditional Attire |
| `rumah-adat` | Arsitektur & Rumah Adat | Traditional Architecture |
| `kuliner` | Kuliner Tradisional | Traditional Cuisine |
| `tradisi` | Upacara & Tradisi | Ceremonies & Rituals |
| `kain-tradisional` | Kain & Tekstil Tradisional | Traditional Textiles |

Kategori **Batik tidak boleh dibuat sebagai kategori baru**. Semua item Batik menggunakan `categoryId: "kain-tradisional"`.

### Item budaya

- Pada fase ini, `cultures.json` hanya boleh berisi entri Batik yang sudah diverifikasi.
- Kategori selain `kain-tradisional` belum memiliki item budaya. Definisinya tetap dipertahankan, tetapi kategori kosong tidak ditampilkan sebagai pilihan aktif di UI.
- `kain-tradisional` hanya ditampilkan sebagai kategori aktif pada provinsi yang memiliki sedikitnya satu entri Batik terverifikasi.
- Jangan membuat item dummy, entri pengisi, fakta sementara yang disajikan sebagai fakta, atau klaim hubungan Batik dengan suatu provinsi hanya untuk memenuhi kuota.
- Jumlah item per provinsi mengikuti hasil verifikasi. Tidak ada target minimum Batik yang boleh mengalahkan akurasi.

## 3. Standar verifikasi konten

Sebuah item Batik baru boleh masuk ke data aplikasi setelah:

1. Nama atau motif, asal/provinsi, narasi utama, dan fakta uniknya didukung sumber yang kredibel.
2. Atribusi provinsi tidak hanya disimpulkan dari nama penjual, marketplace, atau unggahan media sosial.
3. Teks Indonesia dan Inggris tersedia serta memiliki makna yang setara.
4. Sumber fakta, sumber gambar, pencipta/pemilik jika diketahui, dan ketentuan lisensi dicatat sesuai kontrak data dan dokumen atribusi proyek.
5. Data lolos validasi skema, referensi ID, dan pemeriksaan duplikasi.

Sumber yang diutamakan adalah lembaga pemerintah, museum, lembaga kebudayaan, UNESCO, institusi pendidikan, atau penerbit tepercaya. Jika sumber saling bertentangan dan belum dapat diselesaikan, entri ditahan dari `cultures.json` sampai ada verifikasi yang memadai.

## 4. Provinsi tanpa Batik terverifikasi

Provinsi yang belum memiliki entri Batik terverifikasi tetap tersedia di peta dan halaman detail. Halaman tersebut tidak boleh menampilkan item rekaan atau kategori kosong. Tampilkan empty state yang ramah dan bilingual, minimal dengan makna berikut:

- ID: **“Konten Batik untuk provinsi ini sedang disiapkan.”**
- EN: **“Batik content for this province is being prepared.”**

Teks akhir harus melalui sistem lokalisasi aplikasi, bukan di-hard-code hanya dalam satu bahasa.

## 5. Aset dan konektivitas

- Semua gambar yang digunakan kiosk harus disimpan sebagai aset lokal di repo; hotlink ke gambar eksternal dilarang.
- Utamakan WebP yang telah dioptimalkan dan tetap layak dilihat pada layar kiosk.
- Setiap aset harus memiliki sumber dan izin/lisensi penggunaan yang jelas. Jangan memakai gambar hanya karena dapat ditemukan lewat mesin pencari.
- Sediakan fallback lokal agar kegagalan gambar tidak menghasilkan ikon gambar rusak.
- Aplikasi harus tetap berfungsi penuh tanpa internet. Riset dan pengunduhan aset terjadi saat pengembangan, bukan saat aplikasi kiosk berjalan.

## 6. Aturan `shopUrl`

- `shopUrl` bersifat opsional.
- Isi hanya jika ada tautan toko/mitra yang sah, relevan dengan item, dan telah disetujui untuk digunakan.
- Jangan memakai URL contoh, URL rekaan, hasil pencarian, atau tautan yang tidak dapat diverifikasi.
- Jika `shopUrl` kosong atau tidak tersedia, tombol dan modal QR tidak ditampilkan.
- Tautan eksternal dibuka oleh ponsel pengunjung setelah pemindaian QR; kiosk tidak bergantung pada tautan tersebut untuk menjalankan alur utama.

## 7. Yang ditunda ke pembaruan berikutnya

Pengisian konten untuk `seni-kriya`, `tari`, `musik`, `busana`, `rumah-adat`, `kuliner`, dan `tradisi` secara eksplisit **ditunda**. Konten tekstil non-Batik juga tidak menjadi target fase ini. Penundaan ini tidak menghapus kategori atau dukungan teknisnya dan bukan izin untuk menambah fitur di luar MVP.

Perluasan konten hanya dimulai setelah fase Batik-first selesai, lolos pemeriksaan data, dan disepakati sebagai scope pembaruan berikutnya.

## 8. Kriteria selesai fase konten

Fase Batik-first dianggap siap diintegrasikan jika:

- tepat 38 provinsi tersedia dan dapat dibuka;
- delapan definisi kategori universal tetap valid;
- seluruh item di `cultures.json` adalah Batik terverifikasi dengan `categoryId` `kain-tradisional`;
- kategori kosong tersembunyi dan provinsi tanpa item menampilkan empty state ID/EN;
- seluruh gambar aplikasi tersedia secara lokal, memiliki fallback, serta sumber/lisensi tercatat;
- `shopUrl` yang tidak sah atau belum pasti dibiarkan kosong;
- lint, build, dan validasi data proyek lulus.
