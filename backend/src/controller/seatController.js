import {
    cancelBookingService,
    findAllAvailableSeatsService,
    findAllBookedSeatsByUser,
    findAllSeatsService,
    resetSeatBookingService,
    updateSeatBookingService
} from "../models/seatModel.js"

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    })
}

export const getSeats = async (req, res, next) => {
    try {
        const getAllSeats = await findAllSeatsService();
        handleResponse(res, 200, "Success", getAllSeats)
    } catch (error) {
        next(error)
    }
}


export const bookSeats = async (req, res, next) => {
    try {

        const {
            seatCount,
            bookingId
        } = req.body;
        console.log(bookingId)
        if (seatCount < 1 || seatCount > 7) {
            return handleResponse(res, 400, "You can book between 1 to 7 seats only.")
        }

        const availableSeats = await findAllAvailableSeatsService();
        if (availableSeats.length < seatCount) {
            return handleResponse(res, 200, "Not enough seats available")
        }
        let selectedSeats = [];
        let seatMap = new Map();

        // Try to find N consecutive seats in a row
        availableSeats.forEach((seat) => {
            if (!seatMap.has(seat.row_number)) seatMap.set(seat.row_number, []);
            seatMap.get(seat.row_number).push(seat);
        });
        for (let [row, seats] of seatMap) {
            if (seats.length >= seatCount) {
                selectedSeats = seats.slice(0, seatCount);
                break;
            }
        }


        // If no full row found, select closest available seats
        if (selectedSeats.length === 0) {
            // Sort all available seats by ID to find consecutive seats
            console.log(availableSeats)
            availableSeats.sort((a, b) => a.id - b.id);
            console.log("sorted availaible seats:", availableSeats)

            // Find the best consecutive chunk of seats
            let bestStart = 0;
            let bestDistance = Infinity;

            for (let i = 0; i <= availableSeats.length - seatCount; i++) {
                // Calculate the "distance" of this chunk (difference between last and first seat ID)
                const distance = availableSeats[i + seatCount - 1].id - availableSeats[i].id;

                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestStart = i;
                }
            }

            // Take the chunk with minimum distance
            selectedSeats = availableSeats.slice(bestStart, bestStart + seatCount);
        }

        const seatIds = selectedSeats.map(s => s.id);
        await updateSeatBookingService(req.user.id, seatIds, bookingId);
        console.log(seatIds)
        handleResponse(res, 200, "Seats Booked Successfully", seatIds)
        console.log(availableSeats.length)
    } catch (error) {
        next(error)
    }
}

export const getBookedSeats = async (req, res, next) => {
    try {
        const userId = req.user.id
        console.log(userId)
        const bookedSeatsByUser = await findAllBookedSeatsByUser(userId);
        handleResponse(res, 200, "", bookedSeatsByUser)
    } catch (error) {
        next(error)
    }
}

export const resetSeats = async (req, res, next) => {
    try {
        await resetSeatBookingService();
        handleResponse(res, 200, "Seats Reset Successfully")
    } catch (error) {
        next(error)
    }
}

export const cancelBooking = async (req, res, next) => {
    try {
        const {
            bookingId
        } = req.body;
        await cancelBookingService(bookingId);
        handleResponse(res, 200, "Seats Reset Successfully")
    } catch (error) {
        next(error)
    }
}