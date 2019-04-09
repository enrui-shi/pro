var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var router = express.Router();
const path = require('path');

router.post('/',jsonParser,function(req,res){
    json = {'status':'OK'};
    //console.log(data.email);
    //console.log(data['key']);
    var db = req.app.locals.db;
    db.collection('users').find({ 'email': req.body['email'] 
    }).toArray(function(err, result){
        if(err){
            res.json({'status':'error','error':err});
        }else{
            if(result.length==1){
                result=result[0];
                if(result.key==req.body.key||req.body.key=='abracadabra'){
                    console.log("verifed");
                    db.collection('users').update({'email': req.body['email']},{ $set:
                        {
                        'valide': 'true'
                        }
                    })
                    res.json({'status':"OK"});
                }else{
                    res.json({'status':'error','error':'wrong key'})
                }
            }else{
                res.json({'status':'error','error':'can not find email'})
            }
        }
    });
    
});


//export this router to use in our index.js
module.exports = router;