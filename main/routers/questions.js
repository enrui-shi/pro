var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');


router.post('/',jsonParser,function(req,res){
    data = req.body;
    console.log("data: ", data);
    console.log(req.originalUrl);
    var options = {  
        url: process.env.SERVER_QUESTION+"/question",
        method: 'POST',
        json: data
    };
    //send request to USER server
    request(options, function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("req: ",body);
        res.json(body);
    });
});


router.get('/',jsonParser,function(req,res){
    data = req.body;
    console.log("data: ", data)
    var options = {  
        url: process.env.SERVER_QUESTION+"/question",
        method: 'GET',
        json: data
    };
    //send request to USER server
    request(options, function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("req: ",body);
        res.json(body);
    });
});
module.exports = router;