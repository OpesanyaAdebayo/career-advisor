var express = require('express');
var router = express.Router();
let login = require('../helpers/auth/login');
let signup = require('../helpers/auth/signup');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('auth', {
    title: 'Career Advisor'
  });
});

router.post('/login', function (req, res, next) {

});

router.post('/signup', function (req, res, next) {
  signup.processFormInput(req.body).then(function (feedback) {
    res.json(feedback);
  })
});

module.exports = router;