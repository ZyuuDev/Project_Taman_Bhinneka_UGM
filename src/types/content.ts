export type Language = 'id' | 'en';

export interface LocalizedText {
  id: string;
  en: string;
}

export interface Province {
  id: string;              // Slug unik URL (e.g. "di-yogyakarta", "bali", "aceh")
  code: string;            // Kode ISO wilayah (e.g. "ID-YO", "ID-BA", "ID-AC")
  name: LocalizedText;     // Nama provinsi dalam ID dan EN
  island: LocalizedText;   // Gugus kepulauan (Jawa, Sumatera, Kalimantan, Sulawesi, dll)
  description: LocalizedText; // Narasi pengantar singkat provinsi
  heroImage: string;       // Jalur aset gambar lokal (e.g. "/assets/provinces/di-yogyakarta/hero.webp")
  categories: string[];    // Daftar ID kategori budaya yang aktif di provinsi ini
}

export interface Category {
  id: string;              // Slug kategori (e.g. "kain-tradisional", "tari")
  name: LocalizedText;     // Label kategori ID / EN
  description: LocalizedText; // Deskripsi singkat kategori
  icon: string;            // Nama icon Lucide (e.g. "Scroll", "Sparkles", "Music", "Utensils")
}

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
