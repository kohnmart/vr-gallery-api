import express from "express";
import upload from "../middlewares/upload.js";
import actionDatabase from "../../postgres-db/request.js";
const image = express.Router();
image.use(express.json());

// GET ALL GALLERY IMAGES FROM A USER
image.get("/", async (req, res) => {
  const db = await actionDatabase({
    method: "select",
    select: ["i_id", "i_name", "g_id", "g_name"],
    table: "getGalleryImages",
    idName: "g_id",
    idValue: req.params.id,
  });
  res.status(db.status).json(db.result);
});

// ADD IMAGE TO GALLERY --> Upload to S3 Bucket
image.post("/upload", upload, async (req, res) => {
  const image = req.file;
  const imageId = image.filename.split('.')[0];
  const g_id = req.body.g_id;

  console.log(image);  
  const db = await actionDatabase({
    method: "insert",
    table: "image",
    columns: ["i_id", "g_id", "i_name"],
    set: [imageId, g_id, image.originalname],
    returningId: "i_id"
  });
  res.status(db.status).json(db.result);
});

export default image;
