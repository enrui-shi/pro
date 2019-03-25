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
    var forward_url = process.env.SERVER_SEARCH+"/search";
    console.log('request send to ',forward_url);
    console.log("data: ", data)
    var options = {  
        url: forward_url,
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
        console.log("new req:ß");
        console.log(JSON.stringify(body))
        res.json(body);
    });
});



module.exports = router;