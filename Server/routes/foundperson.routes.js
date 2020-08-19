const express = require("express");
const router = express.Router();

const foundpersonController = require('../controllers/foundperson.controllers');
const checkAuth = require('../middleware/check-auth');
const uploadfoundperson = require('../config/uploadfoundperson');


router.post("/PostfoundPerson", uploadfoundperson.single('file'), foundpersonController.PostfoundPerson);
router.put('/updatePostfoundPerson/:_id', foundpersonController.updateUser);
router.put('/updateFoundPersonPost/:_id', foundpersonController.updatePost);
router.get("/getallfoundpersons", foundpersonController.getAllFoundPersons);
router.get('/getsinglefoundperson/:_id', foundpersonController.getSingleFoundPerson);

router.get('/getsinglefoundpersonemail/:email', foundpersonController.getSingleFoundPersonEmail);
router.delete('/deleteFoundPersonPost/:_id', foundpersonController.deletePost);


//router.post("/PostLostPerson", lostpersonController.PostLostPerson);


module.exports = router;