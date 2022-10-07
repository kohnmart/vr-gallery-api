import express from "express";
import galleries from "./routes/gallery.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use("/api/galleries/", galleries);
const port = 5000;

app.listen(port, () => console.log(`Listening to port ${port}`));
