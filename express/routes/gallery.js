import express from "express";
import { getUserGalleries } from "../../postgres-db/query.js";

const galleries = express.Router();

// middleware
galleries.use(express.json());

// get all Galleries owned by a User
galleries.get("/:id", async (req, res) => {
  try {
    const responseDb = await getUserGalleries(req.params.id);
    res.status(responseDb.status).json(responseDb.result);
  } catch (err) {
    console.log(err.message);
  }
});

export { galleries as router };
export default galleries;
