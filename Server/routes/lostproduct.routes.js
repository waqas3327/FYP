const express = require("express");
const router = express.Router();

const lostproductController = require('../controllers/lostproduct.controllers');
const checkAuth = require('../middleware/check-auth');
// const upload = require('../config/upload');


router.post("/PostLostProduct",lostproductController.PostLostProduct);


module.exports = router;