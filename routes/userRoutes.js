const express = require('express');
const {getuserController,updateUserController, resetPasswordController, updatePasswordController, deleteUserController} = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');


const router = express.Router();

router.get("/getuser",auth, getuserController);

router.put("/updateUser",auth, updateUserController);

router.post("/resetPassword",auth, resetPasswordController);

router.post("/updatePassword",auth, updatePasswordController);

router.delete("/deleteUser/:id",auth, deleteUserController);



module.exports = router