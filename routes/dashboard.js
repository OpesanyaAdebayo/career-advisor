var express = require('express');
let router = express.Router();
let getProfile = require('../helpers/db/getProfile');
let getRIASEC = require('../helpers/careerDetails/getRIASEC');
let interestDescriptions = require('../helpers/careerDetails/interestDescriptions.json');
let riasecList = require('../helpers/careerDetails/riasecList.json');
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

        let careerCode = getRIASEC.getCareerCode(userProfile, sortedProfile);
        let careerSuggestions = riasecList[careerCode];

        dominantInterestDescription = interestDescriptions.descriptions[dominantInterest];
        dominantInterestHobbies = interestDescriptions.hobbies[dominantInterest];

        res.render('dashboard', {
          title: 'Career Advisor',
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          imageUrl: userProfile.imageUrl,
          profileSummary: userProfile.summary,
          dominantInterestDescription: dominantInterestDescription,
          dominantInterestHobbies: dominantInterestHobbies,
          careerSuggestions: careerSuggestions
        });
      });
  }
});

module.exports = router;