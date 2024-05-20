const express = require("express")
const cors = require ("cors")
const app = express()
const PORT = process.env.PORT || 3001
const db = require("./config/connection")
const routes = require('./routes')



app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}));

db.getConnection((err,connection)=>{
    if (err) {
        console.error('Unable to connect to database:', err);
        return;
    }
    else{
        console.log("correctly connected to the database")
        connection.release();
    }

})

app.listen(PORT,() => console.log(`Now listening on port: http://localhost:${PORT}`))
app.use(routes)
