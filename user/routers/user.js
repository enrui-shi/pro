var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var jsonParser = bodyParser.json()

router.get('/:username',jsonParser,function(req,res){
    console.log("find a user")
    var db = req.app.locals.db
    db.collection('users').find({'username':req.params.username}).toArray(function(err,result){
        if(result.length != 1){
            return res.status(404).json({'status':'error','error':'user not found'})
        }else{
            var user = result[0]
            delete user._id
            delete user.username
            delete user.key
            delete user.valide
            if(user.reputation<=0){
                user.reputation=1
            }
            res.json({'status':'OK','user':user})
        }
    });
});

router.get('/:username/questions',jsonParser,function(req,res){
    console.log("find question posed by user")
    var db = req.app.locals.db
    db.collection('questions').find({'user.username':req.params.username}).toArray(function(err,result){
        if(result.length == 0){
            return res.json({'status':'OK', 'questions':[]})
        }else if(result.length > 0){
            var question_ids = []
            for(var i=0; i<result.length; i++){
                question_ids.push(result[i].id)
            }
            return res.json({'status':'OK', 'questions': question_ids})
        }else{
            return res.status(404).json({'status':'error','error':'wrong'})
        }
    });
});

router.get('/:username/answers',jsonParser,function(req,res){
    console.log("find user answer")
    var db = req.app.locals.db
    db.collection('answers').find({'user':req.params.username}).toArray(function(err,result){
        if(result.length == 0){
            return res.json({'status':'OK', 'answers':[]})
        }else if(result.length > 0){
            var answer_ids = []
            for(var i=0; i<result.length; i++){
                for(var j=0;j<result[i].answers.length; j++){
                    answer_ids.push(result[i].answers[j].id)
                }
            }
            return res.json({'status':'OK', 'answers': answer_ids})
        }else{
            return res.status(404).json({'status':'error','error':'wrong'})
        }
    });
});

module.exports = router;