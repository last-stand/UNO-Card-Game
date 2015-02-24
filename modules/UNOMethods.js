var fs = require("fs");
var _ = require("lodash");
var game = {};
exports.game = game;

var content = JSON.parse(fs.readFileSync('./public/cards.json'));
var cards = Object.keys(content[0]);

game.shuffledCards = _.shuffle(cards);
game.players = [{p1:[]},{p2:[]},{p3:[]},{p4:[]}];

var distributeCards = function(){
	var i = 1;
	game.players.forEach(function(gamer){
		gamer["p"+i] = game.shuffledCards.splice(0,7);
		i++;
	});
};

game.addCards = function(players,player,shuffledCards, numberOfCards){
	var cards = game.shuffledCards.splice(0,numberOfCards);
	players.forEach(function(gamer){
		(Object.keys(gamer)[0] == player) && (gamer[player] = gamer[player].concat(cards));
	});
};

distributeCards();