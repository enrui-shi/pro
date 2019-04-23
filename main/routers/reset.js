var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',jsonParser,function(req,res){
    var forward_url = process.env.SERVER_QUESTION+"/reset";
    var options = {  
        url: forward_url,
        method: 'GET',
    };
    //send request to USER server
    request(options, function(err, response, body) {  
        res.json({status:"OK"});
    });
});



module.exports = router;