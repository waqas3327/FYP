const express = require("express");
const router = express.Router();

const lostpersonController = require('../controllers/lostperson.controllers');
const checkAuth = require('../middleware/check-auth');
// const upload = require('../config/upload');


router.post("/PostLostPerson", lostpersonController.PostLostPerson);


module.exports = router;