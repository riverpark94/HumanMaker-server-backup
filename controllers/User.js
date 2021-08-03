const { Users } = require("../models")
const axios = require('axios');
const jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
require('dotenv').config();

module.exports={
  signIn : (req, res) => {
    const { id, password } = req.body;
    const secret = secretObj.secret  

    const token = jwt.sign(
      {username : id},
      secret,
      {expiresIn: '1h'}
      )

    Users.findOne({
      where: {
        username:id, 
        password
      }
    }).then(data => {
      if(!data){
        res.status(404).send("invalid request")
      }
      res.cookie("sid", token);
      res.status(200).json({
        id: data.id,
        token: token,
        username: data.username
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  signOut : (req, res) => {
    req.session.destroy(() =>{
      res.clearCookie('sid');
      // res.clearCookie('connect.sid');
      res.status(205).send("logged out success")
    })
  },
  
  checkusername: (req, res) =>{
    console.log('[checkusername req]', req)
    // * POST /users/checkusername, 닉네임 중복 체크
    const { id } = req.body;

    Users.findOne({
      where: { username : id },
    }).then((data) => {
      data
        ? res.status(200).json(data)
        : res.status(201).send('중복된 id가 없습니다.');
    });
  },

  signUp :  (req, res) => {
  const { id, password } = req.body;

  if(!id || !password){
      res.status(422).send("not enough user information");
  }
   Users.findOrCreate({
      where: {
          username:id,
      },
      defaults:{
          password
      }
  }).then(([data, created]) => {
      if(!created){
          res.status(409).send("existed id");
      }
      res.status(201).json(data);
   })
  },

  sicalsignUp : async (req, res) => {
    let { token, nickname } = req.body;
    let { data:result, status } = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`).catch(err => err.response);
    if (status === 200 && result.azp === process.env.google_client_id && nickname) {
      let Users = await User.create({
        nickname :email,
        social: true,
        social_id: result.sub
      }).catch(err=>console.log(err));
      console.log(result.sub)
      if (Users) {
        for (let i in tag) {
          if (tag[i]) {
            User_tag.create({
              user_id: user.id,
              tag_id: i
            })
          }
        }
        res.status(201).send();
      } else {
        res.status(500).send();
      }
    } else {
      res.status(400).send('올바르지 않은 접근입니다.');
    }
  },
   // 위 조건이 true라면 정상적으로 클라이언트에서 인증된 사용자임.
   // result.sub에는 user를 특정할 id가 존재한다.
   // 데이터베이스에 해당 sub을 socail_id(filed)로 가진 record가 존재한다면
   // session에 해당 유저의 id를 담고 200응답코드와 nickname이 남긴 obejct를 보내준다.
   // 없을시
   // 200응답코드와 함께 object를 보내준다.
  sicalsignIn : async (req, res) => {
      let { token } = req.body;
      let { data:result, status } = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`).catch(err => err.response);
  
      if (status === 200 && result.azp === process.env.google_client_id) {
  
        let Users = await Users.findOne({
          where: {
            social_id: result.sub
          }
        });
        
        if (Users) {
          req.session.userid = { id: user.id }
          res.status(200).json({found: true, nickname: user.nickname});
        } else {
          res.status(200).json({found: false, token});
        }
      } else {
        // 올바르지 않은 접근입니다. 400
        res.status(400).send('올바르지 않은 접근입니다.');
      }
   }
}