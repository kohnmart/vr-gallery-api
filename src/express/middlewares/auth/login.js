// Login Middleware

function checkLogin(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

export default checkLogin;
