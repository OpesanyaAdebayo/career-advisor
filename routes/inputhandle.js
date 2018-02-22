var express = require('express');
let router = express.Router();
let saveHandle =require('../helpers/db/saveHandle');
let getTweets = require('../helpers/getTweets');
let personality = require('../helpers/personality');
let getProfile = require('../helpers/db/getProfile');
let saveProfile = require('../helpers/db/saveProfile');

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
    saveHandle.saveToProfile(handle, req.session.UID)
    .then((feedback) => getTweets.processTweets(feedback.twitterHandle))
    .then((tweets) => personality.getPersonality(tweets))
    .then((profile) => saveProfile.saveProfile(profile,req.session.UID))
    .then((personalityProfile) => personality.getTextSummary(personalityProfile.personality_profile))
    .then((summary) => saveProfile.saveSummary(summary,req.session.UID))
    .then((savedProfile) => res.json(savedProfile));
});

module.exports = router;