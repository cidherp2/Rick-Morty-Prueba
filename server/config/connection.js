require ("dotenv").config()
const mysql = require("mysql2/promise")

const db = mysql.createPool(
    {
        host: process.env.DB_HOST || "localhost" , 
        port: process.env.DB_PORT || 3306,
        database:process.env.DB_DATABASE || "rm_scroller",
        user:process.env.DB_USER || "root",
        password:process.env.DB_PASSWORD || "Telecaster12",
        waitForConnections: true,
        connectionLimit:10,
        queueLimit:0,
    }
)

module.exports = db