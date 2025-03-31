import pool from "../config/db.js";
import bcrypt from 'bcryptjs'

export const createUserService = async (email, password) => {

    const saltRounds = 10; // Recommended value for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query("INSERT INTO users (email,password) VALUES ($1, $2) RETURNING *", [email, hashedPassword])
    return result.rows[0]
}

export const findUserServiceByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM users where email = $1", [email])
    return result.rows[0]
}


export const findUserServiceById = async (id) => {
    const result = await pool.query("SELECT * FROM users where id = $1", [id])
    return result.rows[0]
}

