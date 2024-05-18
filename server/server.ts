import mysql from 'mysql';
const express = require("express")
const cors = require ("cors")
const app = express()
const PORT = process.env.PORT || 3001
const {database} = require("./config/connection")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

database.getConnection((error: mysql.MysqlError,connection: mysql.PoolConnection)=>{
    if (error) {
        console.error('Error conectándose a la base de datos:', error);
        return;
    }
    else{
        console.log("correctly connected to the database")
        connection.release();
    }

})

app.listen(PORT,() => console.log(`Now listening on port: http://localhost:${PORT}`))
