//Import
import express from "express";
import session from "express-session"
import galleries from "./routes/gallery.js";
import user from "./routes/user.js";
import image from "./routes/image.js";
import auth from "./routes/auth.js"
import dotenv from "dotenv";
import passport from "passport";
dotenv.config();



// Server
const app = express();

//Session
app.use(session( { secret: process.env.SESSION_SECRET}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use("/api/galleries", galleries);
app.use("/api/user", user);
app.use("/api/image", image);
app.use("/api/auth", auth);
app.use("/api/store", express.static("./store"));

app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}`));
