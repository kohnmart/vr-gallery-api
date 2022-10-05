import express from "express";
import router from "./routes/routes.js";

const app = express();
app.use("/api/", router);
const port = 5000;

app.listen(port, () => console.log(`Listening to port ${port}`));
