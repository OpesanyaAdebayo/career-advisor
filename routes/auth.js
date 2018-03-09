let express = require('express');
let router = express.Router();
let login = require('../helpers/auth/login');
let signup = require('../helpers/auth/signup');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.session.UID) {
    res.render('auth', {
      title: 'Career Advisor'
    });
  } else
    res.redirect('/dashboard');

});

router.post('/login', function (req, res, next) {
  login.processFormInput(req.body).then((profile) => {
    req.session.UID = profile._id;
    delete profile.password;
    delete profile._id;
    res.json(profile);
  }).catch((err) => res.json({
    message: err.message
  }));
});

router.post('/signup', function (req, res, next) {
  signup.processFormInput(req.body).then((profile) => {
    req.session.UID = profile._id;
    delete profile.password;
    delete profile._id;
    res.json(profile);
  }).catch((err) => res.json({
    message: err.message
  }));
});

module.exports = router;