//Import
import express from "express";
import session from "express-session";
import galleries from "./routes/gallery.js";
import user from "./routes/user.js";
import image from "./routes/image.js";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import passport from "passport";
import checkLogin from "./middlewares/auth/login.js";
dotenv.config();

// Server
const app = express();

//Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());


//OPEN ROUTE FOR AUTH
app.use("/api/auth", auth);
//PROTECTED ROUTES
app.use("/api/galleries", checkLogin, galleries);
app.use("/api/user",      checkLogin, user);
app.use("/api/image",     checkLogin, image);
app.use("/api/store",     checkLogin, express.static("./store"));

app.listen(process.env.PORT, () =>
  console.log(`Listening to port ${process.env.PORT}`)
);
