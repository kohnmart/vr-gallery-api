import express from "express";
import router from "./routes/routes.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use("/api/", router);
const port = process.env.PORT;

app.listen(port, () => console.log(`Listening to port ${port}`));
