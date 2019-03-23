var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');
//const nodemailer = require('nodemailer');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/',jsonParser,function(req,res){
    data = req.body;
    console.log("data: "+data);
    res.json({"user":"a","email":"aa"})
});



module.exports = router;