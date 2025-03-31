import {
    Router
} from "express"
import "dotenv/config"
import {
    bookSeats,
    getSeats,
    resetSeats
} from "../controller/seatController.js";
import protectRoute from "../middleware/authMiddleware.js";

const router = Router();


router.post("/book", protectRoute, bookSeats)
router.get("/", protectRoute, getSeats)
router.post("/reset", protectRoute, resetSeats)






export default router;