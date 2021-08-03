const express = require('express');
const router = express.Router();
const checkToken = require("../middlewares/checkToken")

const { userController, 
        mypageController, 
        goalAchievementTableController,
        goalCharacterController, 
        goalCheckController, 
        goalSetupController } = require('../controllers');
const { use } = require('passport');

router.get("/" , (req, res) => {
    res.send("Site access success")
})

router.post('/signup', userController.signUp);
router.post('/signup/idDoubleCheck', userController.checkusername);
router.post('/signin', userController.signIn);
router.post('/sicialsignup',userController.sicalsignUp)
router.post('/sicialsignin',userController.sicalsignIn)

//이 아래는 모두 로그인을 해야 가능한 기능
router.use(checkToken);
router.get('/signout', userController.signOut);

router.get('/mypage', mypageController.getMyInfo);
router.put('/mypage/ChangeMyPassword', mypageController.ChangeMyPassword);
router.get('/mypage/myCharacterCards', mypageController.myCharacterCards);
router.get('/mypage/myTodoLists', mypageController.myTodoLists);

router.get('/goal', goalAchievementTableController.goalAchievementTable); 
router.post('/goal/make', goalSetupController.goalSetup); 
router.post('/goal', goalCheckController.goalCheck); 
router.post('/goal/giveACharacter', goalCharacterController.goalCharacter); 

module.exports = router;
