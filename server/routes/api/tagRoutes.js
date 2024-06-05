const router = require("express").Router()
const db = require ("../../config/connection")

router.post("/addTag/:favorite_id/:user_id", async (req,res)=>{
    const favoriteId = req.params.favorite_id
    const {tag}= req.body
    const userId = req.params.user_id
    try{
      await db.execute (
        "INSERT INTO Tags (tag, favorite_id,user_id) VALUES (?,?,?)",
        [tag,favoriteId,userId]
      )
      res.status(201).json({message:"Tag added"})
    }
    catch (error){
        console.log("Error adding tag", error)
        res.status(500).json({ message: 'Error adding tag' });
    }
})
router.post("/addTag-location/:favorite_location_id", async (req,res)=>{
    const favoriteId = req.params.favorite_location_id
    const {tag}= req.body
    try{
      await db.execute (
        "INSERT INTO Tags (tag, favorite_location_id) VALUES (?,?)",
        [tag,favoriteId]
      )
      res.status(201).json({message:"Tag added"})
    }
    catch (error){
        console.log("Error adding tag", error)
        res.status(500).json({ message: 'Error adding tag' });
    }
})

router.put("/updateTag/:tag_id", async (req, res) => {
    const tagId = req.params.tag_id;
    const { tag } = req.body;
    try {
      await db.execute(
        "UPDATE Tags SET tag = ? WHERE id = ?",
        [tag, tagId]
      );
      res.status(200).json({ message: "Tag updated" });
    } catch (error) {
      console.log("Error updating tag", error);
      res.status(500).json({ message: 'Error updating tag' });
    }
  });

  router.get("/getTags/:favorite_id", async (req, res) => {
    const favoriteId = req.params.favorite_id;
    try {
      const [tags] = await db.execute(
        "SELECT * FROM Tags WHERE favorite_id = ?",
        [favoriteId]
      );
      res.status(200).json(tags);
    } catch (error) {
      console.log("Error getting tags", error);
      res.status(500).json({ message: 'Error getting tags' });
    }
  });
  router.get("/getTags-location/:favorite_location_id", async (req, res) => {
    const favoriteId = req.params.favorite_location_id;
    try {
      const [tags] = await db.execute(
        "SELECT * FROM Tags WHERE favorite_location_id = ?",
        [favoriteId]
      );
      res.status(200).json(tags);
    } catch (error) {
      console.log("Error getting tags", error);
      res.status(500).json({ message: 'Error getting tags' });
    }
  });

module.exports = router

