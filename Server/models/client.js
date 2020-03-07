const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;


const Client = new Schema({
    name: String,
    email: String,
    password: String,
   });

   Client.plugin(mongoosePaginate);
module.exports = mongoose.model('client', Client);


