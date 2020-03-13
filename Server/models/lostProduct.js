const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;


const LostProduct = new Schema({
    imageUrl: String,
    //imageExt: String,
    title: String,
    description: String,
    reward: String,
    lat: { type: Intl, default: 0 },
    lng: { type: Intl, default: 0 }
   });
   LostProduct.plugin(mongoosePaginate);
module.exports = mongoose.model('lostproduct', LostProduct);


