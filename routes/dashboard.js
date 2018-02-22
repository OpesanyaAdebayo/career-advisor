var express = require('express');
let router = express.Router();
let getProfile = require('../helpers/db/getProfile');
let jobdescs = require('../helpers/jobdesc.json');
/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.session.UID) {
    res.redirect('/');
  } else {

    getProfile.getProfile(req.session.UID).then((retrievedProfile) => {

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