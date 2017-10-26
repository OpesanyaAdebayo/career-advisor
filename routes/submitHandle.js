var express = require('express');
var router = express.Router();
var getTweets = require("../helpers/getTweets")
var personality = require("../helpers/personality")
var saveProfile = require("../helpers/db/saveProfile")
/* GET home page. */

router.post('/', function (req, res, next) {
    let handle = req.body.twitterHandle;
    getTweets.processTweets(handle)
        .then(function (tweets) {
            return tweets
        })
        .then(function (tweets) {
            return personality.getPersonality(tweets)
        })
        .then(function (profile) {
            return saveProfile.saveProfile(profile)
        })
        .then(function(profile) {
            return personality.getTextSummary(profile)
        });
})
module.exports = router;