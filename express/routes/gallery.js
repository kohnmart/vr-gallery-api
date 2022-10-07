import express from "express";
import requestView, { insertTable } from "../../postgres-db/request.js";
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

galleries.post("/", async (req, res) => {
  const post = req.body;
  try {
    const db = await insertTable({
      table: "gallery",
      col: ["u_id", "g_name", "g_active", "g_path"],
      val: [post.id, post.name, post.active, post.path],
    });
    res.status(db.status).json(db.result);
  } catch (err) {
    console.log(err.message);
  }
});

export { galleries };
export default galleries;
