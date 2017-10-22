var express = require('express');
var router = express.Router();
var getTweets = require("../helpers/twitter/getTweets")
/* GET home page. */
router.post('/', function(req, res, next) {
    let handle = req.body.twitterHandle;
    getTweets.processTweets(handle).then(function(filteredTweets){
        console.log(filteredTweets.length);
    });
//   res.render('inputhandle', { title: 'Career Advisor' });
});

module.exports = router;