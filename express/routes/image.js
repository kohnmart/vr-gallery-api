import express from "express";
import fs from "fs";
import upload from "../middleware/upload.js";
import actionDatabase from "../../postgres-db/request.js";
const image = express.Router();
image.use(express.json());

// GET ALL GALLERY IMAGES
image.get("/", async (req, res) => {
  try {
    const db = await actionDatabase({
      method: "select",
      select: ["i_id", "i_name", "g_id", "g_name"],
      table: "getGalleryImages",
      idName: "g_id",
      idValue: req.params.id,
    });
    res.status(db.status).json(db.result);
  } catch (err) {
    console.log(err.message);
  }
});


// Download image with key
image.get("/:key", upload, async (req, res) => {
  const file = req.file;
  const id = req.body.id;
  res.send(id);
});

// ADD IMAGE TO GALLERY --> Upload to S3 Bucket
image.post("/upload", upload, async (req, res) => {
  const file = req.file;
  const id = req.body.id;
  res.send(id);
});

export default image;
