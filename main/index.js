const express = require('express');
var proxy = require('http-proxy-middleware');
const app = express();
const path = require('path');
const port = 3000;
app.use(cookieParser());

//get env
require('dotenv').config()
//file dependecy
//var cookieSession = require('cookie-session');


//proxy
app.use('/addmedia', proxy({ target: process.env.SERVER_MEDIA, changeOrigin: true }));

var cookieParser = require('cookie-parser');
var session = require('express-session')
var MongoStore  = require("connect-mongo")(session);
app.use(session({
    store: new MongoStore({  
        url: process.env.MONGO_ADDRESS+'/mysession'
    }),  
    cookie: {  
        maxAge: 1000*30*60  
    },  
    secret: "lalala"}));
// app.use(cookieSession({
//     name: 'session',
//     keys: ['lalala'],
//   }))
//routers
var user = require('./routers/user.js');
var login = require('./routers/login.js');
var logout = require('./routers/logout.js');
var adduser = require('./routers/adduser.js');
var verify = require('./routers/verify.js');
var questions = require('./routers/questions.js');
var search = require('./routers/search.js')
var answers = require('./routers/answers.js')
var media = require('./routers/media.js');
//var addmedia = require('./routers/addmedia.js');
var reset = require('./routers/reset.js');

//api endpoint
app.use('/login', login);
app.use('/answers',answers);
app.use('/adduser', adduser);
app.use('/verify', verify);
app.use('/logout', logout);
app.use('/questions',questions);
app.use('/search',search);
app.use('/user',user);
//app.use('/addmedia',addmedia);
app.use('/media',media);
app.use('/reset',reset)

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/html/login.html'));
    //res.sendFile(path.join(__dirname+'/html/index.html'));
})


app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})