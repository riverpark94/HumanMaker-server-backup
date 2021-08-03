const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const cors = require("cors");
require("./models");
const Route = require("./routes/index")

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.listen(5000, () => {
    console.log("http://localhost:5000 port success")
})

app.use(
  session({
    secret: "@applixzzang",
    resave: false,
    saveUninitialized: true,
    cookie: {
      signed: true,
      httpOnly: true,
      maxAge: 3600,
      sameSite: "none"
    }
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000", 
            "http://humanmaker.tk.s3-website.ap-northeast-2.amazonaws.com", 
            "https://humanmaker.tk", 
            "https://www.humanmaker.tk", 
            "https://humanmaker.ml", 
            "https://www.humanmaker.ml"],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })  
);
// 분기
app.use(Route);

module.exports = app; 
