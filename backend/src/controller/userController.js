import {
    createUserService,
    findUserServiceByEmail
} from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import {
    z
} from "zod";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    })
}

const generateToken = (userId) => {
    return jwt.sign({
        userId
    }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })
}

const userInputValidation = z.object({
    email: z.string()
        .email("Please enter a valid email address")
        .min(1, "Email is required"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})

export const createUser = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        const {
            success,
            error
        } = userInputValidation.safeParse(req.body);
        console.log(error)

        if (!success) {
            handleResponse(res, 400, error.issues[0].message)
            return;
        }

        const existingUser = await findUserServiceByEmail(email);

        console.log(existingUser)
        if (existingUser) {
            handleResponse(res, 400, "User already exist Please try login")
            return;
        }

        const user = await createUserService(email, password)

        handleResponse(res, 201, "User Created Successfully", {
            id: user.id,
            email: user.email,
        })

    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body


        const {
            success,
            error
        } = userInputValidation.safeParse(req.body);
        console.log(error)

        if (!success) {
            handleResponse(res, 400, error.issues[0].message)
            return;
        }

        const user = await findUserServiceByEmail(email);

        console.log(user)
        if (!user) {
            handleResponse(res, 400, "Invalid Credentials")
            return;
        }



        //check if password is correct 
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            handleResponse(res, 400, "Invalid Credentials")
            return;
        }

        const token = generateToken(user.id)
        console.log(token)
        handleResponse(res, 200, "User Logged in Successfully", {
            token,
            user: {
                id: user.id,
                email: user.email,
            }
        })

    } catch (error) {
        next(error)
    }
}