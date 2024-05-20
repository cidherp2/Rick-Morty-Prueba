const router = require("express").Router()
const db = require("../../config/connection")

router.post("/add-favorite-Character", async (req, res)=>{
    try{
        const {user_id, item_id} = req.body
        const[favorite] = await db.execute(
            "INSERT INTO favorites (user_id,item_id) VALUES (?,?)",
            [user_id,item_id]
        )

        res.status(201).json({message: 'Favorite added '})
    }
    catch(err){
        console.log(err)
    }
})
router.post("/add-favorite-location", async (req, res)=>{
    try{
        const {user_id, item_id} = req.body
        const[favorite] = await db.execute(
            "INSERT INTO favoritesLocation (user_id,item_id) VALUES (?,?)",
            [user_id,item_id]
        )

        res.status(201).json({message: 'Favorite added '})
    }
    catch(err){
        console.log(err)
    }
})

router.get("/user-favs", async (req, res) =>{
    try{
        const query = `
        SELECT 
          favorites.id AS favorite_id,
          favorites.item_id,
          favorites.created_at
        FROM 
          favorites
        JOIN 
          users ON favorites.user_id = users.id
        WHERE 
          users.id = ?;
      `;
       await  db.execute(query,[user_id])
    }

    catch(err){
        console.log(err)
    }

})
router.get("/user-favs", async (req, res) =>{
    try{
        const query = `
        SELECT 
          favorites.id AS favorite_id,
          favorites.item_id,
          favorites.created_at
        FROM 
        favoritesLocation
        JOIN 
          users ON favorites.user_id = users.id
        WHERE 
          users.id = ?;
      `;
       await  db.execute(query,[user_id])
    }

    catch(err){
        console.log(err)
    }

})

module.exports = router