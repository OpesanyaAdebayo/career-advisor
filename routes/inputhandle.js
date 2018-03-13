var express = require('express');
let router = express.Router();
let saveHandle = require('../helpers/db/saveHandle');
let twitter = require('../helpers/twitter/twitter');
let personality = require('../helpers/personality/personality');
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
    // saveHandle.saveToProfile(handle, req.session.UID)
    twitter.getTwitterProfile(handle)
        .then((twitterProfile) => saveHandle.saveToProfile(twitterProfile, req.session.UID))
        .then((profile) => twitter.processTweets(profile.twitterHandle))
        .then((tweets) => personality.getPersonality(tweets))
        .then((personalityProfile) => saveProfile.savePersonalityProfile(personalityProfile, req.session.UID))
        .then((personalityProfile) => personality.getTextSummary(personalityProfile.personality_profile))
        .then((summary) => saveProfile.saveSummary(summary, req.session.UID))
        .then((savedProfile) => res.json(savedProfile))
        .catch((error) => {
            res.json({
                message: error.message
            });
        });
});

module.exports = router;