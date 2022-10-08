import express from "express";
import actionDatabase from "../../postgres-db/request.js";
const galleries = express.Router();
galleries.use(express.json());

// GET ALL ACTIVE GALLERIES
galleries.get("/", async (req, res) => {
  try {
    const db = await actionDatabase({
      method: "select",
      select: ["g_name", "g_date", "g_rating", "g_active", "g_path"],
      table: "getUserGalleries",
      idName: "g_active",
      idValue: "true",
    });
    res.status(db.status).json(db.result);
  } catch (err) {
    console.log(err.message);
  }
});

// GET ALL USER GALLERIES
galleries.get("/:id", async (req, res) => {
  try {
    const db = await actionDatabase({
      method: "select",
      select: ["g_name", "g_date", "g_rating", "g_active", "g_path"],
      table: "getUserGalleries",
      idName: "u_id",
      idValue: req.params.id,
    });
    res.status(db.status).json(db.result);
  } catch (err) {
    console.log(err.message);
  }
});

// CREATE NEW GALLERY
galleries.post("/", async (req, res) => {
  const post = req.body;
  try {
    const db = await actionDatabase({
      method: "insert",
      table: "gallery",
      columns: ["u_id", "g_name", "g_active", "g_path"],
      set : [post.id, post.name, post.active, post.path],
    });
    res.status(db.status).json(db.result);
  } catch (err) {
    console.log(err.message);
  }
});

// UPDATE GALLERY COLUMN 
galleries.put("/", async (req, res) => {
  try {
    const db = await actionDatabase({
      method: "update",
      table: "gallery",
      columns: "g_active",
      idName: ["g_id", "u_id"],
      idValue:  req.body.ids,
      set: req.body.set
    });
    res.status(db.status).json(db.result);
  } catch (err) {
    console.log(err.message);
  }
});

galleries.delete("/", async (req, res) => {
  try {
    const db = await actionDatabase({
      method: "delete",
      table: "gallery",
      idName: ["g_id", "u_id"],
      idValue: [req.query.g_id, req.query.u_id]
    });
    res.status(db.status).json(db.result);
  } catch (err) {
    console.log(err.message);
  }
})

export { galleries };
export default galleries;
