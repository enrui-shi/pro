var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/:id/upvote',jsonParser,function(req,res){
    req.body.current_user = req.session.current_user;
    var forward_url = process.env.SERVER_QUESTION+"/answers/"+req.params.id+"/upvote";
    console.log('request send to ',forward_url);
    console.log("data: ", req.body)
    var options = {  
        url: forward_url,
        method: 'POST',
        json:req.body
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
router.post('/:id/accept',jsonParser,function(req,res){
    req.body.current_user = req.session.current_user;
    var forward_url = process.env.SERVER_QUESTION+"/answers/"+req.params.id+"/accept";
    console.log('request send to ',forward_url);
    console.log("data: ", req.body)
    var options = {  
        url: forward_url,
        method: 'POST',
        json:req.body
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