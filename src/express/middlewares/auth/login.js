// Login Middleware

function checkLogin(req, res, next) {
  console.log("Check Login");
  console.log(req.user.u_id);
  req.user ? next() : res.sendStatus(401);
}

export default checkLogin;
