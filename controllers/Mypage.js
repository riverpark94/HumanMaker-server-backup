const { Users, Characters, UsersHaveCharacters, Goals, Stickers } = require("../models")
module.exports={
  getMyInfo : (req, res) => {
    const { id } = req.query;
    console.log('[getMyInfo req.body]', req.body)
    console.log('[getMyInfo req.params]', req.params)
    console.log('[getMyInfo req]', req.query)

    Users
      .findOne({
        where: {
          username:id,
        },
      })
      .then((data) => {
        if (data !== null) {
          console.log('개인정보 조회 완료');
          res.status(201).json(data);
        } else {
          res.status(201).json(data);
        }
      })
      .catch((err) => {
        res.status(500).send('err');
      });
  },
  ChangeMyPassword : (req, res) => {
    const { id, password } = req.body;
    console.log('[ChangeMyPassword req.body]', req.body)
    console.log('[ChangeMyPassword req.params]', req.params)
    console.log('[ChangeMyPassword req]', req.query)
    Users
      .update(
        {
          password,
        },
        {
          where: {
            username:id,
          },
        },
      )
      .then((data) => {
        console.log('개인정보수정 완료');
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  myCharacterCards: async (req, res) =>{

    // let userId = req.params.userid;
    // params에 userid를 담아달라고 해야함.

    let { id } = req.query;
    console.log('[myCharacterCards req.body]', req.body)
    console.log('[myCharacterCards req.params]', req.params)
    console.log('[myCharacterCards req]', req.query)

    try{

      const userId = await Users.findOne({
          where: {
            username:id
        }
        }).then(data => data.dataValues.id)

      UsersHaveCharacters.findAll({
        attributes: [],
        where: {
          userId : userId
        },
        include: {
          model: Characters
        }
      })
      .then(data => {
        console.log('캐릭터 카드 정보 가지고 오기 성공');
        if(data.length === 0) {
          res.status(200).send("적립된 캐릭터카드가 없음");
        }  
          res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });

    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  myTodoLists : async (req, res) => {

    // let userId = req.params.userid;
    // params에 userid를 담아달라고 해야함.

    let { id } = req.query;
    console.log('[myTodoLists req.body]', req.body)
    console.log('[myTodoLists req.params]', req.params)
    console.log('[myTodoLists req]', req.query)
    try {

      const userId = await Users.findOne({
          where: {
            username:id
        }
        }).then(data => data.dataValues.id)

      // Goals.findAll({
      //   where: {
      //     userId : userId
      //   },
      //     include: [{  model: Stickers }]
      // })
      // .then(data => {
      //   console.log('todo 리스트의 스티커 정보 가지고 오기 성공');
      //   if(data.length === 0) {
      //     res.status(200).send("완료된 todo 리스트가 없음");
      //   }
      //     res.status(200).json(data);
      // })
      // .catch((err) => {
      //   console.log(err);
      //   res.sendStatus(500);
      // });
      Goals.findAll({
        where: {
          userId : userId
        }
      })
      .then(data => {
        console.log('todo 리스트의 스티커 정보 가지고 오기 성공');
        if(data.length === 0) {
          res.status(200).send("완료된 todo 리스트가 없음");
        }
          res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });


    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}