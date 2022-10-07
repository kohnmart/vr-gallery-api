import express from "express";
import requestView from "../../postgres-db/request.js";
const galleries = express.Router();

// middleware
galleries.use(express.json());

// get all Galleries owned by a User
galleries.get("/:id", async (req, res) => {
  try {
    const db = await requestView({
      selects: ["g_name", "g_date", "g_rating", "g_active", "g_path"],
      view: "getUserGalleries",
      idName: "u_id",
      idVal: req.params.id,
    });
    res.status(db.status).json(db.result);
  } catch (err) {
    console.log(err.message);
  }
});

export { galleries };
export default galleries;
