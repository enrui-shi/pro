var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/:user',jsonParser,function(req,res){
    data = req.body;
    var forward_url = process.env.SERVER_USER+"/user/"+req.params.user;
    console.log('request send to ',forward_url);
    console.log("data: ", data)
    var options = {  
        url: forward_url,
        method: 'GET',
        json:data
    };
    //send request to Question server
    request(options, function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("received: ",body);
        res.json(body);
    });
});
router.get('/:user/questions',jsonParser,function(req,res){
    data = req.body;
    var forward_url = process.env.SERVER_USER+"/user/"+req.params.user+"/questions";
    console.log('request send to ',forward_url);
    console.log("data: ", data)
    var options = {  
        url: forward_url,
        method: 'GET',
        json:data
    };
    //send request to Question server
    request(options, function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("received: ",body);
        res.json(body);
    });
});
router.get('/:user/answers',jsonParser,function(req,res){
    data = req.body;
    var forward_url = process.env.SERVER_USER+"/user/"+req.params.user+"/answers";
    console.log('request send to ',forward_url);
    console.log("data: ", data)
    var options = {  
        url: forward_url,
        method: 'GET',
        json:data
    };
    //send request to Question server
    request(options, function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("received: ",body);
        res.json(body);
    });
});
module.exports = router;