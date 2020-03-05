const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Client = new Schema({
    name: String,
    email: String,
    password: String,
   });
module.exports = mongoose.model('client', Client, 'clients');


