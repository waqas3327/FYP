const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;


const foundPerson = new Schema({
    imageUrl: String,
    youremail: String,
    title: String,
    description: String,
    reward: String,
    lat: { type: Intl, default: 0 },
    lng: { type: Intl, default: 0 }
   });
   foundPerson.plugin(mongoosePaginate);
module.exports = mongoose.model('foundperson', foundPerson);


