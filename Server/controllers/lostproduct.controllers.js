const lostproductController = {};
const LostProduct = require('../models/lostProduct');
const path = require('path');


//my code...
lostproductController.PostLostProduct = async(req, res) => {
    try {
        const body = req.body;
        console.log('req.body', body);

        // fahad code for image
        const filePath = `uploads/${req./*params.*/file.originalname}`;
        //const ext = path.extname(req.file.originalname);
        body.imageUrl = filePath;
        //body.imageExt =  ext;
        console.log(body.avatar);

        const lostprod = new LostProduct(body);
        const result = await lostprod.save();
        res.send(result);
    } catch (ex) {
        console.log('ex', ex)
    }
};

lostproductController.updateUser = async(req, res) => {
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
        const result = await LostProduct.updateOne({
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

lostproductController.getAllLostProducts = async(req, res) => {
    // const lostproducts = await LostProduct.find();
    // console.log('all lost products', lostproducts);
    LostProduct.find({})
        .exec(function(err, LostProduct) {
            if (err) {
                console.log('Error while retrieving All buyer');
            } else {
                res.json(LostProduct);
            }
        })
}

lostproductController.getSingleLostProduct = async(req, res) => {
    try {
        const _id = req.params._id
        product = await LostProduct.findOne({ "_id": _id });
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


module.exports = lostproductController;