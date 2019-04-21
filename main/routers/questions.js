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
    req.body.current_user = req.session.current_user;
    var forward_url = process.env.SERVER_QUESTION+"/questions/add"
    console.log('request send to ',forward_url);
    if(process.env.DEBUG){
        console.log("data: ", req.body)
    }
    var options = {  
        url: forward_url,
        method: 'POST',
        json: req.body
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


router.post('/:id/answers/add',jsonParser,function(req,res){
    req.body.current_user = req.session.current_user;
    var forward_url = process.env.SERVER_QUESTION+"/questions/"+req.params.id+"/answers/add";
    console.log('request send to ',forward_url);
    if(process.env.DEBUG){
        console.log("data: ", req.body)
    }
    var options = {  
        url: forward_url,
        method: 'POST',
        json: req.body
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

router.get('/:id',jsonParser,function(req,res){
    req.body.current_user = req.session.current_user;
    var forward_url = process.env.SERVER_QUESTION+"/questions/"+req.params.id;
    console.log('request send to ',forward_url);
    if(process.env.DEBUG){
        console.log("data: ", req.body)
    }
    var options = {  
        url: forward_url,
        method: 'GET',
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
router.post('/:id/upvote',jsonParser,function(req,res){
    req.body.current_user = req.session.current_user;
    var forward_url = process.env.SERVER_QUESTION+"/questions/"+req.params.id+"/upvote";
    console.log('request send to ',forward_url);
    if(process.env.DEBUG){
        console.log("data: ", req.body)
    }
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

router.get('/:id/answers',jsonParser,function(req,res){
    req.body.current_user = req.session.current_user;
    var forward_url = process.env.SERVER_QUESTION+"/questions/"+req.params.id+"/answers";
    console.log('request send to ',forward_url);
    if(process.env.DEBUG){
        console.log("data: ", req.body)
    }
    var options = {  
        url: forward_url,
        method: 'GET',
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

router.delete('/:id' ,jsonParser,function(req,res){
    req.body.current_user = req.session.current_user;
    var forward_url = process.env.SERVER_QUESTION+'/questions/'+req.params.id;
    var options = {  
        url: forward_url,
        method: 'DELETE',
        json:req.body
    };
    console.log('request send to ',forward_url);
    if(process.env.DEBUG){
        console.log("data: ", req.body)
    }
    request(options, function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("received: ",body);
        if(body.status =='OK'){
            res.sendStatus(200);
        }else{
            res.sendStatus(400);
        }
    });
});

module.exports = router;