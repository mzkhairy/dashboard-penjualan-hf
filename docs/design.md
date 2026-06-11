# Design Specifications

## 1. Tema & Referensi Visual
- **Style:** Clean, corporate, modern dashboard.
- **Layout Reference:** Sidebar navigation di kiri, content area di kanan dengan top cards untuk metrik.
- **Color Theme Reference:** Terang (Light mode) dengan identitas warna Hijau korporat ("Hijrahfood" theme).
- **Font:** Inter (Bawaan inisialisasi Shadcn).

## 2. Color Palette (Tailwind v4 CSS Variables)
Karena menggunakan Tailwind v4, modifikasi warna dilakukan pada file CSS utama (misal: `src/assets/index.css` atau `src/assets/tailwind.css`), bukan `tailwind.config.js`. Gunakan base "Neutral" bawaan Shadcn, lalu timpa variabel primary dengan hijau korporat:
- `--primary`: `142 65% 24%` (Setara dengan #166534 / Green 800).
- `--primary-foreground`: `0 0% 100%` (Putih).
- Latar belakang (`--background` / `--surface`) ikuti default Neutral Shadcn (terang/putih).

## 3. Layout Structure
- **Container Utama:** `flex h-screen w-full bg-background`.
- **Sidebar:** Fixed width (e.g., `w-64`), border kanan solid, background `bg-card`.
- **Main Area:** `flex-1 flex-col overflow-y-auto`.
- **Header:** Padding atas standard, menampung judul halaman dan `HealthBadge` di sudut kanan.

## 4. Spacing System
Gunakan standar spacing Tailwind CSS secara konsisten:
- **Page Padding:** `p-6` atau `p-8`.
- **Card Padding:** `p-4` atau `p-6`.
- **Gaps (Flex/Grid):** `gap-4` untuk jarak antar card, `gap-2` untuk jarak antar filter/tombol.

## 5. Typography
- **Headings:**
  - H1 (Page Title): `text-2xl font-bold text-foreground text-primary`.
  - H2 (Card Title/Section): `text-lg font-semibold text-foreground`.
- **Body:** `text-sm text-foreground`.
- **Muted/Small:** `text-xs text-muted-foreground`.