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

router.get('/',function(req,res){
    console.log("receive")
    res.json({"s":"ok"})
})
router.get('/:username',jsonParser,function(req,res){
    console.log("Recieve get")
    var username = req.params.username
    var db = req.app.locals.db
    db.collection('users').find({'username':username}).toArray(function(err,result){
        if(result.length != 1){
            return res.json({'status':'error','error':'user not found'})
        }else{
            var user = result[0]
            console.log(user.email)
            console.log(user.reputation)
            delete user._id
            delete user.username
            delete user.key
            delete user.valide
            res.json({'status':'OK','user':user})
        }
    });
});

router.get('/:username/questions',jsonParser,function(req,res){
    var username = req.params.username
    var db = req.app.locals.db
    db.collection('questions').find({'user.username':username}).toArray(function(err,result){
        console.log(result.length)
        if(result.length == 0){
            return res.json({'status':'OK', 'question_ids':[]})
        }else if(result.length > 0){
            var question_ids = []
            for(var i=0; i<result.length; i++){
                question_ids.push(result.id)
            }
            return res.json({'status':'OK', 'question_ids': question_ids})
        }else{
            return res.json({'status':'error','error':'wrong'})
        }
    });
});

router.get('/:username/answers',jsonParser,function(req,res){
    var username = req.params.username
    var db = req.app.locals.db
    db.collection('questions').find({'answer.user':username}).toArray(function(err,result){
        console.log(result.length)
        if(result.length == 0){
            return res.json({'status':'OK', 'answer_ids':[]})
        }else if(result.length > 0){
            var answer_ids = []
            for(var i=0; i<result.length; i++){
                answer_ids.push(result.answer.id)
            }
            return res.json({'status':'OK', 'answer_ids': answer_ids})
        }else{
            return res.json({'status':'error','error':'wrong'})
        }
    });
});

module.exports = router;