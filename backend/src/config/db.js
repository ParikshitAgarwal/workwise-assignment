import pkg from "pg";
const {Pool} = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

pool.on("connect",()=>{
    console.log("connection pool established with Database")
})

export default pool