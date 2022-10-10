import express from "express";
import galleries from "./routes/gallery.js";
import user from "./routes/user.js";
import image from "./routes/image.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use("/api/galleries/", galleries);
app.use("/api/user/", user);
app.use("/api/image", image);
const port = 5000;

app.listen(port, () => console.log(`Listening to port ${port}`));
