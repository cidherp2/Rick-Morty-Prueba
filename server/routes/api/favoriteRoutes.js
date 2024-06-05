const router = require("express").Router()
const db = require("../../config/connection")

router.post("/add-favorite-Character", async (req, res) => {
    try {
        const { user_id, item_id } = req.body
        const [favorite] = await db.execute(
            "INSERT INTO favorites (user_id,item_id) VALUES (?,?)",
            [user_id, item_id]
        )

        res.status(201).json({ message: 'Favorite added ' })
    }
    catch (err) {
        console.log(err)
    }
})
router.post("/add-favorite-location", async (req, res) => {
    try {
        const { user_id, item_id } = req.body
        const [favorite] = await db.execute(
            "INSERT INTO favoritesLocation (user_id,item_id) VALUES (?,?)",
            [user_id, item_id]
        )

        res.status(201).json({ message: 'Favorite added ' })
    }
    catch (err) {
        console.log(err)
    }
})

router.get("/user-favs", async (req, res) => {
    try {
        const { user_id } = req.query
        if (!user_id) {
            return res.status(400).json({ error: 'user_id query parameter is required' });
        }
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
      const [results] = await db.execute(query, [user_id]);
      res.json(results);  
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });

    }

})
router.get("/user-favs-location", async (req, res) => {
    try {
        const { user_id } = req.query; 
        if (!user_id) {
            return res.status(400).json({ error: 'user_id query parameter is required' });
        }

        const query = `
        SELECT 
          favoritesLocation.id AS favorite_id,
          favoritesLocation.item_id,
          favoritesLocation.created_at
        FROM 
          favoritesLocation
        JOIN 
          users ON favoritesLocation.user_id = users.id
        WHERE 
          users.id = ?;
      `;

        const [results] = await db.execute(query, [user_id]);
        res.json(results);  
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete-fav-char/:id', async (req, res) => {
    const favoriteId = req.params.id;
    try {
        await db.query('DELETE  FROM favorites WHERE item_id = ?', [favoriteId]);
        res.status(204).send(); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.delete('/delete-fav-location/:id', async (req, res) => {
    const favoriteId = req.params.id;
    try {
        await db.query('DELETE  FROM favoritesLocation WHERE item_id = ?', [favoriteId]);
        res.status(204).send(); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/search-character-tags", async (req, res) => {
    const  {tag}  = req.body;
    if (!tag) {
        return res.status(400).json({ error: 'Tag query parameter is required' });
    }
    
    try {
        const query = `
            SELECT 
                Tags.id AS tag_id,
                Tags.tag,
                Tags.favorite_id
            FROM 
                Tags
            JOIN 
                favorites ON Tags.favorite_id = favorites.id
            WHERE 
                Tags.tag = ?;
        `;
        const [results] = await db.execute(query, [tag]);
        res.json(results);  
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router