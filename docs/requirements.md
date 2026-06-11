# Project Requirements: Retail Sales Dashboard

## 1. Scope
**In-Scope:** - Pembuatan MVP dashboard penjualan (Vue 3 + Tailwind CSS + Shadcn UI).
- Integrasi ke Public API (`/health`, `/metadata`, `/sales`, `/categories`, `/summary`).
- Filter data fungsional sesuai limitasi API.
**Out-of-Scope:** - Authentication/Login.
- Animasi kompleks atau chart interaktif (fokus pada data tabular dan metrik angka untuk MVP).
- Penggunaan parameter `dateFrom` dan `dateTo` pada endpoint `/summary` (diketahui ada bug API).

## 2. Pages
1. **Dashboard (`/`)**: Halaman utama untuk ringkasan metrik.
2. **Sales Explorer (`/sales`)**: Halaman tabel data transaksi.

## 3. Features & Components
**Global:**
- `Sidebar`: Navigasi antar halaman.
- `HealthBadge`: Komponen di header mengecek `/health` (Hijau=OK, Merah=Error).

**Dashboard Page:**
- `SummaryCards`: 4 Shadcn Card menampilkan (Total Revenue, Total Transactions, Avg Order Value, Total Items Sold) dari endpoint `/summary`.
- `BasicFilter`: Shadcn Select (Category, Gender) & Input (Search) untuk memfilter `SummaryCards`. *Jangan gunakan date filter di sini.*

**Sales Explorer Page:**
- `SalesTable`: Shadcn Table menampilkan daftar `/sales`. Wajib mendukung server-side pagination dan sorting.
- `AdvancedFilterSheet`: Shadcn Sheet/Accordion berisi filter lengkap (`search`, `category`, `gender`, rentang tanggal, rentang umur, rentang kuantitas, harga). Gunakan data `/metadata` untuk set batas min/max pada input number/slider.
- `TransactionDetailDialog`: Shadcn Dialog muncul saat baris tabel diklik, memanggil `/sales/{transaction_id}` untuk detail.

## 4. Definition of Done (DoD)
- Semua endpoint API berhasil di-fetch dan di-render tanpa error di console.
- State loading (Skeleton) dan error handling terimplementasi dengan baik.
- Filter berfungsi memperbarui data (re-fetch) dengan debounce pada input text.
- UI responsif (minimal dapat digunakan di resolusi tablet/desktop).

## 5. Tasks Tracker
- [ ] Setup Vue 3 router & views (Dashboard, Sales).
- [ ] Setup layout dasar (Sidebar + Header + HealthBadge).
- [ ] Integrasi `/health` dan `/metadata` (simpan di global state/composables).
- [ ] Buat komponen `BasicFilter` (Search, Category, Gender).
- [ ] Buat `SummaryCards` integrasi dengan `/summary`.
- [ ] Buat `SalesTable` dengan pagination & sorting dasar.
- [ ] Tambahkan `AdvancedFilterSheet` pada halaman Sales.
- [ ] Buat `TransactionDetailDialog` integrasi dengan `/sales/{transaction_id}`.
- [ ] Finalisasi styling & bug fixing.