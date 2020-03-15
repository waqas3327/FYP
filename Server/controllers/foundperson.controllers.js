const foundpersonController = {};
const foundPerson = require('../models/foundPerson');
const path = require('path');



foundpersonController.PostfoundPerson = async (req, res) => {
    try{
        const body = req.body;
        console.log('req.body', body);
    
        // fahad code for image
         const filePath = `uploadfoundperson/${req./*params.*/file.originalname}`;
        // const ext = path.extname(req.file.originalname);
         body.imageUrl = filePath;
        // body.imageExt =  ext;
        // console.log(body.avatar);
    
         const foundpers = new foundPerson(body);
         const result = await foundpers.save(); 
         res.send(result);
        }
        catch(ex){
          console.log('ex',ex)
        } 
   };
  

   //updating
   foundpersonController.updateUser = async (req, res) => {
    if (!req.params._id) {
        res.status(500).send({
            message: 'ID missing'
        });
    }
    try {
        const _id = req.params._id;
        //console.log('here is id,',req.params._id);
        

        // const filePath = `uploadPerson/${req./*params.*/file.originalname}`;
        // // const ext = path.extname(req.file.originalname);
        // req.body.imageUrl = filePath;
      

        
        let updates = req.body;
        //console.log('here is body,',req.body);
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

   module.exports = foundpersonController;