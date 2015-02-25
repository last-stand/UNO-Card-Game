var express = require('express');
var lib = require('../modules/UNOLib.js').init("data/uno.db");
var router = express.Router();
var bc = require("bcryptjs");
var uno_lib = require('../modules/UNOMethods.js');
var startCard = uno_lib.game.startGameWithColouredCard();;
/* GET home page. */
router.get('/', function(req, res) {
  	res.render('homePage');
});

router.get('/UNOBoard', function(req, res) {
  	res.render('UNOBoard',{startCard:startCard});
});

var requireLogin = function(req,res,next){
	req.session.user? next(): res.redirect('/login');
};

router.get('/UNOBoard',requireLogin, function(req, res) {
  	res.render('UNOBoard');
});

router.get('/logout',requireLogin, function(req, res) {
	req.session.destroy();
	res.redirect("/login");
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
	var userData = req.body;
	lib.insertPlayer(userData,function(err){
		req.session.user = userData.email;
		res.redirect('/UNOBoard');
	});
});

router.get("/login",function(req,res){
	if(req.session.user){
		res.redirect('/UNOBoard');
		return;
	}
	res.render("login");
});

router.post('/UNOBoard',requireLogin, function(req, res) {
	var cards = {
		email:req.session.user,
		content:uno_lib.game.players[0].p1
	}
	broadcastOnSocket(cards);
})

var broadcastOnSocket =function(content){
	var socket = router.getSocket();
	console.log("socket:",socket.id);
	socket.broadcast.emit("new_content",content);
	socket.emit("new_content",content);
}

router.post("/login",function(req,res){
	var user = req.body;
	lib.get_password_by_email(user.email,function(err,existing_user){
		if(existing_user){
			if(bc.compareSync(user.password,existing_user.password)){ 
				req.session.user = user.email;
  				res.redirect('/UNOBoard');
  				return;
			}		
		}
		res.render('login',{error:'Invalid username or password.'});
	})
});

module.exports = router;