# Kiosk Deployment & Operations Manual (DEPLOYMENT.md)

> Dokumen ini menjelaskan langkah-langkah kompilasi build produksi, konfigurasi web server lokal offline, instruksi browser Kiosk Mode (Chrome/Edge), serta prosedur pemulihan otomatis pada komputer pameran di **GIK UGM**.

---

## 1. Kompilasi Build Produksi (Build Process)

Aplikasi dijalankan dalam bentuk static file murni tanpa Node dev-server saat pameran:

```bash
# 1. Jalankan proses bundling Vite
npm run build
```

Hasil kompilasi akan otomatis disimpan di dalam folder:
```text
dist/
```

Seluruh kode JavaScript, CSS, HTML, peta SVG, dan gambar yang telah dioptimasi terkonsolidasi di folder `dist/` ini. Folder inilah yang akan dipindahkan ke komputer kiosk pameran.

---

## 2. Web Server Statis Lokal (Offline HTTP Server)

Untuk menyajikan folder `dist/` di komputer kiosk tanpa koneksi internet, gunakan server statis ringan seperti `serve`:

### Instalasi Dependency Server:
```bash
npm install serve --save-dev
```

### Konfigurasi Script di `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "kiosk:serve": "serve -s dist -l 4173"
  }
}
```

### Menjalankan Server:
```bash
npm run kiosk:serve
```

Aplikasi sekarang dapat diakses secara lokal pada:
```text
http://localhost:4173
```

---

## 3. Konfigurasi Browser Kiosk Mode

Browser harus dibuka dalam mode **Kiosk**, di mana seluruh antarmuka sistem operasi (taskbar, tab bar, URL address bar, tombol minimize/close) disembunyikan total.

### 3.1 Google Chrome (Windows):
```powershell
chrome.exe --kiosk --incognito --disable-pinch --overscroll-history-navigation=0 http://localhost:4173
```

### 3.2 Microsoft Edge (Windows):
```powershell
msedge.exe --kiosk http://localhost:4173 --edge-kiosk-type=fullscreen
```

### Penjelasan Parameter Kiosk Mode:
- `--kiosk`: Mengunci browser dalam mode layar penuh (fullscreen) permanen.
- `--incognito`: Memastikan tidak ada cache login atau sesi lama yang tersimpan.
- `--disable-pinch`: Mencegah pengunjung melakukan zoom in/out yang merusak layout 9:16.
- `--overscroll-history-navigation=0`: Mencegah navigasi swipe gesture bawaan browser.

---

## 4. Prosedur Auto-Start saat Komputer Dinyalakan (Startup Recovery)

Kiosk di GIK UGM harus menyala otomatis setiap pagi ketika aliran listrik dinyalakan tanpa perlu teknisi melakukan klik manual:

```text
PC Kiosk Dinyalakan
       |
       v
Windows Login Otomatis
       |
       v
Jalankan Script Startup (run-kiosk.bat)
       |
       +--> 1. Nyalakan static HTTP server (port 4173)
       |
       +--> 2. Jeda 3 detik
       |
       +--> 3. Buka Chrome / Edge Kiosk Mode
       |
       v
Aplikasi Warisan Nusantara Siap Digunakan
```

### Contoh Berkas `run-kiosk.bat`:
```bat
@echo off
title Warisan Nusantara Kiosk Launcher
cd /d C:\laragon\www\Project_Taman_Bhinneka_UGM

:: Jalankan static server di background
start /B npx serve -s dist -l 4173

:: Beri jeda 3 detik agar server siap
timeout /t 3 /nobreak > nul

:: Buka browser dalam mode kiosk layar penuh
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --incognito --disable-pinch http://localhost:4173
```

> **Tips:** Masukkan shortcut berkas `run-kiosk.bat` ke dalam folder Windows Startup (`shell:startup`).

---

## 5. Alur Pembaruan Konten Setelah Build (Content Updates)

Karena aplikasi tidak menggunakan CMS online, alur pembaruan konten dilakukan dengan cara:

```text
1. Ubah data di berkas JSON (`src/data/*.json`) atau tambahkan gambar baru di `public/assets/`
2. Lakukan pengujian di mode development (`npm run dev`)
3. Jalankan build ulang: `npm run build`
4. Salin folder dist/ baru ke komputer kiosk
5. Refresh browser kiosk
```

Proses ini sangat cepat (kurang dari 2 menit), mudah dilacak dengan Git, dan bebas risiko gangguan server atau downtime pihak ketiga.

---

## 6. Checklist Verifikasi Lapangan (Kiosk Checklist)

Lakukan pengujian berikut di unit kiosk fisik GIK UGM sebelum hari pameran:

- [ ] **Uji Tanpa Internet:** Cabut kabel LAN dan matikan WiFi di komputer kiosk. Pastikan seluruh 38 provinsi, foto budaya, dan peta SVG dapat dibuka tanpa error.
- [ ] **Uji Layar Sentuh:** Pastikan sentuhan presisi, area tombol nyaman ditekan, dan tidak ada glitch double-tap zoom.
- [ ] **Uji Idle Reset:** Biarkan layar selama 90 detik di halaman detail budaya, pastikan layar kembali otomatis ke Attract Screen.
- [ ] **Uji Scan QR Code:** Uji scan QR Code pada halaman produk menggunakan smartphone Android dan iPhone pengunjung.
- [ ] **Uji Stabilitas Seharian:** Biarkan aplikasi berjalan terus-menerus selama minimal 4 jam untuk memastikan tidak ada memory leak atau browser crash.
