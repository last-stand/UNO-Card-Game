var lib = require('../modules/UNOLib');
var assert = require('chai').assert;
var fs = require('fs');
var dbFileData = fs.readFileSync('tests/data/uno.db.backup');

var uno_records;
describe('uno_records',function(){
	beforeEach(function(){
		fs.writeFileSync('tests/data/uno.db',dbFileData);
		uno_records = lib.init('tests/data/uno.db');
	});

	// describe('#get_has_password',function(){
	// 	it('check the has property is working',function(done){
	// 		uno_records.getPlayerInfo("p1@gmail.com", function(err,player){
	// 			assert.notOk(err);
	// 			assert.equal(player.email,"p1@gmail.com");
	// 			assert.equal(player.user_name,"p1");
	// 		});
	// 		done();
	// 	});
	// });
	

});