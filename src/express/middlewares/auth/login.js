// Login Middleware

function checkLogin(req, res, next) {
  console.log(req.user);
  req.user ? next() : res.sendStatus(401);
}

export default checkLogin;
