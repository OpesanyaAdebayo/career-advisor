var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.session.UID) {
    res.redirect('/');
  } else {
    res.render('dashboard', {
      title: 'Career Advisor'
    });
  }
});

module.exports = router;