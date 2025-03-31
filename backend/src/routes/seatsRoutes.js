import {
    Router
} from "express"
import "dotenv/config"
import {
    bookSeats,
    cancelBooking,
    getBookedSeats,
    getSeats,
    resetSeats
} from "../controller/seatController.js";
import protectRoute from "../middleware/authMiddleware.js";

const router = Router();


router.post("/book", protectRoute, bookSeats)
router.get("/", protectRoute, getSeats)
router.post("/reset", protectRoute, resetSeats)
router.get("/booked-seats", protectRoute, getBookedSeats)
router.post("/cancel-booking", protectRoute, cancelBooking)






export default router;