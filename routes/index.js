var express = require('express');
var lib = require('../modules/UNOLib.js').init("data/uno.db");
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  	res.render('homePage');
});

router.get('/UNOBoard', function(req, res) {
  	res.render('UNOBoard');
});

module.exports = router;
