const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const LostProduct = new Schema({
    imageUrl: String,
    title: String,
    description: String,
    reward: String,
    lat: { type: Intl, default: 0 },
    lng: { type: Intl, default: 0 }
   });
module.exports = mongoose.model('lostproduct', LostProduct, 'lostproducts');


