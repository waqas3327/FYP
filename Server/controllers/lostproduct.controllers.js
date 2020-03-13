const lostproductController = {};
const LostProduct = require('../models/lostProduct');
const path = require('path');


//my code...
lostproductController.PostLostProduct = async (req, res) => {
    try{
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
        }
        catch(ex){
          console.log('ex',ex)
        } 
   };
   
   lostproductController.updateUser = async (req, res) => {
    if (!req.params._id) {
        res.status(500).send({
            message: 'ID missing'
        });
    }
    try {
        const _id = req.params._id;
        console.log('here is id,',req.params._id);
        let updates = req.body;
        console.log('here is body,',req.body);
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
   
//code from alamgir sir..
// lostproductController.postlostproduct = async (req, res) => {

//   LostProduct.create(req.body, function (err, result) {
//       if (err) {
//           res.status(500).send(err);
//       } else {
//           var data = {
//               code: 200,
//               message: 'Data inserted successfully',
//               data: result
//           };
//           res.status(200).send(data);
//       }
//   });
// };



// lostproductController.deleteUser = async (req, res) => {
//   if (!req.params._id) {Fu
//       res.status(500).send({
//           message: 'ID missing'
//       });
//   }
//   try {
//       const _id = req.params._id;

//       const result = await LostProduct.findOneAndDelete({
//           _id: _id
//       });
//   //   const result = await Inventory.updateOne({
//   //         _id: _id
//   //     }, {
//   //         $set: {is_deleted: 1}
//   //     }, {
//   //         upsert: true,
//   //         runValidators: true
//   //     });
//       res.status(200).send({
//           code: 200,
//           message: "Deleted Successfully"
//       });

//   } catch (error) {
//       console.log('error', error);
//       return res.status(500).send(error);
//   }
// };
// lostproductController.uploadAvatar = async (req, res) => {
//   try {
// const filePath = `uploads/${req.params.id}`;
// const ext = path.extname(req.file.originalname);
// const updates = {
//   avatar: filePath,
//   avatar_ext: ext 
// }
// runUpdateById(req.params.id,updates,res);
//   } catch (error) {
//       console.log('error', error);
//       return res.status(500).send(error);
//   }
  
// };
// lostproductController.updateUser = async (req, res) => {
//   if (!req.params._id) {
//       res.status(500).send({
//           message: 'ID missing'
//       });
//   }
//   try {
//       const _id = req.params._id;
//       let updates = req.body;
//           runUpdate(_id, updates, res);
    

//   } catch (error) {
//       console.log('error', error);
//       return res.status(500).send(error);
//   }

// };

// async function runUpdate(_id, updates, res) {
//   try {
//       const result = await LostProduct.updateOne({
//           _id: _id
//       }, {
//           $set: updates
//       }, {
//           upsert: true,
//           runValidators: true
//       });


//       {
//           if (result.nModified == 1) {
//               res.status(200).send({
//                   code: 200,
//                   message: "Updated Successfully"
//               });
//           } else if (result.upserted) {
//               res.status(200).send({
//                   code: 200,
//                   message: "Created Successfully"
//               });
//           } else {
//               res
//                   .status(422)
//                   .send({
//                       code: 422,
//                       message: 'Unprocessible Entity'
//                   });
//           }
//       }
//   } catch (error) {
//       console.log('error', error);
//       return res.status(500).send(error);
//   }
// }
// async function runUpdateById(id, updates, res) {

//   try {
//       const result = await LostProduct.updateOne({
//           id: id
//       }, {
//           $set: updates
//       }, {
//           upsert: true,
//           runValidators: true
//       });


//                   if (result.nModified == 1) {
//               res.status(200).send({
//                   code: 200,
//                   message: "Updated Successfully"
//               });
//           } else if (result.upserted) {
//               res.status(200).send({
//                   code: 200,
//                   message: "Created Successfully"
//               });
//           } else {

//               {
//                   res.status(200).send({
//                       code: 200,
//                       message: "Task completed successfully"
//                   });
//               }
//           //     res
//           //         .status(422)
//           //         .send({
//           //             code: 422,
//           //             message: 'Unprocessible Entity'
//           //         });
//           // }
//       }
//   } catch (error) {
//       console.log('error', error);
//       return res.status(500).send(error);
//   }
// }

   module.exports = lostproductController;