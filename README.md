# Library Loan Management API

RESTful API untuk pencatatan dan pengelolaan peminjaman buku perpustakaan yang dibangun menggunakan Node.js, Express.js, dan Supabase Database (PostgreSQL).

## Production URL
- **Deployment URL**: `https://your-deployment-name.vercel.app`

## Skema Database

### 1. `books`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID | Primary Key, default `gen_random_uuid()` |
| `title` | TEXT | Judul buku |
| `author` | TEXT | Nama penulis |
| `published_year` | INTEGER | Tahun rilis |

### 2. `members`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID | Primary Key, default `gen_random_uuid()` |
| `name` | TEXT | Nama anggota perpustakaan |
| `email` | TEXT | Email unik anggota |

### 3. `loans`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID | Primary Key, default `gen_random_uuid()` |
| `book_id` | UUID | Foreign Key -> `books(id)` |
| `member_id` | UUID | Foreign Key -> `members(id)` |
| `borrow_date` | DATE | Tanggal mulai pinjam |
| `return_date` | DATE | Tanggal pengembalian |
| `status` | TEXT | "Dipinjam", "Dikembalikan", "Terlambat" |

---

## Endpoint API (`/api/loans`)

### 1. Ambil Semua Peminjaman (Mendukung Filter Status)
- **Method**: `GET`
- **URL**: `/api/loans`
- **Contoh Filter**: `/api/loans?status=Terlambat`
- **Response (200 OK)**:
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