var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/add',jsonParser,function(req,res){
    data = req.body;
    console.log("data: ", data);
    var forward_url = process.env.SERVER_QUESTION+"/question/add"
    console.log('request send to ',forward_url);
    var options = {  
        url: forward_url,
        method: 'POST',
        json: data
    };
    //send request to Question server
    request(options, function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("req: ",body);
        res.json(body);
    });
});


router.post('/:id/answers/add',jsonParser,function(req,res){
    data = req.body;
    console.log("data: ", data);
    var forward_url = process.env.SERVER_QUESTION+"/question/"+req.params.id+"/answers/add";
    console.log('request send to ',forward_url);
    var options = {  
        url: forward_url,
        method: 'POST',
        json: data
    };
    //send request to Question server
    request(options, function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("req: ",body);
        res.json(body);
    });
});

router.get('/:id',jsonParser,function(req,res){
    console.log("data: ", data)
    var forward_url = process.env.SERVER_QUESTION+"/question/"+req.params.id;
    console.log('request send to ',forward_url);
    var options = {  
        url: forward_url,
        method: 'GET',
    };
    //send request to Question server
    request(options, function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("req: ",body);
        res.json(body);
    });
});
router.get('/:id/answers',jsonParser,function(req,res){
    console.log("data: ", data)
    var forward_url = process.env.SERVER_QUESTION+"/question/"+req.params.id+"/answers";
    console.log('request send to ',forward_url);
    var options = {  
        url: forward_url,
        method: 'GET',
    };
    //send request to Question server
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