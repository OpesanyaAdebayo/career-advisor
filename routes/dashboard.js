var express = require('express');
var getTweets = require("../helpers/getTweets")
var personality = require("../helpers/personality")
var getProfile = require("../helpers/db/getProfile")
var saveProfile = require("../helpers/db/saveProfile")
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.session.UID) {
    res.redirect('/');
  } else {
    getProfile.getProfile(req.session.UID).then(function (profile) {
      return profile
    }).then(function (profile) {
      return getTweets.processTweets(profile.twitterHandle);
    }).then(function (tweets) {
      return personality.getPersonality(tweets);
    }).then(function (personality) {
      return saveProfile.saveProfile(personality, req.session.UID);
    })
  }
  res.render('dashboard', {
    title: 'Career Advisor'
  });
});

module.exports = router;