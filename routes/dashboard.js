var express = require('express');
let router = express.Router();
let getProfile = require('../helpers/db/getProfile');
let getRIASEC = require('../helpers/getRIASEC');
let interestDescriptions = require('../helpers/interestDescriptions.json');
let userProfile;
/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.session.UID) {
    res.redirect('/');
  } else {

    getProfile.getProfile(req.session.UID)
      .then((retrievedProfile) => {
        userProfile = retrievedProfile;

        let sortedProfile = getRIASEC.sortProfile(retrievedProfile);
        let dominantInterest = getRIASEC.getDominantInterest(userProfile, sortedProfile);

        dominantInterestDescription = interestDescriptions.descriptions[dominantInterest];

        res.render('dashboard', {
          title: 'Career Advisor',
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          profileSummary: userProfile.summary,
          dominantInterestDescription: dominantInterestDescription
        });
      });
  }
});

module.exports = router;