var express = require('express');
var router = express.Router();
var getProfile = require("../helpers/db/getProfile");
var jobdescs = require("../helpers/jobdesc.json");
/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.session.UID) {
    res.redirect('/');
  } else {

    getProfile.getProfile(req.session.UID).then(function (retrievedProfile) {

      var userProfile = retrievedProfile;
      delete userProfile.password;

      res.render('dashboard', {
        title: 'Career Advisor',
        userProfile: userProfile,
        jobdesc: jobdescs.occupations.Investigative
      });
    });

  }
});

module.exports = router;