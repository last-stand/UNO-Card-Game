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
		it('get information of player from players table',function(done){
			uno_records.getPlayerInfo("p1@gmail.com", function(err,player){
				assert.notOk(err);
				assert.equal(player.email,"p1@gmail.com");
				assert.equal(player.user_name,"p1");
				done();
			});
		});
	});
	
	describe('#insertPlayer',function(){
		it('insert player into players table',function(done){
			var user = {
				email: 'p6@gmail.com',
				user_name: 'destroyer',
				password:'12345'
			};
			uno_records.insertPlayer(user, function(err){
				assert.notOk(err);
				uno_records.getPlayerInfo("p6@gmail.com",function(error,player){
					assert.notOk(error);
					assert.equal(player.email,"p6@gmail.com");
					assert.equal(player.user_name,"destroyer");
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
	});

	describe('#startGameWithColouredCard',function(){
		it('starting card should be coloured',function(done){
			var arr = ['B','G','R','Y'];
			var card = UNOlib.game.startGameWithColouredCard();
			assert.ok(arr.indexOf(card.slice(0,1)));
			done();
		});
	})
});