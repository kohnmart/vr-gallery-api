import express from "express";
import galleries from "./routes/gallery.js";
import user from "./routes/user.js";
import image from "./routes/image.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use("/api/galleries", galleries);
app.use("/api/user", user);
app.use("/api/image", image);
app.use("/api/store", express.static("./store"));

app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}`));
