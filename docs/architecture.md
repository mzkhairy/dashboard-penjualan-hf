# Architecture & Technical Specifications

## 1. Tech Stack & Environment
- **Node.js:** v24.16.0
- **Package Manager:** npm v11.16.0
- **Core Framework:** Vue.js v3.5.37 (Composition API, `<script setup>`)
- **Build Tool:** Vite v6.0.7
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn-vue (Base: Reka UI)
- **Icons:** Lucide Vue v1.17.0
- **Version Control:** Git v2.43.0

## 2. Project Folder Structure

```text
/
├── docs/                # Folder Dokumentasi & Panduan AI Assistant
│   ├── requirements.md  # Ruang lingkup fitur, halaman, dan Task Tracker
│   ├── design.md        # Spesifikasi tema, warna (Tailwind v4), dan tipografi
│   └── architecture.md  # Spesifikasi teknis ini
├── src/                 # Folder Utama Source Code Aplikasi
│   ├── assets/          # index.css (Tempat konfigurasi variabel Tailwind v4)
│   ├── components/      # Komponen Vue terstruktur
│   │   ├── ui/          # Auto-generated Shadcn/Reka UI (DILARANG MODIFIKASI MANUAL)
│   │   ├── layout/      # Komponen struktural (Sidebar, Header, Layout Utama)
│   │   └── dashboard/   # Komponen spesifik halaman Dashboard (SummaryCards, BasicFilter)
│   ├── composables/     # Logic state & Fetching API reusable (useFetch, dll)
│   ├── lib/             # Fungsi utilitas global (utils.ts bawaan Shadcn)
│   ├── router/          # Konfigurasi rute halaman Vue Router
│   ├── services/        # Client API (Konfigurasi Axios/Fetch, Base URL, Interceptor)
│   ├── views/           # Halaman utama (Dashboard.vue, SalesExplorer.vue)
│   ├── App.vue          # Root component utama aplikasi
│   └── main.ts          # Entry point aplikasi Vue
├── openapi.json         # Dokumentasi spesifikasi API (Referensi skema & tipe data AI)
├── .env.local           # Variabel lingkungan (API URL & API Key)
├── .env.local.example   # Template variabel lingkungan (API URL & API Key, kalau belum ada .env.local buat filenya dari sini)
└── AGENTS.md            # Instruction Prompt Utama untuk AI Assistant (Kilocode)
```
## 3. API Mapping
Catatan: Parameter spesifik, skema request/response, dan tipe data TypeScript WAJIB diekstrak langsung dari file openapi.json di root direktori.

GET /health

Konteks: Menampilkan status sistem (Aktif/Mati) secara global.

Pemicu: Dipanggil saat inisialisasi awal aplikasi (App.vue).

GET /metadata

Konteks: Menyuplai range batas min/max untuk slider/input angka pada filter tingkat lanjut.

Pemicu: Dipanggil saat halaman SalesExplorer.vue di-mount.

GET /categories

Konteks: Menyuplai opsi kategori secara dinamis untuk komponen filter dropdown Select.

Pemicu: Di-load bersamaan dengan mounting komponen filter di kedua halaman.

GET /summary

Konteks: Sumber data utama untuk 4 KPI Cards metrik penjualan.

Pemicu: Halaman Dashboard (/). Re-fetch otomatis berjalan setiap ada perubahan input pada BasicFilter.

GET /sales

Konteks: Sumber data utama untuk komponen SalesTable.

Pemicu: Halaman Sales Explorer (/sales). Re-fetch berjalan saat navigasi halaman (pagination), sorting tabel, atau perubahan filter tingkat lanjut.

GET /sales/{transaction_id}

Konteks: Menampilkan detail lengkap satu transaksi spesifik.

Pemicu: Muncul dalam bentuk TransactionDetailDialog saat baris data pada tabel diklik.

## 4. Known Issues & Workarounds
API Bug pada Endpoint /summary: Penggunaan parameter dateFrom dan dateTo pada endpoint ini mengakibatkan sistem mengembalikan nilai 0 untuk seluruh metrik.

Workaround: Filter berdasarkan rentang tanggal (Date Range Picker) dilarang keras diimplementasikan pada halaman Dashboard. Filter rentang tanggal hanya eksklusif dan fungsional pada halaman Sales Explorer (/sales) melalui endpoint /sales.