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
    var forward_url = process.env.SERVER_USER+"/login";
    //req.session.current_user = req.body.username;
    console.log('request send to ',forward_url);
    if(process.env.DEBUG){
        console.log("data: ", req.body)
    }
    var options = {  
        url: process.env.SERVER_USER+"/login",
        method: 'POST',
        json: req.body
    };
    //send request to USER server
    request({  
        url: process.env.SERVER_USER+"/login",
        method: 'POST',
        json: req.body
    }, 
    function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("receive from login server: ",body);
        if(body.status=='OK'){
            req.session.current_user = req.body.username;
            req.session.status = 'online';
            console.log("current session:", req.session)
        }
        res.json(body);
    });
});



module.exports = router;