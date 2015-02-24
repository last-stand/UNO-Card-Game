var fs = require("fs");
var _ = require("lodash");

var content = JSON.parse(fs.readFileSync('./public/cards.json'));
var cards = Object.keys(content[0]);
var shuffledCards = _.shuffle(cards);

var players = [{p1:[]},{p2:[]},{p3:[]},{p4:[]}];

var distributeCards = function(players){
	var i = 1;
	players.forEach(function(gamer){
		gamer["p"+i] = shuffledCards.splice(0,7);
		i++;
	});
};

var addCards = function(players,player,shuffledCards, numberOfCards){
	var cards = shuffledCards.splice(0,numberOfCards);
	players.forEach(function(gamer){
		(Object.keys(gamer)[0] == player) && (gamer[player] = gamer[player].concat(cards));
	});
};

distributeCards(players);

exports.shuffledCards = shuffledCards;
exports.players = players;