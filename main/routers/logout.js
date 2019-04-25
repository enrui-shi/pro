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
    if(req.session.status=='online'){
        console.log(req.session.current_user+" logout");
        req.session = null;
        res.json({'status':'OK'});
    }else{
        res.status(404).json({'status':'error','error':'no one is login'});
    }
});



module.exports = router;