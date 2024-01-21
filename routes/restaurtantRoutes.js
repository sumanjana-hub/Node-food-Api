const express = require('express');
const auth = require("../middlewares/authMiddleware");
const { createrestaurtantController, getAllResturantController, getResturantByIdController, deleteResturantController } = require('../controllers/restaurtantController');

const router = express.Router();

router.post("/create", auth,createrestaurtantController)

router.get("/getAll", getAllResturantController);

router.get("/get/:id", getResturantByIdController);

router.delete("/delete/:id", auth, deleteResturantController);


module.exports = router;

