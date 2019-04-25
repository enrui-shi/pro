var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/:id',jsonParser,function(req,res){
    //req.body.current_user = req.current_user;
    var forward_url = process.env.SERVER_MDEIA+"/meida"+req.params.id;
    console.log('request send to ',forward_url);
    if(process.env.DEBUG){
        console.log("data: ", req.body)
    }
    var options = {  
        url: process.env.SERVER_MDEIA+"/meida"+req.params.id,
        method: 'POST',
        json: req.body
    };
    //send request to USER server
    request( {  
        url: process.env.SERVER_MDEIA+"/meida"+req.params.id,
        method: 'POST',
        json: req.body
    }, 
    function(err, response, body) {  
        if(err){
            console.log("ERROR")
            console.log(err);
        }
        console.log("received: ",body);
        res.json(body);
    });
});



module.exports = router;