var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/',jsonParser,function(req,res){
    data = req.body;
    var options = {  
        url: process.env.USER_SERVER,
        path: '/adduser',
        method: 'POST',
        json: data
    };
    //send request to USER server
    request(options, function(err, res, body) {  
        let json = JSON.parse(body);
        console.log(json);
    });
});



module.exports = router;