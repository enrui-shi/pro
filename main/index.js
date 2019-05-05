const express = require('express');
var proxy = require('http-proxy-middleware');
const app = express();
var cookieParser = require('cookie-parser')
const path = require('path');
const port = 3000;
//get env
require('dotenv').config()
//file dependecy
//var cookieSession = require('cookie-session');


//proxy
//media
app.use('/addmedia', proxy({ target: process.env.SERVER_MEDIA, changeOrigin: false }));
app.use('/media', proxy({ target: process.env.SERVER_MEDIA, changeOrigin: false }));
//question
app.use('/questions', proxy({ target: process.env.SERVER_QUESTION, changeOrigin: false }));
app.use('/answers', proxy({ target: process.env.SERVER_QUESTION, changeOrigin: false }));
app.use('/search', proxy({ target: process.env.SERVER_SEARCH, changeOrigin: false }));
//user
app.use('/user', proxy({ target: process.env.SERVER_USER, changeOrigin: false }));
app.use('/adduser', proxy({ target: process.env.SERVER_USER, changeOrigin: false }));
app.use('/login', proxy({ target: process.env.SERVER_USER, changeOrigin: false }));
app.use('/logout', proxy({ target: process.env.SERVER_USER, changeOrigin: false }));
app.use('/verify', proxy({ target: process.env.SERVER_USER, changeOrigin: false }));
//cookie
app.use(cookieParser())
//var cookieParser = require('cookie-parser');


// var session = require('express-session')
// var MongoStore  = require("connect-mongo")(session);
// app.use(session({
//     store: new MongoStore({  
//         url: process.env.MONGO_ADDRESS+'/mysession'
//     }),  
//     resave: false,   
//     saveUninitialized: true,
//     cookie: {  
//         domain:"130.245.171.196",
//         maxAge: 1000*30*60  
//     },  
//     secret: "lalala"}));


    
// app.use(cookieSession({
//     name: 'session',
//     keys: ['lalala'],
//   }))
//routers

//var user = require('./routers/user.js');
//var login = require('./routers/login.js');
//var logout = require('./routers/logout.js');
//var adduser = require('./routers/adduser.js');
//var verify = require('./routers/verify.js');
//var questions = require('./routers/questions.js');
//var search = require('./routers/search.js')
//var answers = require('./routers/answers.js')
//var media = require('./routers/media.js');
//var addmedia = require('./routers/addmedia.js');
var reset = require('./routers/reset.js');

//api endpoint

//app.use('/login', login);
//app.use('/answers',answers);
//app.use('/adduser', adduser);
//app.use('/verify', verify);
//app.use('/logout', logout);
//app.use('/questions',questions);
//app.use('/search',search);
//app.use('/user',user);
//app.use('/addmedia',addmedia);
//app.use('/media',media);
app.use('/reset',reset)

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/html/login.html'));
    //res.sendFile(path.join(__dirname+'/html/index.html'));
})
app.get('/signup',function(req,res){
    res.sendFile(path.join(__dirname+'/html/adduser.html'));
    //res.sendFile(path.join(__dirname+'/html/index.html'));
})
app.get('/main',function(req,res){
    res.sendFile(path.join(__dirname+'/html/main.html'));
    //res.sendFile(path.join(__dirname+'/html/index.html'));
})
app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})