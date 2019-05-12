const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
var Memcached = require('memcached');
var memcached = new Memcached('localhost:11211');
var cookieParser = require('cookie-parser')
app.locals.memcached = memcached; 
//get env
require('dotenv').config()
//file dependecy

app.use(cookieParser())
//routers
var login = require('./routers/login.js');
var logout = require('./routers/logout.js');
var adduser = require('./routers/adduser.js');
var verify = require('./routers/verify.js');
var user = require('./routers/user.js');
//api endpoint
app.use('/login', login);
app.use('/adduser', adduser);
app.use('/verify', verify);
app.use('/logout', logout);
app.use('/user',user);

MongoClient.connect(process.env.MONGO_ADDRESS, (err, client) => {
    // ... start the server
    if(err){
        console.log(err);
    }else{
        console.log("success connet to db pro");
    }
    db = client.db('pro');
    //console.log(db);
    app.locals.db = db;
    app.listen(port,'0.0.0.0', () => {
        return console.log(`App listening on port ${port}!`);
    })
  })