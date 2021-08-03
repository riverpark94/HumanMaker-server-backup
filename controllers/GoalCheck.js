const { Goals, Users, Stickers } = require("../models")

module.exports={
  goalCheck : async (req, res) => {

    console.log('[goalCheck req.body]', req.body)
    console.log('[goalCheck req.params]', req.params)
    console.log('[goalCheck req]', req.query)

    let { id } = req.body;
    // const { GoalId } = req.body;
    const garlicSticker = '/static/media/garlic.b85e4241.png'

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
        res.status(200).send('목표를 끝냈습니다. 캐릭터 카드를 받고 새로운 목표를 세우세요.')
      } else {
        const check = await Stickers.create({ 
            sticker:garlicSticker,
            GoalId
          })
          .then(data => {
            res.status(200).json(data);      
          }).catch((err) => {
            console.log(err)
          });

        const updataProgress = await Goals.findOne(
            { where: { id:GoalId }}
          ).then(item => 
            item.dataValues.progress = item.dataValues.progress +1
          ).catch((err) => {
            console.log(err)
          });

        const updataAchievement = await Goals.findOne(
            { where: { id:GoalId }}
          ).then(item => 
            item.dataValues.achievement = item.dataValues.achievement +1
          ).catch((err) => {
            console.log(err)
          });

        Goals.update(
            { 
              progress: updataProgress,
              achievement: updataAchievement 
            },
            { where: { id:GoalId }}
          ).then(data => {
            res.status(200).json(check);
          }).catch((err) => {
            console.log(err)
          });
          
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}