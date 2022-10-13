import express from "express";
import "../middlewares/auth/google-config.js";
import passport from "passport";
import checkLogin from "../middlewares/auth/login.js";
const auth = express.Router();

// get User Information
auth.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

auth.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/auth/failure" }),
  function (req, res) {
    console.log("REQUEST");
    console.log(req.user);
    res.redirect("/api/auth/success");
  }
);

auth.get("/success", checkLogin, (req, res) => {
  res.send("Successfully logged in!");
});

auth.get("/failure", (req, res) => {
  res.send("Login failed!");
});

export default auth;
