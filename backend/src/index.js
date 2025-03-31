import express from "express"
import "dotenv/config"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import errorHandling from "./middleware/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
import createSeatTable from "./data/createSeatTable.js";
import seatsRoutes from "./routes/seatsRoutes.js"

// import job from "./lib/cron.js";
const app = express();
const PORT = process.env.port || 3000;

// job.start()
app.use(cors())
app.use(express.json())

//routes
app.use("/api/auth", authRoutes)
app.use("/api/seats", seatsRoutes)

// Error Handling middleware
app.use(errorHandling)

createUserTable();
createSeatTable();
//Testing postgres connection
// app.get("/",async (req,res)=>{
//         const result = await pool.query("SELECT current_database()");
//         console.log(result.rows[0])
//         res.status(200)
//         res.json("The database name is :", result.rows[0].cuurent_database)
// })


app.listen(PORT, () => {
    console.log("Server is running on port: ",PORT)
})