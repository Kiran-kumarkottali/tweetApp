const jwt = require('jsonwebtoken');

const key = process.env.KEY;

const requireAuth = (req, res, next) => {
const token = req.cookies.jwt;
  //const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzMyNDBhOTNkZGVmODc0NGYwNjU5YyIsImlhdCI6MTY2ODU3NjAyMSwiZXhwIjoxNjY4ODM1MjIxfQ.jorqjRfggKQwBL-KAmWTPwo5k8Xh4iRoWOswPjUIn48'
//console.log("token===",req)
  // check json web token exists or not
  if (token) {
    jwt.verify(token, key, (err) => {
      if (err)  {
        res.status(401).json({
          error: 'You are not logged in',
        });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({
      error: 'You are not logged in',
    });
  }
};

module.exports = { requireAuth };
