import { supabase } from "../config/supabaseClient.js";

export const LoanModel = {
    // Mengambil semua data peminjaman (mendukung filter query: ?status=...)
    async getAll(status) {
        let query = supabase
            .from("loans")
            .select("id, book_id, member_id, borrow_date, return_date, status, books(id, title, author, published_year), members(id, name, email)");

        if (status) {
            query = query.eq("status", status);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    // Mengambil peminjaman berdasarkan ID
    async getById(id) {
        const { data, error } = await supabase
            .from("loans")
            .select("id, book_id, member_id, borrow_date, return_date, status, books(id, title, author, published_year), members(id, name, email)")
            .eq("id", id)
            .single();

        if (error) throw error;
        return data;
    },

    // Menambahkan data peminjaman baru
    async create(payload) {
        const { data, error } = await supabase
            .from("loans")
            .insert([payload])
            .select("id, book_id, member_id, borrow_date, return_date, status, books(id, title, author, published_year), members(id, name, email)")
            .single();

        if (error) throw error;
        return data;
    },

    // Memperbarui data peminjaman (status / return_date)
    async update(id, payload) {
        const { data, error } = await supabase
            .from("loans")
            .update(payload)
            .eq("id", id)
            .select("id, book_id, member_id, borrow_date, return_date, status, books(id, title, author, published_year), members(id, name, email)")
            .single();

        if (error) throw error;
        return data;
    },

    // Menghapus data peminjaman
    async remove(id) {
        const { error } = await supabase
            .from("loans")
            .delete()
            .eq("id", id);

        if (error) throw error;
        return { message: "Data peminjaman berhasil dihapus" };
    }
};