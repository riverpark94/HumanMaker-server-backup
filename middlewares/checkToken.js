const jwt = require('jsonwebtoken');
let secretObj = require("../config/jwt");

const checkToken = (req, res, next) => {
  console.log("[token] : ", req.headers.authorization.split(" ")[1])
//   const {authorization} =  req.headers;
//   const authorizationSplit = authorization.split(" ");
  const token = req.headers.authorization.split(" ")[1]
  const secret = secretObj.secret;

  console.log("[token] : ", token)

    if(!token) {
        res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }
    const check = new Promise(
        (resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )
    check.then(user => {
        req.user = user;
        next();
    }).catch(err => {
        res.status(403).json({
            success: false,
            message: err
        })
    })

};
module.exports= checkToken;