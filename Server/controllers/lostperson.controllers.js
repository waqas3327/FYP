const lostpersonController = {};
const LostPerson = require('../models/lostPerson');




lostpersonController.PostLostPerson = async (req, res) => {
    try{
        const body = req.body;
        console.log('req.body', body);
    
        // fahad code for image
        // const filePath = `uploads/${req./*params.*/file.originalname}`;
        // const ext = path.extname(req.file.originalname);
        // body.imageUrl = filePath;
        // body.imageExt =  ext;
        // console.log(body.avatar);
    
         const lostpers = new LostPerson(body);
         const result = await lostpers.save(); 
         res.send(result);
        }
        catch(ex){
          console.log('ex',ex)
        } 
   };
  

   module.exports = lostpersonController;