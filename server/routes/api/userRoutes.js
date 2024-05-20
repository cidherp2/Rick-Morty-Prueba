const router = require("express").Router()
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require("../../config/connection")
const jwt = require("jsonwebtoken")



router.post("/create-user", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userId = uuidv4();
        const hashedPw = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
            [userId, username, email, hashedPw]
        );

        if (result.affectedRows === 0) {
            res.status(500).json({ error: 'The user could not be created' });
            return;
        }

        const token = jwt.sign({  id: userId, username: username }, "Stack", {
            expiresIn: "2m"
        });

        res.status(201).json({ message: 'User created and logged in successfully', user: { token } });
        console.log("user Id: ", userId);
    } catch (err) {
        res.status(500).json({ error: 'Error while creating the user', details: err });
        console.log(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const [rows] = await db.execute(
            'SELECT id, username, email, password FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        const user = rows[0];

        const token = jwt.sign({  id: user.id, username: username }, "Stack", {
            expiresIn: "2m"
        });

       
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }

        res.status(200).json({ message: 'Login successful', user: { token } });
    } catch (err) {
        res.status(500).json({ error: 'Error while logging in', details: err });
        console.log(err);
    }
});

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