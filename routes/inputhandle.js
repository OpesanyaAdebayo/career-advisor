var express = require('express');
var saveHandle = require("../helpers/db/saveHandle")
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.session.UID) {
        res.redirect('/');
    } else {
        res.render('inputhandle', {
            title: 'Career Advisor'
        });
    }
});

router.post('/', function (req, res, next) {
    let handle = req.body.twitterHandle;
    console.log(req.body);
    saveHandle.saveToProfile(handle, req.session.UID).then(function (feedback) {
        if(feedback.updatedExisting == true) {
            res.json(feedback);
        }
        else {
            res.redirect('/');
        }
    })
    // getTweets.processTweets(handle)
    //     .then(function (tweets) {
    //         return tweets
    //     })
    //     .then(function (tweets) {
    //         return personality.getPersonality(tweets)
    //     })
    //     .then(function (profile) {
    //         return saveProfile.saveProfile(profile)
    //     })
    //     .then(function (profile) {
    //         return personality.getTextSummary(profile)
    //     });
})

module.exports = router;