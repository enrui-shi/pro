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



router.post('/',upload.single('content'),function(req,res){
    console.log("current session: ",req.session)
    if(req.cookies.current_user){
        console.log(req.file)
        console.log('request send to ',process.env.SERVER_MEDIA+"/addmedia");
        if(true){
            console.log("data: ", req.body)
        }
        request({  
            url: process.env.SERVER_MEDIA+"/addmedia",
            method: 'POST',
            formData : {"content":fs.createReadStream(req.file.path)}
            }, 
        function(err, response, body) {  
            if(err){
                console.log("ERROR")
                console.log(err);
            }
            console.log("received from add media: ",body);
            res.json(body);
        });
    }else{
        res.json({status: "error",error:"you need to login to add media"})
    }
});



module.exports = router;