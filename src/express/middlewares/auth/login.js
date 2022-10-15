// Login Middleware

function checkLogin(req, res, next) {
  console.log('Check cookies');
  console.log(req.headers);
  req.user ? next() : res.sendStatus(401);
}

export default checkLogin;
