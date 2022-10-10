import express from "express";
import fs from "fs";
import path from "path";
import actionDatabase from "../../postgres-db/request.js";
const user = express.Router();
user.use(express.json());

// get User Information
user.get("/:id", async (req, res) => {
  try {
    const db = await actionDatabase({
      method: "select",
      select: ["u_id", "u_name"],
      table: "user",
      idName: "u_id",
      idValue: req.params.id,
    });
    res.status(db.status).json(db.result);
  } catch (err) {
    console.log(err.message);
  }
});

// Create new User
user.post("/", async (req, res) => {
  try {
    const db = await actionDatabase({
      method: "insert",
      table: "user",
      columns: ["u_name"],
      set: [req.body.name],
      returningId: "u_id",
    });
 
    fs.mkdirSync(path.join("store", db.result[0]["u_id"]), () => {
      console.log(`Created dir store/${db.result["g_id"]}`)
    });
    res.status(db.status).json(db.result)
    
  } catch (err) {
    console.log(err.message);
  }
});

export default user;
