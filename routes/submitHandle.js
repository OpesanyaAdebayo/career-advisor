var express = require('express');
var router = express.Router();
var getTweets = require("../helpers/getTweets")
/* GET home page. */
router.post('/', function(req, res, next) {
    let handle = req.body.twitterHandle;
    getTweets.processTweets(handle).then(function(tweets){
        console.log(tweets.length);
    });

});

module.exports = router;