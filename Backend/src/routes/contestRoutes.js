import express from 'express';
import Contest from '../models/Contest.js';

const router = express.Router();


//for all contests
router.get('/', async (req, res) => {
try{
   const contests = await Contest.find().sort({startTime: 1});
   res.send(contests);
}catch(err){
    console.error("❌ Error fetching contests:", error);
    res.status(500).json({ message: "Server Error" });
}});


// Get contests by platform

router.get("/:platform", async (req, res) => {
    try {
      const { platform } = req.params;
      const contests = await Contest.find({ platform }).sort({ startTime: 1 });
  
      if (contests.length === 0) {
        return res.status(404).json({ message: `No contests found for ${platform}` });
      }
  
      res.json(contests);
    } catch (error) {
      console.error("❌ Error fetching platform contests:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });


  export default router;