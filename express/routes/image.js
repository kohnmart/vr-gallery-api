import express from "express";
import fs from "fs";
import path from "path";
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


// ADD IMAGE TO GALLERY
image.post("/", async (req, res) => {
    const post = req.body;
    try {
      const db = await actionDatabase({
        method: "insert",
        table: "image",
        columns: ["g_id", "i_name"],
        set: [post.g_id, post.i_name],
        returningId: "i_id"
      });
      res.status(db.status).json(db.result);
    } catch (err) {
      console.log(err.message);
    }
  });



  

