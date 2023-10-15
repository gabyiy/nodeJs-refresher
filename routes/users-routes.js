

const express = require("express");

const {check}= require("express-validator")


const usersController = require("../controllers/users-controler")

const router = express.Router();


router.get("/",usersController.getUsers)
router.get("/:uid",usersController.getUserById);
router.post("/",[check("name").not().isEmpty()],usersController.createUser );
router.patch("/:uid",[check("name").not().isEmpty()],usersController.updateUser)
router.delete("/:uid",usersController.deleteUser)
router.post("/signup",[check("name").not().isEmpty(),check("password").not().isEmpty().isLength({min:6}),check("email").normalizeEmail().isEmail()],usersController.signup);
router.post("/login",usersController.login);






module.exports =router;