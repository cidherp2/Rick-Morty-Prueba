const router = require("express").Router()
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require("../../config/connection")



router.post("/create-user", async (req,res)=>{
    try{
        const {username,email,password} = req.body 
        const userId = uuidv4()
        const hashedPw = await bcrypt.hash(password,10)

       

        const [user] = await db.execute(
            'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
            [userId, username, email, hashedPw]
        )
        if (user){
            res.status(500).json({error:'The user already exists'}, err)
            return
        }
        res.status(201).json({message: 'User created successfully'})
        console.log("user Id: ", userId)

    }
    catch(err){
    res.status(500).json({ error: 'Error while creating the user', details: err });
    console.log(err)
    }

})

router.get("/all-users", async (req,res) => {
    try{
        const [users] = await db.execute(
            'SELECT * FROM users'
            
        )
        res.status(200).json(users)

    }

    catch(err){
        res.status(500).json({error:'Error while creating the user'}, err)
    }
})

router.get('/healthy',async(req,res) =>{
    try {
       
     res.send("<h1>Hola</h1>")

    }
    catch(err){
        res.status(500).json({error: "Error al buscar la publicación"})
    }
})

module.exports = router