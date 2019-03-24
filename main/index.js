const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

//get env
require('dotenv').config()
//file dependecy
var cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['lalala'],
  }))
//routers
var login = require('./routers/login.js');
var logout = require('./routers/logout.js');
var adduser = require('./routers/adduser.js');
var verify = require('./routers/verify.js');
var questions = require('./routers/questions.js');
var search = require('./routers/search.js')
//api endpoint
app.use('/login', login);
app.use('/adduser', adduser);
app.use('/verify', verify);
app.use('/logout', logout);
app.use('/questions',questions);
app.use('/search',search);

app.get('/',function(req,res){
    res.send('INDEX page');
    //res.sendFile(path.join(__dirname+'/html/index.html'));
})
app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})