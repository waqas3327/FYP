const express = require("express");
const router = express.Router();

const lostpersonController = require('../controllers/lostperson.controllers');
const checkAuth = require('../middleware/check-auth');
const uploadPerson = require('../config/uploadPerson');


router.post("/PostLostPerson", uploadPerson.single('file'), lostpersonController.PostLostPerson);
router.put('/updatePostLostPerson/:_id', lostpersonController.updateUser);
router.put('/updateLostPersonPost/:_id', lostpersonController.updatePost);


router.get("/getalllostpersons", lostpersonController.getAllLostPersons);
router.get('/getsinglelostperson/:_id', lostpersonController.getSingleLostPerson);

router.get('/getsinglelostpersonemail/:email', lostpersonController.getSingleLostPersonEmail);
router.delete('/deleteLostPersonPost/:_id', lostpersonController.deletePost);


//router.post("/PostLostPerson", lostpersonController.PostLostPerson);


module.exports = router;