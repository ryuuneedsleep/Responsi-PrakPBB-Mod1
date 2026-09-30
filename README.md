# Library Loan Management API

RESTful API untuk sistem pencatatan dan pengelolaan peminjaman buku perpustakaan yang dibangun menggunakan Node.js, Express.js, dan Supabase (PostgreSQL), serta dikonfigurasi untuk deployment serverless di Vercel.

---

## Production URL
- **Live Deployment**: `https://responsi-prak-pbb-mod1.vercel.app`
- **Base Endpoint**: `https://responsi-prak-pbb-mod1.vercel.app/api/loans`

---

## Fitur Utama
- **Arsitektur MVC-like**: Pemisahan tanggung jawab yang rapi antara `config`, `models`, `controllers`, dan `routes`.
- **Operasi CRUD Lengkap**: Penambahan, pembacaan, pembaruan, dan penghapusan data peminjaman buku.
- **Relasi Database (Foreign Key JOIN)**: Menampilkan detail entitas buku (`books`) dan anggota (`members`) secara bersarang (*nested JSON*).
- **Filter Query Parameter**: Kemampuan menyaring peminjaman berdasarkan status secara dinamis via query URL (misal: `?status=Terlambat`).
- **Serverless Ready**: Dikonfigurasi dengan `vercel.json` untuk *deployment* instan di infrastruktur Vercel.

---

## Skema Database

Sistem menggunakan tiga tabel relasional di Supabase:

### 1. `books`
| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | UUID | Primary Key, default `gen_random_uuid()` |
| `title` | TEXT | Judul buku |
| `author` | TEXT | Nama penulis |
| `published_year` | INTEGER | Tahun penerbitan |

### 2. `members`
| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | UUID | Primary Key, default `gen_random_uuid()` |
| `name` | TEXT | Nama lengkap anggota |
| `email` | TEXT | Alamat email unik anggota |

### 3. `loans`
| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | UUID | Primary Key, default `gen_random_uuid()` |
| `book_id` | UUID | Foreign Key mengarah ke `books(id)` |
| `member_id` | UUID | Foreign Key mengarah ke `members(id)` |
| `borrow_date` | DATE | Tanggal mulai peminjaman |
| `return_date` | DATE | Tanggal pengembalian (nullable) |
| `status` | TEXT | Nilai valid: `'Dipinjam'`, `'Dikembalikan'`, `'Terlambat'` |

---

## Panduan Instalasi & Menjalankan di Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18 atau lebih baru
- [Git](https://git-scm.com/)
- Akun dan project aktif di [Supabase](https://supabase.com/)

### Langkah Setup

1. **Clone Repositori**
   ```bash
   git clone [https://github.com/ryuuneedsleep/Responsi-PrakPBB-Mod1.git](https://github.com/ryuuneedsleep/Responsi-PrakPBB-Mod1.git)
   cd Responsi-PrakPBB-Mod1
2. **Instal Dependensi**
   ```bash
   npm install
   ```
3. **Konfigurasi Environment Variables**
   Buat file `.env` pada direktori root dengan konten berikut (sesuaikan nilainya dengan kredensial Supabase Anda):
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-supabase-key
   PORT=5000
   ```
4. **Jalankan Server Development**
   ```bash
   npm start
   ```
   Server akan berjalan pada `http://localhost:5000`.
5. **Verifikasi Koneksi Database**
   Pastikan server berhasil terhubung ke database Supabase dengan mengecek *log output* saat server startup.

---

## Endpoint API Detail

### 1. Ambil Semua Peminjaman (GET /api/loans)
Menampilkan list data peminjaman. Mendukung *query parameter* `?status` untuk memfilter data.

**Contoh Request:**
```http
GET /api/loans?status=Terlambat
```

**Contoh Response (200 OK):**
```json
[
    {
        "id": "e4293f9c-5bf6-4b67-a0e2-6d43e53613a1",
        "book_id": "8f8742ca-b06f-40c2-b2d9-10e6d62a3f91",
        "member_id": "76df17d8-eb1a-47d3-9824-00d9841f3914",
        "borrow_date": "2026-09-01",
        "return_date": null,
        "status": "Terlambat",
        "books": {
            "id": "8f8742ca-b06f-40c2-b2d9-10e6d62a3f91",
            "title": "Clean Architecture",
            "author": "Robert C. Martin",
            "published_year": 2017
        },
        "members": {
            "id": "76df17d8-eb1a-47d3-9824-00d9841f3914",
            "name": "Bintang Amrullah",
            "email": "bintang@example.com"
        }
    }
]
```

### 2. Ambil Peminjaman Tunggal (GET /api/loans/:id)
Menampilkan detail satu data peminjaman berdasarkan ID.

### 3. Tambah Data Peminjaman (POST /api/loans)
Menambahkan data peminjaman baru.

### 4. Update Data Peminjaman (PUT /api/loans/:id)
Memperbarui data peminjaman berdasarkan ID.

### 5. Hapus Data Peminjaman (DELETE /api/loans/:id)
Menghapus data peminjaman berdasarkan ID.