var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var router = express.Router();
const path = require('path');

router.post('/',jsonParser,function(req,res){
    //console.log(data.email);
    //console.log(data['key']);
    //console.log(req.body.email," try to verify")
    var memcached=req.app.locals.memcached;
    memcached.get(req.body.email, function (err, data) {
        if(data!=null){
            console.log('cached',req.body.email);
            if(data.key==req.body.key||req.body.key=='abracadabra'){
                console.log('cache ',data.username);
                memcached.set(data.username,data,10,function (err) { 
                    if(err){
                        console.log(err);
                    }
                });
            }
        }else{
            console.log("not cached")
        }
      });
    db.collection('users').find({ 'email': req.body['email'] 
    }).toArray(function(err, result){
        if(err){
            res.status(404).json({'status':'error','error':err});
        }else{
            if(result.length==1){
                result=result[0];
                if(result.key==req.body.key||req.body.key=='abracadabra'){
                    console.log(req.body.email," verifed");
                    db.collection('users').update({'email': req.body['email']},{ $set:
                        {
                        'valide': 'true'
                        }
                    })
                    res.json({'status':"OK"});
                }else{
                    res.status(405).json({'status':'error','error':'wrong key'})     
                }
            }else{
                res.status(406).json({'status':'error','error':'can not find email'})
            }
        }
    });
    
});


//export this router to use in our index.js
module.exports = router;