import pool from "../config/db.js";


export const findAllAvailableSeatsService = async () => {
    const result = await pool.query(`SELECT * FROM seats WHERE is_booked = FALSE ORDER BY row_number, seat_number;`)
    return result.rows
}

export const findAllSeatsService = async () => {
    const result = await pool.query(`SELECT * FROM seats ORDER BY row_number, seat_number;`)
    return result.rows
}

export const findAllBookedSeatsByUser = async (bookingId) => {
    const result = await pool.query(`
        SELECT 
            booking_id, 
            ARRAY_AGG(seat_number ORDER BY seat_number) AS booked_seats
        FROM seats
        WHERE booked_by = $1 AND is_booked = TRUE
        GROUP BY booking_id;
        `,[bookingId])
    return result.rows
}

export const updateSeatBookingService = async (userId, seatIds,bookingId) => {
    const result = await pool.query(
        `UPDATE seats SET is_booked = TRUE, booked_by = $1, booking_id = $3 WHERE id = ANY($2)`,
        [userId, seatIds,bookingId]
    );
    console.log("updateSeatBookingService:=>",result)
    return result;
}

export const resetSeatBookingService = async () =>{
    const result = await pool.query(
        `UPDATE seats SET is_booked = FALSE, booked_by = NULL, booking_id = NULL`
    )   
    console.log(result)

}

export const cancelBookingService = async (bookingId) =>{
    const result = await pool.query(
        `UPDATE seats SET is_booked = FALSE, booked_by = NULL, booking_id = NULL WHERE booking_id = $1`,
        [bookingId]
    )   
    console.log(result)

}