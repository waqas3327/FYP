const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
require('dotenv').config();
const errorHandler = require("./middleware/error-handler");
const errorMessage = require("./middleware/error-message");
const accessControls = require("./middleware/access-controls");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const bodyParser = require('body-parser')
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json()); // to support JSON-encoded bodies

// Requiring Routes

const UserRoutes = require('./routes/user.routes');
const lostproductRoutes = require('./routes/lostproduct.routes');
const lostpersonRoutes = require('./routes/lostperson.routes');
const foundproductRoutes = require('./routes/foundproduct.routes');
const foundpersonRoutes = require('./routes/foundperson.routes');


// connection to mongoose
const mongoCon = process.env.mongoCon;

mongoose.connect(mongoCon, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
//mongodb+srv://waqas3327:03105593105@cluster0-kv7vt.mongodb.net/test?retryWrites=true&w=majority

//const fs = require('fs');
//fs.readdirSync(__dirname + "/models").forEach(function(file) {
//    require(__dirname + "/models/" + file);
//});

// in case you want to serve images 
app.use(express.static("public"));

app.get('/', function(req, res) {
    res.status(200).send({
        message: 'Express backend server'
    });
});

app.set('port', (3005));

app.use(accessControls);
app.use(cors());

// Routes which should handle requests
app.use("/user", UserRoutes);
app.use("/product", lostproductRoutes);
app.use("/person", lostpersonRoutes);
app.use("/foundproduct", foundproductRoutes);
app.use("/foundperson", foundpersonRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploadfoundperson', express.static(path.join(__dirname, 'uploadfoundperson')));
app.use('/uploadfoundproduct', express.static(path.join(__dirname, 'uploadfoundproduct')));
app.use('/uploadPerson', express.static(path.join(__dirname, 'uploadPerson')));



app.use(errorHandler);

app.use(errorMessage);

server.listen(app.get('port'));
console.log('listening on port', app.get('port'));