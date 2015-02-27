var express = require('express');
var lib = require('../modules/UNOLib.js').init("data/uno.db");
var router = express.Router();
var bc = require("bcryptjs");
var uno_lib = require('../modules/UNOMethods.js');
var startCard = uno_lib.game.startGameWithColouredCard();
var joined_players = [{"P1":0},{"P2":0},{"P3":0},{"P4":0}];
/* GET home page. */
router.get('/', function(req, res) {
  	res.render('homePage');
});

var requireLogin = function(req,res,next){
	req.session.user? next(): res.redirect('/login');
};

router.get('/UNOBoard',requireLogin ,function(req, res) {
  	res.render('UNOBoard',{startCard:startCard});
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
		uno_lib.game.setPlayerAS(joined_players,req.session.user);
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
		content:uno_lib.game.players,
		joined_players:joined_players
	}
	broadcastOnSocket(cards,"new_content");
})

var broadcastOnSocket =function(content,key){
	var socket = router.getSocket();
	console.log("socket:",socket.id);
	socket.broadcast.emit(key,content);
	socket.emit(key,content);
}

router.post("/login",function(req,res){
	var user = req.body;
	lib.get_password_by_email(user.email,function(err,existing_user){
		if(existing_user){
			if(bc.compareSync(user.password,existing_user.password)){
				req.session.user = user.email;
				uno_lib.game.setPlayerAS(joined_players,req.session.user);
  				res.redirect('/UNOBoard');
  				return;
			}		
		}
		res.render('login',{error:'Invalid username or password.'});
	})
});

router.get('/introduction', function(req, res) {
  	res.render('introduction');
});

module.exports = router;