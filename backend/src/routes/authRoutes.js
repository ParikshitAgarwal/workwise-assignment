import {
    Router
} from "express"
import "dotenv/config"
// import jwt from "jsonwebtoken"
import { createUser, loginUser } from "../controller/userController.js";

const router = Router();


router.post("/signup",createUser)
router.post("/login",loginUser)


export default router;