import express from "express";
import cors from "cors";

const router = express.Router();

//middleware
router.use(express.json());
router.use(cors())


router.get("/", async (req, res) => {
  res.send("Welcome to VR-Gallery-API");
});

export default router;
