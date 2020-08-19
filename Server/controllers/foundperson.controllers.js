const foundpersonController = {};
const foundPerson = require('../models/foundPerson');
const path = require('path');



foundpersonController.PostfoundPerson = async(req, res) => {
    try {
        const body = req.body;
        console.log('req.body', body);
        const filePath = `uploadfoundperson/${req./*params.*/file.originalname}`;
        body.imageUrl = filePath;
        const foundpers = new foundPerson(body);
        const result = await foundpers.save();
        res.send(result);
    } catch (ex) {
        console.log('ex', ex)
    }
};

//updating
foundpersonController.updateUser = async(req, res) => {
    if (!req.params._id) {
        res.status(500).send({
            message: 'ID missing'
        });
    }
    try {
        const _id = req.params._id;
        let updates = req.body;
        runUpdate(_id, updates, res);
    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
};
async function runUpdate(_id, updates, res) {
    try {
        const result = await foundPerson.updateOne({
            _id: _id
        }, {
            $set: updates
        }, {
            upsert: true,
            runValidators: true
        });


        {
            if (result.nModified == 1) {
                res.status(200).send({
                    code: 200,
                    message: "Updated Successfully"
                });
            } else if (result.upserted) {
                res.status(200).send({
                    code: 200,
                    message: "Created Successfully"
                });
            } else {
                res
                    .status(422)
                    .send({
                        code: 422,
                        message: 'Unprocessible Entity'
                    });
            }
        }
    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
}


//updating posts
foundpersonController.updatePost = async(req, res) => {
    if (!req.params._id) {
        res.status(500).send({
            message: 'ID missing'
        });
    }
    try {
        const _id = req.params._id;
        let updates = req.body;
        delete updates['youremail'];
        runUpdate(_id, updates, res);
    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
};
async function runUpdate(_id, updates, res) {
    try {
        const result = await foundPerson.updateOne({
            _id: _id
        }, {
            $set: updates
        }, {
            upsert: true,
            runValidators: true
        });


        {
            if (result.nModified == 1) {
                res.status(200).send({
                    code: 200,
                    message: "Updated Successfully"
                });
            } else if (result.upserted) {
                res.status(200).send({
                    code: 200,
                    message: "Created Successfully"
                });
            } else {
                res
                    .status(422)
                    .send({
                        code: 422,
                        message: 'Unprocessible Entity'
                    });
            }
        }
    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
}

//deleting post
foundpersonController.deletePost = async(req, res) => {
    if (!req.params._id) {
        Fu;
        res.status(500).send({
            message: 'ID missing'
        });
    }
    try {
        const _id = req.params._id;

        const result = await foundPerson.findOneAndDelete({
            _id: _id
        });

        res.status(200).send({
            code: 200,
            message: 'Deleted Successfully'
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
};




foundpersonController.getAllFoundPersons = async(req, res) => {
    foundPerson.find({})
        .exec(function(err, foundPerson) {
            if (err) {
                console.log('Error while retrieving ');
            } else {
                res.json(foundPerson);
            }
        })
}

foundpersonController.getSingleFoundPerson = async(req, res) => {
    try {
        const _id = req.params._id
        person = await foundPerson.findOne({ "_id": _id });
        res.status(200).send({
            code: 200,
            message: 'Successful',
            data: person
        });


    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
}

foundpersonController.getSingleFoundPersonEmail = async(req, res) => {
    try {
        const email = req.params.email
        person = await foundPerson.find({ "youremail": email });
        res.json(person);
        // res.status(200).send({
        //     code: 200,
        //     message: 'Successful',
        //     data: person
        // });


        // foundPerson.find({})
        //     .exec(function(err, foundPerson) {
        //         if (err) {
        //             console.log('Error while retrieving ');
        //         } else {
        //             res.json(foundPerson);
        //         }
        //     })


    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
}

module.exports = foundpersonController;