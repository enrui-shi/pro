var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var request = require('request');
var fs      = require('fs');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })



router.post('/',upload.single('contents'),function(req,res){
    if(req.session.current_user){
        console.log(req.file)
        var forward_url = process.env.SERVER_MEDIA+"/addmedia";
        console.log('request send to ',forward_url);
        if(true){
            console.log("data: ", req.body)
        }
        var options = {  
            url: forward_url,
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            formData : {"contents":req.file.buffer}
        };
        request(options, function(err, response, body) {  
            if(err){
                console.log("ERROR")
                console.log(err);
            }
            console.log("received: ",body);
            res.json(body);
        });
    }else{
        res.json({status: "error",error:"you need to login to add media"})
    }
});



module.exports = router;