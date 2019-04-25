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
    if(req.cookies.session){
        req.body.current_user = req.cookies.session.current_user;
    }
    var forward_url = process.env.SERVER_QUESTION+"/answers/"+req.params.id+"/upvote";
    console.log('request send to ',forward_url);
    if(process.env.DEBUG){
        console.log("data: ", req.body)
    }
    var options = {  
        url: process.env.SERVER_QUESTION+"/answers/"+req.params.id+"/upvote",
        method: 'POST',
        json:req.body
    };
    //send request to Question server
    request({  
        url: process.env.SERVER_QUESTION+"/answers/"+req.params.id+"/upvote",
        method: 'POST',
        json:req.body
        },
     function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("received: ",body);
        if(body.status=='error'){
            res.status(404).json(body);
        }else{
            res.json(body);
        }
    });
});
router.post('/:id/accept',jsonParser,function(req,res){
    if(req.cookies.session){
        req.body.current_user = req.cookies.session.current_user;
    }
    var forward_url = process.env.SERVER_QUESTION+"/answers/"+req.params.id+"/accept";
    console.log('request send to ',forward_url);
    if(process.env.DEBUG){
        console.log("data: ", req.body)
    }
    var options = {  
        url: process.env.SERVER_QUESTION+"/answers/"+req.params.id+"/accept",
        method: 'POST',
        json:req.body
    };
    //send request to Question server
    request({  
        url: process.env.SERVER_QUESTION+"/answers/"+req.params.id+"/accept",
        method: 'POST',
        json:req.body
    }, 
    function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("received: ",body);
        if(body.status=='error'){
            res.status(404).json(body);
        }else{
            res.json(body);
        }
    });
});

module.exports = router;