const express = require("express");
const router = express.Router();

const foundproductController = require('../controllers/foundproduct.controllers');
const checkAuth = require('../middleware/check-auth');
const uploadfoundproduct = require('../config/uploadfoundproduct');


router.post("/PostfoundProduct", uploadfoundproduct.single('file'), foundproductController.PostfoundProduct);
router.put('/updatePostfoundProduct/:_id', foundproductController.updateUser);
router.put('/updateFoundProductPost/:_id', foundproductController.updatePost);

router.get("/getallfoundproducts", foundproductController.getAllFoundProducts);
router.get('/getsinglefoundproduct/:_id', foundproductController.getSingleFoundProduct);
router.get('/getsinglefoundproductemail/:email', foundproductController.getSingleFoundProductEmail);
router.delete('/deleteFoundProductPost/:_id', foundproductController.deletePost);




// router.post("/postlost",lostproductController.postlostproduct);
// router.put("/update/:_id", lostproductController.updateUser);
// router.delete("/:_id", lostproductController.deleteUser);
// router.put("/upload/:id",upload.single('file'), lostproductController.uploadAvatar);



module.exports = router;