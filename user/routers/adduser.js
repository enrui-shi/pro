var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/',jsonParser,function(req,res){
    //console.log("adduser ",req.body.username)
    req.body['valide'] = "false";
    req.body['key'] = Math.floor((Math.random() * 8999) + 1000);
    req.body['reputation']=1;
    //console.log("data: ", data)
    var db = req.app.locals.db;
    //add user to database
    db.collection("users").insertOne(req.body, function(err, a) {
        if (err) {
            console.log(err);
            res.status(404).json({'status':"error","error":err})
        }else{
            //console.log(data.username+" signed up");
            console.log(a.ops[0].username+" signed up");
            res.json({'status':"OK"});
            sendMail(a.ops[0]);
        }
        
      });
});



module.exports = router;

function sendMail(data){
    //console.log("data:" ,data);
    var transporter = nodemailer.createTransport({
        //host:"user.cloud.compas.cs.stonybrook.edu",
       //auth: { user: 'cse356', pass: 'lalala123!' }
       host:'localhost',
       port: 25,
       tls:{
        rejectUnauthorized: false,
       },
    });
    var mailOpton = {
        from:'cse356@user.cloud.compas.cs.stonybrook.edu',
        to: data.email,
        subject: "verify code",
        text: "validation key: <" +data.key+">"
    };
    
    transporter.sendMail(mailOpton, function(error, info){
        //console.log("1")
        if (error) {
          console.log("error is:");
          console.log(error);
        } 
        //else{console.log('Email sent: ')+info}
    });
}