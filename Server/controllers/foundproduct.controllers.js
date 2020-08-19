const foundproductController = {};
const foundProduct = require('../models/foundProduct');
const path = require('path');


//my code...
foundproductController.PostfoundProduct = async(req, res) => {
    try {
        const body = req.body;
        console.log('req.body', body);

        // fahad code for image
        const filePath = `uploadfoundproduct/${req./*params.*/file.originalname}`;
        //const ext = path.extname(req.file.originalname);
        body.imageUrl = filePath;
        //body.imageExt =  ext;
        console.log(body.avatar);

        const foundprod = new foundProduct(body);
        const result = await foundprod.save();
        res.send(result);
    } catch (ex) {
        console.log('ex', ex)
    }
};

//update user
foundproductController.updateUser = async(req, res) => {
    if (!req.params._id) {
        res.status(500).send({
            message: 'ID missing'
        });
    }
    try {
        const _id = req.params._id;

        //console.log('here is id,',req.params._id);
        let updates = req.body;
        console.log('here is body,', req.body);
        runUpdate(_id, updates, res);


    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }

};

async function runUpdate(_id, updates, res) {
    try {
        const result = await foundProduct.updateOne({
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

//update posts
foundproductController.updatePost = async(req, res) => {
    if (!req.params._id) {
        res.status(500).send({
            message: 'ID missing'
        });
    }
    try {
        const _id = req.params._id;

        //console.log('here is id,',req.params._id);
        let updates = req.body;
        delete updates['youremail'];
        console.log('here is body,', req.body);
        runUpdate(_id, updates, res);


    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }

};

async function runUpdate(_id, updates, res) {
    try {
        const result = await foundProduct.updateOne({
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
foundproductController.deletePost = async(req, res) => {
    if (!req.params._id) {
        Fu;
        res.status(500).send({
            message: 'ID missing'
        });
    }
    try {
        const _id = req.params._id;

        const result = await foundProduct.findOneAndDelete({
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


foundproductController.getAllFoundProducts = async(req, res) => {
    // const lostproducts = await LostProduct.find();
    // console.log('all lost products', lostproducts);
    foundProduct.find({})
        .exec(function(err, foundProduct) {
            if (err) {
                console.log('Error while retrieving ');
            } else {
                res.json(foundProduct);
            }
        })
}

foundproductController.getSingleFoundProduct = async(req, res) => {
    try {
        const _id = req.params._id
        product = await foundProduct.findOne({ "_id": _id });
        res.status(200).send({
            code: 200,
            message: 'Successful',
            data: product
        });


    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
}

foundproductController.getSingleFoundProductEmail = async(req, res) => {
    try {
        const email = req.params.email
        product = await foundProduct.find({ "youremail": email });
        res.json(product);
        // res.status(200).send({
        //     code: 200,
        //     message: 'Successful',
        //     data: product
        // });


    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
}

module.exports = foundproductController;