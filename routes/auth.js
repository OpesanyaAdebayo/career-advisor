var express = require('express');
var router = express.Router();
let login = require('../helpers/auth/login');
let signup = require('../helpers/auth/signup');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.UID) {
    res.redirect('/dashboard');
  } else {
    res.render('auth', {
      title: 'Career Advisor'
    });
  }
});

router.post('/login', function (req, res, next) {

});

router.post('/signup', function (req, res, next) {
  signup.processFormInput(req.body).then(function (feedback) {
    if (typeof (feedback) == 'object') {
      req.session.UID = feedback._id;
      delete feedback.password;
      delete feedback._id;
      res.json(feedback);
    } else {
      res.json("There was a problem with your registration. Please check email and try again.");
    }
  });
});

module.exports = router;