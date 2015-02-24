var express = require('express');
var lib = require('../modules/UNOLib.js').init("data/uno.db");
var router = express.Router();
var bc = require("bcryptjs");

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('homePage');
});

router.get('/UNOBoard', function(req, res) {
  	res.render('UNOBoard');
});

var requireLogin = function(req,res,next){
	req.session.user? next(): res.redirect('/login');
};
router.get('/logout',requireLogin, function(req, res) {
	req.session.destroy();
	res.redirect("/login");
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
	var result = req.body;
	lib.insertPlayer(result,function(err){
		req.session.user = result.email;
		res.redirect('/UNOBoard');
	});
});


router.get('/UNOBoard',function(req,res){
	res.render('UNOBoard');
});
router.get("/login",function(req,res){
	if(req.session.user){
		res.redirect('/dashboard');
		return;
	}
	res.render("login");
});

router.post("/login",function(req,res){
	var user = req.body;
	new_topic_module.get_password_by_email(user.email,function(err,existing_user){
		if(existing_user){
			if(bc.compareSync(user.password,existing_user.password)){ 
				req.session.user = user.email;
  				res.redirect('/dashboard');
  				return;
			}		
		}
		res.render('login',{error:'Invalid username or password.'});
	})
});

module.exports = router;