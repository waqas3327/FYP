const express = require("express");
const router = express.Router();

const lostproductController = require('../controllers/lostproduct.controllers');
const checkAuth = require('../middleware/check-auth');
const upload = require('../config/upload');


router.post("/PostLostProduct", upload.single('file'), lostproductController.PostLostProduct);
router.put('/updatePostLostProduct/:_id', lostproductController.updateUser);

// router.post("/postlost",lostproductController.postlostproduct);
// router.put("/update/:_id", lostproductController.updateUser);
// router.delete("/:_id", lostproductController.deleteUser);
// router.put("/upload/:id",upload.single('file'), lostproductController.uploadAvatar);



module.exports = router;