var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/',jsonParser,function(req,res){
    console.log(req.body.username+" try to loging: ")
    db.collection('users').find({ 'username': req.body['username'] 
    }).toArray(function(err, result){
        if(result.length==1){
            result = result[0];
            if(result.password == req.body.password && result.valide == 'true'){
                //login
                console.log(result.username+" logined");
                res.cookie('session', { current_user: req.body.username });
                res.json({'status':"OK"});
            }else{
                console.log(result.username+' false to login. Valide:', result.valide );
                res.status(405).json({'status':"error","error":'wrong password or account not valide'})
            }
        }else{
            console.log("error: find "+result.length+" result");
            res.status(406).json({'status':"error","error":'can not find user'})
        }
    });
})

//export this router to use in our index.js
module.exports = router;