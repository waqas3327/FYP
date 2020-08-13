const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user.controllers');
const checkAuth = require('../middleware/check-auth');
const upload = require('../config/upload');

// router.get("/", UserController.getAll);
router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser);
// router.post("/register", /*upload.single('file'),*/ UserController.registerUser);
router.post("/sendmail", UserController.SendMail);
router.get("/getsingleuser/:email", UserController.getSingleUser);
// router.post("/",UserController.addUser);
router.put("/updateuser/:email", UserController.updateUser);
//router.delete("/:_id", UserController.deleteUser);

module.exports = router;