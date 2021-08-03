const { Goals, Users, UsersHaveCharacters } = require("../models")

module.exports={
  goalCharacter : async (req, res) => {
    console.log('[goalCharacter req.body]', req.body)
    console.log('[goalCharacter req.params]', req.params)
    console.log('[goalCharacter req]', req.query)


    let { id } = req.body;

    try {

      const userId = await Users.findOne({
        where: {username:id}
      }).then(data => data.dataValues.id)

      const GoalId = await Goals.findAll({
        where: {userId : userId}
      }).then(data => data[data.length-1].dataValues.id)


      const progress = await Goals.findOne(
          { where: { id:GoalId }}
        ).then(item => 
          item.dataValues.progress
        ).catch((err) => {
          console.log(err)
        });

      if (progress===100) {
        const achievement = await Goals.findOne(
            { where: { id:GoalId }}
          ).then(item => 
            item.dataValues.achievement
          ).catch((err) => {
            console.log(err)
          });
          
        const i = function (achievement) {
          if (achievement <= 20) {
            return 1
          }
          else if (achievement <= 40) {
            return 2
          }
          else if (achievement <= 60) {
            return 3
          }
          else if (achievement <= 80) {
            return 4
          }
          else if (achievement <= 100) {
            return 5
          }
          else {
            return 6
          }
        }

        UsersHaveCharacters.create({
          userId : userId,
          characterId : i(achievement),
        })
        .then(data => {
          res.status(200).json(data);      
        })
        .catch((err) => {
          res.status(500).send(err);
        });
        
      } else {
          res.status(200).send('진행률이 100%가 아닙니다. 목표 달성을 위해 더 힘내세요!');
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
