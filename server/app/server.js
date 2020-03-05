
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

//schemas
const Client = require('./models/client');
const LostProduct = require('./models/lostProduct');
const LostPerson = require('./models/lostPerson');


const app = express();
let nodemailer = require('nodemailer');
mongoose.connect('mongodb+srv://waqas3327:03105593105@cluster0-kv7vt.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology:true});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const db = "mongodb+srv://waqas3327:03105593105@cluster0-kv7vt.mongodb.net/test?retryWrites=true&w=majority"
mongoose.Promise = global.Promise;
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true }, function (err) {
  if (err) {
    console.error("Error ! " + err);
  }
});

app.post('/register', async (req, res) => { 
  try{
  const body = req.body;
  console.log('req.body', body);
  const email = body.email;
  const password = body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    console.log('hash - > ', hash);
    body.password = hash;
    const result = await Client.findOne({"email":  email});
    if(!result) // this means result is null
    {
   const student = new Client(body);
   const result = await student.save(); 
   res.send({ message: 'Student signup successful!!'});
    }
    else{
      res.status(401).send({
        Error: 'User Already exist'
       });
    }
  }
  catch(ex){
    console.log('ex',ex)
  } 
  });

  app.post('/PostLostProduct', async (req, res) => { 
    try{
    const body = req.body;
    console.log('req.body', body);
     const lostprod = new LostProduct(body);
     const result = await lostprod.save(); 
     res.send({ message: 'Data posted!!'});
    }
    catch(ex){
      console.log('ex',ex)
    } 
    });

    app.post('/PostLostPerson', async (req, res) => { 
      try{
      const body = req.body;
      console.log('req.body', body);
       const lostpers = new LostPerson(body);
       const result = await lostpers.save(); 
       res.send({ message: 'Data posted!!'});
      }
      catch(ex){
        console.log('ex',ex)
      } 
      });

  app.post('/login',  async (req, res) => { 
    const body = req.body;
    console.log('req.body', body);

    const email = body.email;

    // lets check if email exists 

    const result = await Client.findOne({"email":  email});
    if(!result) // this means result is null
    {
      res.status(401).send({
        Error: 'This user doesnot exists. Please signup first'
       });
    }
    else{
      // email did exist 
      // so lets match password 

      if ( bcrypt.compareSync(body.password, result.password)){

        // great, allow this user access 

        console.log('match');
        

        res.send({message: 'Successfully Logged in the system!'});
      }

        else{

          console.log('password doesnot match try again!');

          res.status(401).send({message: 'Wrong email or Password'});
        }
    }
  });
  app.post('/sendmail', async (req, res) => {
    try {
    const body = req.body;
    let pass = "";
    console.log('req.body', body);
    const email = body.email;
    const result = await Client.findOne({"email":  email});
    if(!result) // this means result is null
    {
      res.status(401).send({
        Error: 'This user doesnot exists. Please signup first'
       }); 
    }
    else {
        pass = result.password;
      console.log(pass);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'moviecon3327@gmail.com',
      pass: '03105593105'
    }
  });
  var mailOptions = {
    from: 'moviecon3327@gmail.com',
    to: email,
    subject: 'Password Recovery Movie-Con',
    html: `<h1>Hello</h1><p>Thanks a lot for using Movie-Con, your password is: ${pass} </p> <h2>regards:</h2> <p>Movie-Con</p>`
  };
  transporter.sendMail(mailOptions, function(error, info){
    
    if (error) {
      console.log(error);
      res.send({message: 'we got a problem'});
    } else {
      console.log('Email sent: ' + info.response);
      res.send({message: 'succefull!'});
    }
  });
}
}
  catch(ex){
    console.log('ex',ex)
  }
  });
  app.get('/',  function (req, res) {
  res.status(200).send({
    message: 'Express server'});
});
// app.get('*', (req, res) => {
//     res.send('Page doesnot exists');
//   });
const port = 3000;
  app.listen(port, function(){
    console.log('Express application running on localhost:' + port);
  });
