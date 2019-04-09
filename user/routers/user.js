var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var jsonParser = bodyParser.json()

router.get('/:username',jsonParser,function(req,res){
    console.log("find a user")
    var db = req.app.locals.db
    db.collection('users').find({'username':req.params.username}).toArray(function(err,result){
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
    console.log("find question posed by user")
    var db = req.app.locals.db
    db.collection('questions').find({'user.username':req.params.username}).toArray(function(err,result){
        console.log(result.length)
        console.log(result)
        if(result.length == 0){
            return res.json({'status':'OK', 'question_ids':[]})
        }else if(result.length > 0){
            var question_ids = []
            for(var i=0; i<result.length; i++){
                question_ids.push(result[i].id)
            }
            return res.json({'status':'OK', 'question_ids': question_ids})
        }else{
            return res.json({'status':'error','error':'wrong'})
        }
    });
});

router.get('/:username/answers',jsonParser,function(req,res){
    var db = req.app.locals.db
    db.collection('questions').find({'answers.user':req.params.username}).toArray(function(err,result){
        console.log(result.length)
        if(result.length == 0){
            return res.json({'status':'OK', 'answer_ids':[]})
        }else if(result.length > 0){
            var answer_ids = []
            for(var i=0; i<result.length; i++){
                console.log(result[i])
                for(var j=0;j<result[i].answers.length; j++){
                    answer_ids.push(result[i].answers[j].id)
                }
            }
            return res.json({'status':'OK', 'answer_ids': answer_ids})
        }else{
            return res.json({'status':'error','error':'wrong'})
        }
    });
});

module.exports = router;