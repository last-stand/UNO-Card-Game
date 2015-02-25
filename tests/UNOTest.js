var lib = require('../modules/UNOLib');
var UNOlib = require('../modules/UNOMethods');
var assert = require('chai').assert;
var fs = require('fs');
var dbFileData = fs.readFileSync('tests/data/uno.db.backup');

var uno_records;
describe('uno_records',function(){
	beforeEach(function(){
		fs.writeFileSync('tests/data/uno.db',dbFileData);
		uno_records = lib.init('tests/data/uno.db');
	});

	describe('#getPlayerInfo',function(){
		it('get information of player email from players table',function(done){
			uno_records.getPlayerInfo("p1@gmail.com", function(err,player){
				assert.notOk(err);
				assert.equal(player.email,"p1@gmail.com");
				done();
			});
		});
		it('get information of player name from players table',function(done){
			uno_records.getPlayerInfo("p1@gmail.com", function(err,player){
				assert.notOk(err);
				assert.equal(player.user_name,"p1");
				done();
			});
		});

	});
	
	describe('#insertPlayer',function(){
		var user = {
				email: 'p6@gmail.com',
				user_name: 'destroyer',
				password:'12345' , 
				status:1
			};
		it('insert player email into players table',function(done){
			uno_records.insertPlayer(user, function(err){
				assert.notOk(err);
				uno_records.getPlayerInfo("p6@gmail.com",function(error,player){
					assert.notOk(error);
					assert.equal(player.email,"p6@gmail.com");
					done();
				});
			});
		});
		it('insert player name into players table',function(done){
			uno_records.insertPlayer(user, function(err){
				assert.notOk(err);
				uno_records.getPlayerInfo("p6@gmail.com",function(error,player){
					assert.notOk(error);
					assert.equal(player.user_name,"destroyer");
					done();
				});
			});
		});
		it('insert player status into players table',function(done){
			uno_records.insertPlayer(user, function(err){
				assert.notOk(err);
				uno_records.getPlayerInfo("p6@gmail.com",function(error,player){
					assert.notOk(error);
					assert.equal(player.status  , 1);
					done();
				});
			});
		});
	});
	
	describe('#get_password_by_email',function(){
		it('verify user by email and password',function(done){
			uno_records.get_password_by_email("p1@gmail.com", function(err,player){
				assert.notOk(err);
				assert.equal(player.password,"12345");
				done();
			});
		});
		it('verify invalid user cannot be enter' , function(done){
			uno_records.get_password_by_email("p1@gmail.com", function(err,player){
				assert.notOk(err);
				assert.ok(player.password!="23451");
				done();
			});
		})
	});

	describe('#startGameWithColouredCard',function(){
		it('starting card should be coloured',function(done){
			var arr = ['B','G','R','Y'];
			var card = UNOlib.game.startGameWithColouredCard();
			assert.ok(arr.indexOf(card.slice(0,1)) >= 0);
			done();
		});
	});

	describe('#setPlayerAS',function(){
		var array = [{"P1":0},{"P2":0},{"P3":0},{"P4":0}];
		it('find joined players to set the email',function(done){
			var email = "p1@gmail.com";
			var result = UNOlib.game.setPlayerAS(array,email);
			assert.equal(array[0]["P1"],email);
			assert.notEqual(array[1]["P2"],email);
			assert.equal(array[1]["P2"],0);
			done();
		});
		it('setPlayerAS set P2 with new email and remaining should be 0',function(done){
			var email = "p2@gmail.com";
			var result = UNOlib.game.setPlayerAS(array,email);
			assert.equal(array[0]["P1"],"p1@gmail.com");
			assert.equal(array[1]["P2"],email);
			assert.notEqual(array[2]["P3"],email);
			assert.equal(array[2]["P3"],0);
			done();
		});
		it('setPlayerAS set P3 with new email and remaining should be 0',function(done){
			var email = "p3@gmail.com";
			var result = UNOlib.game.setPlayerAS(array,email);
			assert.equal(array[0]["P1"],"p1@gmail.com");
			assert.equal(array[1]["P2"],"p2@gmail.com");
			assert.equal(array[2]["P3"],email);
			assert.notEqual(array[3]["P4"],email);
			assert.equal(array[3]["P4"],0);
			done();
		});
		it('start card should not be wild card' , function(done){
			var arr = ['W'];
			var card = UNOlib.game.startGameWithColouredCard();
			assert.ok(arr.indexOf(card.slice(0,1))<0);
			done();
		});
		it('start card should be a number card' , function(done){
			var arr = ['R' , 'S'  , 'P'];
			var card = UNOlib.game.startGameWithColouredCard();
			assert.ok(arr.indexOf(card.slice(2,3))<0);
			done();
		});
		it('start card should not be a reverse card' , function(done){
			var arr = ['R'];
			var card = UNOlib.game.startGameWithColouredCard();
			assert.ok(arr.indexOf(card.slice(2,3))<0);
			done();
		});
		it('start card should not be a skip card' , function(done){
			var arr = ['S'];
			var card = UNOlib.game.startGameWithColouredCard();
			assert.ok(arr.indexOf(card.slice(2,3))<0);
			done();
		});
		it('start card should not be a plus two card' , function(done){
			var arr = ['P'];
			var card = UNOlib.game.startGameWithColouredCard();
			assert.ok(arr.indexOf(card.slice(2,3))<0);
			done();
		});
	});
});