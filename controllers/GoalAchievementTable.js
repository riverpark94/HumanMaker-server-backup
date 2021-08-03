const { Goals, Users, Stickers } = require("../models")

module.exports={
  goalAchievementTable : async (req, res) => {
    
    console.log('[goalAchievementTable req.body]', req.body)
    console.log('[goalAchievementTable req.params]', req.params)
    console.log('[goalAchievementTable req]', req.query)

    let { id } = req.query;

    try {

      const userId = await Users.findOne({
        where: {username:id}
      }).then(data => data.dataValues.id)

      Goals.findAll({
        where: {
          userId : userId
        },
          include: [{  model: Stickers }]
      })
      .then(data => {
        if(data.length === 0) {
        res.status(201).send("저장된 db가 없습니다.");
        }
        else if(data[data.length-1].progress !== 100) {
          res.status(200).json(data[data.length-1]);
        } else {
          res.status(201).send("새 목표를 만들어야 합니다");
        }
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
