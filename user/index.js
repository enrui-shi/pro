const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

//get env
require('dotenv').config()
//file dependecy

//routers
var login = require('./routers/login.js');
var logout = require('./routers/logout.js');
var adduser = require('./routers/adduser.js');

//api endpoint
app.use('/login', login);
app.use('/adduser', adduser);
app.use('/verify', verify);
app.use('/logout', logout);

app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})