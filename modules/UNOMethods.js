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

var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

game.startGameWithColouredCard = function(){
	var index = getRandomInt(0, game.shuffledCards.length-1);
	var arr = ['B','G','R','Y'];
	var arr1 = ['_S' , '_R' , '_P'];
	if(arr.indexOf(game.shuffledCards[index].slice(0,1)) >= 0 && arr1.indexOf(game.shuffledCards[index].slice(1,3))<0)
		return game.shuffledCards[index];
	return game.startGameWithColouredCard();
}

game.setPlayerAS = function(array,email){
	for (var i = 0; i < array.length; i++) {
		if(array[i][Object.keys(array[i])[0]]==0){
			array[i][Object.keys(array[i])[0]] = email;
			return;
		}
	}
}

distributeCards();