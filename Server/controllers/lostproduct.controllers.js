const lostproductController = {};
const LostProduct = require('../models/lostProduct');




lostproductController.PostLostProduct = async (req, res) => {
    try{
        const body = req.body;
        console.log('req.body', body);
    
        // fahad code for image
        // const filePath = `uploads/${req./*params.*/file.originalname}`;
        // const ext = path.extname(req.file.originalname);
        // body.imageUrl = filePath;
        // body.imageExt =  ext;
        // console.log(body.avatar);
    
         const lostprod = new LostProduct(body);
         const result = await lostprod.save(); 
         res.send({ message: 'Data posted!!'});
        }
        catch(ex){
          console.log('ex',ex)
        } 
   };
  

   module.exports = lostproductController;