Retail Dashboard & Sales Explorer

Proyek ini adalah Retail Dashboard berbasis web yang dibangun menggunakan Vue 3, Vite, dan Tailwind CSS. Aplikasi ini dirancang untuk memonitor metrik penjualan secara real-time dan memberikan fitur eksplorasi data penjualan tingkat lanjut untuk kebutuhan analisis bisnis.

🚀 Fitur Utama
Dashboard Agregat

Menampilkan metrik utama seperti:

Total Revenue
Total Transactions
Average Order Value
Total Items Sold
Sales Explorer
Tabel data transaksi dengan fitur server-side pagination.
Tampilan detail transaksi melalui modal.
Advanced Filtering

Sistem penyaringan data yang kompleks mencakup:

Kategori
Gender
Rentang usia
Kuantitas
Harga
Periode tanggal
Health Monitoring

Indikator status kesehatan sistem langsung dari API backend.

Containerized

Siap untuk dideploy menggunakan Docker dengan multi-stage build untuk efisiensi image.

🛠️ Stack Teknologi
Frontend
Vue 3 (Composition API)
Vue Router
Pinia
UI Components
Shadcn-vue
Tailwind CSS
Lucide Vue Next
Data Fetching
Custom Composable (useFetch)
Containerization
Docker
Nginx
Build Tool
Vite
📦 Instalasi & Menjalankan Aplikasi
Pengembangan Lokal

Pastikan Node.js v24+ telah terinstal.

1. Clone repository dan install dependensi
npm install
2. Buat file .env.local di root direktori
VITE_API_BASE_URL=your_api_url
VITE_API_KEY=your_api_key
3. Jalankan server pengembangan
npm run dev
🐳 Menggunakan Docker

Pastikan Docker telah terinstal di sistem Anda, lalu jalankan perintah berikut untuk menjalankan aplikasi pada port 8080:

docker-compose up --build

Aplikasi akan dapat diakses melalui:

http://localhost:8080
📂 Struktur Proyek
src/
├── components/    # Komponen UI modular (Shadcn, Dashboard Components, Layout)
├── composables/   # Logika reusable untuk data fetching (useSummary, useMetadata, dll)
├── views/         # Views utama aplikasi (Dashboard.vue, SalesExplorer.vue)
└── types/         # Definisi interface TypeScript untuk API response
⚖️ Lisensi

Proyek ini bersifat open-source untuk keperluan portofolio.