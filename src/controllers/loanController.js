import { LoanModel } from "../models/loanModel.js";

export const LoanController = {
    async getAll(req, res) {
        try {
            const { status } = req.query; // Menangkap query parameter ?status=...
            const loans = await LoanModel.getAll(status);
            res.status(200).json(loans);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const loan = await LoanModel.getById(id);
            if (!loan) {
                return res.status(404).json({ error: "Data peminjaman tidak ditemukan" });
            }
            res.status(200).json(loan);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const { book_id, member_id, borrow_date, return_date, status } = req.body;
            if (!book_id || !member_id) {
                return res.status(400).json({ error: "book_id dan member_id wajib diisi" });
            }

            const payload = {
                book_id,
                member_id,
                borrow_date: borrow_date || new Date().toISOString().split("T")[0],
                return_date: return_date || null,
                status: status || "Dipinjam"
            };

            const newLoan = await LoanModel.create(payload);
            res.status(201).json(newLoan);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const updatedLoan = await LoanModel.update(id, req.body);
            res.status(200).json(updatedLoan);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async remove(req, res) {
        try {
            const { id } = req.params;
            const result = await LoanModel.remove(id);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};