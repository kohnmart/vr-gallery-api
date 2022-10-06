import express from "express";
import cors from "cors";
import { getUserInfo, getUserGalleries } from "../db/query.js";

const router = express.Router();

// middleware
router.use(express.json());
router.use(cors());

// get User Information
router.get("/:id", async (req, res) => {
  try {
    const responseDb = await getUserInfo(req.params.id);
    res.status(responseDb.status).json(responseDb.result);
  } catch (err) {
    console.log(err.message);
  }
});

// get all Galleries owned by a User 
router.get("/galleries", async (req, res) => {
  try {
    const responseDb = await getUserGalleries(req.body.user_id);
    res.status(responseDb.status).json(responseDb.result);
  } catch (err) {
    console.log(err.message);
  }
});

export default router;
