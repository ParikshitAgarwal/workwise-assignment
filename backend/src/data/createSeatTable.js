import pool from "../config/db.js";

const createSeatTable = async () => {
    const queryText = `
   CREATE TABLE IF NOT EXISTS seats (
    id SERIAL PRIMARY KEY,
    seat_number INT UNIQUE NOT NULL,
    row_number INT NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    booked_by INT REFERENCES users(id) ON DELETE SET NULL
);
    `;
    try {
        pool.query(queryText);
        console.log("Seat table created if not exists")
    } catch (error) {
        console.log("Error creating seats table: ", error)

    }
}


export default createSeatTable;