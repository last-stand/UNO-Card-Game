var lib = require('../modules/lib.js').lib;
var assert = require('chai').assert;
var bc = require("bcryptjs");
var fs = require('fs');
var dbFileData = fs.readFileSync('tests/data/uno.db.backup');

describe('UNOLib',function(){
	describe('#get_has_password',function(){
		it('check the has property is working',function(done){
			var password = "12345";
			assert(12345!=lib.get_hash_password("12345"));
			done();
		})
	});
	
});