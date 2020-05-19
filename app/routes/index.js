var express = require('express');
var router = express.Router();
var fs = require("fs");
var showdown = require('showdown');

// Global variables
var converter = new showdown.Converter();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home');
});

/* GET blog page. */
router.get('/blog', function(req, res, next) {

    var toRender = "";
    var fileContent = "";

    var files = fs.readdirSync("./posts");

    for(var i = 0; i < files.length; i++){
        fileContent = fs.readFileSync("./posts/" + files[i]).toString();

        if (fileContent.length > 300){
            fileContent = fileContent.substring(0,300) + ".....\n\n";
        }

        toRender += fileContent;
    }

    res.render('blog', { content: converter.makeHtml(toRender)});
});

// Get a single post
router.get('/post/:postId', function(req, res, next) {
   
    console.log("Looking for file: " + req.params.postId); 
    var content = fs.readFileSync("./posts/" + req.params.postId + ".md", 'utf8', function(err, data){
        if(err){
            console.log("ERR: " + err); 
        } else {
            console.log(data);
        }
    });
    res.render('blog', {content: converter.makeHtml(content)});
});

module.exports = router;
