const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;


const foundProduct = new Schema({
    imageUrl: String,
    youremail: String,
    //imageExt: String,
    title: String,
    description: String,
    reward: String,
    lat: { type: Intl, default: 0 },
    lng: { type: Intl, default: 0 }
});
foundProduct.plugin(mongoosePaginate);
module.exports = mongoose.model('foundproduct', foundProduct);