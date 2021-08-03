const { Goals, Users } = require("../models")
const getFormatDate = require("../middlewares/getFormatDate")
const getFormatEndDate = require("../middlewares/getFormatEndDate")

module.exports = {
  goalSetup: async (req, res) => {

    console.log('[goalSetup req.body]', req.body)
    console.log('[goalSetup req.params]', req.params)
    console.log('[goalSetup req.query]', req.query)

    const { goal, subgoal1, subgoal2, subgoal3, id } = req.body
    const todayDate = new Date();
    const formatTodayDate = getFormatDate(todayDate);
    const formatEndDate = getFormatEndDate(todayDate);

    try {

      const userId = await Users.findOne({
        where: { username: id }
      }).then(data => data.dataValues.id)

      const GoalId = await Goals.findAll({
        where: { userId: userId }
      }).then(data => data)
        .catch((err) => {
          console.log('GoalId', err)
        });

      if (GoalId.length === 0) {

        Goals.create({
          goal: goal,
          subgoal1: subgoal1,
          subgoal2: subgoal2,
          subgoal3: subgoal3,
          progress: 0,
          achievement: 0,
          startDate: formatTodayDate,
          endDate: formatEndDate,
          UserId: userId,
        }).then(data => {
          console.log(data.dataValues.progress);
          res.status(200).json(data);
        }).catch((err) => {
          console.log('Goals.create', err)
        });

      } else {

        const progress = await Goals.findOne(
          { where: { id: GoalId[GoalId.length - 1].dataValues.id } }
        ).then(item =>
          item.dataValues.progress
        ).catch((err) => {
          console.log('progress', err)
        });

        if (progress !== 100) {

          res.status(200).send('기존 목표가 있습니다. 기존 목표를 달성하세요.')

        } else if (progress === 100 || !progress) {

          Goals.create({
            goal: goal,
            subgoal1: subgoal1,
            subgoal2: subgoal2,
            subgoal3: subgoal3,
            progress: 0,
            achievement: 0,
            startDate: formatTodayDate,
            endDate: formatEndDate,
            UserId: userId,
          }).then(data => {
            console.log(data.dataValues.progress);
            res.status(200).json(data);
          }).catch((err) => {
            console.log('Goals.create', err)
          });

        }
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
