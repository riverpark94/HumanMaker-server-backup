require("dotenv").config();

let jwtObj = {};

jwtObj.secret = process.env.JWT_SECRET

module.exports = jwtObj