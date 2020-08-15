const userController = {};
const Client = require('../models/client');
const path = require('path');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
let nodemailer = require('nodemailer');


userController.registerUser = async(req, res) => {
    try {
        const body = req.body;
        console.log('req.body', body);
        const email = body.email;
        const password = body.password;

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        console.log('hash - > ', hash);
        body.password = hash;
        const result = await Client.findOne({ "email": email });
        if (!result) // this means result is null
        {
            const student = new Client(body);
            const result = await student.save();
            res.send({ message: 'signup successful!!' });
        } else {
            res.status(401).send({
                Error: 'User Already exist'
            });
        }
    } catch (ex) {
        console.log('ex', ex)
    }
};


userController.loginUser = async(req, res) => {
    try {
        const body = req.body;
        const email = body.email;
        // lets check if email exists
        const result = await Client.findOne({ email: email });
        if (!result) {
            // this means result is null
            res.status(401).send({
                Error: 'This user doesnot exists. Please signup first'
            });
        } else {
            // email did exist
            // so lets match password

            if (bcrypt.compareSync(body.password, result.password)) {
                // great, allow this user access

                result.password = undefined;

                const token = jsonwebtoken.sign({
                    data: result,
                    role: 'User'
                }, process.env.JWT_KEY, { expiresIn: '7d' });

                res.send({ message: 'Successfully Logged in', token: token });
            } else {
                console.log('password doesnot match');

                res.status(401).send({ message: 'Wrong email or Password' });
            }
        }
    } catch (ex) {
        console.log('ex', ex);
    }
};

userController.getSingleUser = async(req, res) => {
    try {
        const email = req.params.email
        user = await Client.findOne({ "email": email });
        res.status(200).send({
            code: 200,
            message: 'Successful',
            data: user
        });

    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
}



userController.updateUser = async(req, res) => {
    if (!req.params.email) {
        res.status(500).send({
            message: 'ID missing'
        });
    }
    try {
        const email = req.params.email;

        //console.log('here is id,',req.params._id);
        let updates = req.body;
        delete updates['email'];
        console.log('here is body,', req.body);
        runUpdate(email, updates, res);


    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }

};

async function runUpdate(email, updates, res) {
    try {
        const result = await Client.updateOne({
            email: email
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





userController.SendMail = async(req, res) => {
    try {
        const body = req.body;
        let pass = "";
        console.log('req.body', body);
        const email = body.email;
        const result = await Client.findOne({ "email": email });
        if (!result) // this means result is null
        {
            res.status(401).send({
                Error: 'This user doesnot exists. Please signup first'
            });
        } else {
            pass = result.password;

            console.log(pass);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'moviecon3327@gmail.com',
                    pass: '03105593105'
                }
            });
            var mailOptions = {
                from: 'lost&found3327@gmail.com',
                to: email,
                subject: 'Password Recovery Lost & Found',
                html: `<h1>Hello</h1><p>Thanks a lot for using Lost & Found, your password is: ${pass} </p> <h2>regards:</h2> <p>Lost & Found</p>`
            };
            transporter.sendMail(mailOptions, function(error, info) {

                if (error) {
                    console.log(error);
                    res.send({ message: 'we got a problem' });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send({ message: 'succefull!' });
                }
            });
        }
    } catch (ex) {
        console.log('ex', ex)
    }
};

module.exports = userController;
module.exports = userController;