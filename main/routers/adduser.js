var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/',jsonParser,function(req,res){
    data = req.body;
    var forward_url = process.env.SERVER_USER+"/adduser";
    console.log('request send to ',forward_url);
    if(process.env.DEBUG){
        console.log("data: ", data)
    }
    req.session.status = 'offline';
    var options = {  
        url: process.env.SERVER_USER+"/adduser",
        method: 'POST',
        json: data
    };
    //send request to USER server
    request({  
        url: process.env.SERVER_USER+"/adduser",
        method: 'POST',
        json: data
        }, 
    function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("req: ",body);
        res.json(body);
    });
});



module.exports = router;