import pool from "../config/db.js";


export const findAllAvailableSeatsService = async () => {
    const result = await pool.query(`SELECT * FROM seats WHERE is_booked = FALSE ORDER BY row_number, seat_number;`)
    return result.rows
}

export const findAllSeatsService = async () => {
    const result = await pool.query(`SELECT * FROM seats ORDER BY row_number, seat_number;`)
    return result.rows
}

export const updateSeatBookingService = async (userId, seatIds) => {
    const result = await pool.query(
        `UPDATE seats SET is_booked = TRUE, booked_by = $1 WHERE id = ANY($2)`,
        [userId, seatIds]
    );
    console.log("updateSeatBookingService:=>",result)
    return result;
}

export const resetSeatBookingService = async () =>{
    const result = await pool.query(
        `UPDATE seats SET is_booked = FALSE, booked_by = NULL`
    )   
    console.log(result)

}