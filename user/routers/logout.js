var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');


// create application/json parser
var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/',jsonParser,function(req,res){
        if(req.cookies.session.current_user){
            console.log(req.cookies.session.current_user+" logout");
            req.cookies.session.current_user = null;
            res.json({'status':'OK'});
        }else{
            res.status(404).json({'status':'error','error':'no one is login'});
        }
});


//export this router to use in our index.js
module.exports = router;