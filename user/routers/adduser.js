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
    data = req.body;
    data['valide'] = "false";
    data['key'] = Math.floor((Math.random() * 8999) + 1000);
    data['reputation']=1;
    console.log("data: ", data)
    var db = req.app.locals.db;
    //add user to database
    db.collection("users").insertOne(data, function(err, a) {
        if (err) {
            console.log(err);
            res.json({'status':"error","error":err})
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
        //host: 'email.cloud.compas.cs.stonybrook.edu',
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth: {
            user: 'cse356test@gmail.com',
            pass: 'Cse356lalala'
        }
    });
    var mailOpton = {
        //from:'cse356@email.cloud.compas.cs.stonybrook.edu',
        from: 'cse356test@gmail.com',
        to: data.email,
        subject: "verify code",
        text: "validation key: <"+data.key+">"
    };

    transporter.sendMail(mailOpton, function(error, info){
        if (error) {
          console.log("error is:");
          console.log(error);
        } 
          else{console.log('Email sent to :',data.email)}
        });
}